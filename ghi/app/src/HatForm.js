import React from 'react';

class HatForm extends React.Component {
    async
    constructor(props) {
        super(props)
        this.state = {
            style: '',
            color: '',
            pictureUrl: '',
            fabric: '',
            location: '',
            locations: []
          };
        this.handleStyleChange = this.handleStyleChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
        this.handleFabricChange = this.handleFabricChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleStyleChange(event) {
        const value = event.target.value;
        this.setState({style: value})
    }

    handleColorChange(event) {
        const value = event.target.value;
        this.setState({color: value})
    }

    handlePictureUrlChange(event) {
        const value = event.target.value;
        this.setState({pictureUrl: value})
    }

    handleFabricChange(event) {
        const value = event.target.value;
        this.setState({fabric: value})
    }

    handleLocationChange(event) {
        const value = event.target.value;
        this.setState({location: value})
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.picture_url = data.pictureUrl;
        delete data.pictureUrl;
        delete data.locations;
        console.log(data);
      
        const hatUrl = 'http://localhost:8090/api/hats/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(hatUrl, fetchConfig);
        if (response.ok) {
          const newHat = await response.json();
          console.log(newHat);
          const cleared = {
            style: '',
            color: '',
            pictureUrl: '',
            fabric: '',
            location: ''
          };
          this.setState(cleared);
        }
      }
    
    async componentDidMount() {
        const url = 'http://localhost:8100/api/locations/';
    
        const response = await fetch(url);
    
        if (response.ok) {
          const data = await response.json();
          this.setState({locations: data.locations});
        }
      }
      render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a new hat</h1>
                <form onSubmit={this.handleSubmit} id="create-location-form">                  
                  <div className="form-floating mb-3">
                    <input value={this.state.style} onChange={this.handleStyleChange} placeholder="Style" required type="text" name="style" id="style" className="form-control" />
                    <label htmlFor="style">Style</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.color} onChange={this.handleColorChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                    <label htmlFor="color">Color</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.pictureUrl} onChange={this.handlePictureUrlChange} placeholder="Picture Link" required type="text" name="pictureUrl" id="pictureUrl" className="form-control" />
                    <label htmlFor="pictureUrl">Picture Link</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.fabric} onChange={this.handleFabricChange} placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control" />
                    <label htmlFor="fabric">Fabric</label>
                  </div>
                  <div className="mb-3">
                    <select value={this.state.location} onChange={this.handleLocationChange} required id="location" name="location" className="form-select">
                      <option value="">Choose a location</option>
                      {this.state.locations.map(location => {
                        return (
                            <option key={location.href} value={location.href}>
                            {location.closet_name}
                            </option>
                        );
                      })}
                    </select>
                  </div>
                  <button className="btn btn-primary">Add Hat</button>
                </form>
              </div>
            </div>
          </div>
        );
      }
}


export default HatForm