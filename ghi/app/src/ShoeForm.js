import React from 'react';

class ShoeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            manufacturer: '',
            model_name: '',
            color: '',
            bins: []
          };
        this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
        this.handleModelNameChange = this.handleModelNameChange.bind(this)
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleBinChange = this.handleBinChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.bins;
        console.log(data);

        const shoeUrl = 'http://localhost:8080/api/shoes/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        };
       const response = await fetch(shoeUrl, fetchConfig);
       if (response.ok) {
        const newShoe = await response.json();
        console.log(newShoe);

        const cleared = {
            manufacturer: '',
            model_name: '',
            color: '',
            bin: ''
          };
          this.setState(cleared);
       }
       }
    handleModelNameChange(event) {
        const value = event.target.value;
        this.setState({model_name: value})
      }
    handleManufacturerChange(event) {
        const value = event.target.value;
        this.setState({manufacturer: value})
      }
    handleColorChange(event) {
        const value = event.target.value;
        this.setState({color: value})
    }
    handleBinChange(event) {
        const value = event.target.value;
        this.setState({bin: value})
    }
    async componentDidMount() {
        const url = 'http://localhost:8080/api/bins/';
    
        const response = await fetch(url);
    
        if (response.ok) {
          const data = await response.json();
          this.setState({bins: data.bins});
          
        }
    }
  render() {
    let spinnerClasses = 'd-flex justify-content-center mb-3';
    let dropdownClasses = 'form-select d-none';
    if (this.state.bins.length > 0) {
     spinnerClasses = 'd-flex justify-content-center mb-3 d-none';
     dropdownClasses = 'form-select';
     }
    return (
        <div className="my-5">
      <div className="row">
        <div className="col col-sm-auto">
          <img width="300" alt="" className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" />
        </div>
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <form id="create-attendee-form" onSubmit={this.handleSubmit}>
                <h1 className="card-title">Create a new shoe!</h1>
                <p className="mb-3">
                  Please choose which bin you would like it to be in
                </p>
                <div className={spinnerClasses} id="loading-conference-spinner">
                  <div className="spinner-grow text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
                <div className="mb-3">
                  <select name="bin" onChange={this.handleBinChange} value={this.state.bin} id="bin" className={dropdownClasses} required>
                    <option value="">Choose a bin number here</option>
                    {this.state.bins.map(bin => {
                   return (
                    <option key={bin.bin_number} value={bin.bin_number}>
                     {bin.bin_number}
                    </option>
                          );
                      })}
                  </select>
                </div>
                <p className="mb-3">
                  Now describe the shoes.
                </p>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input required onChange={this.handleModelNameChange} value={this.state.model_name} placeholder="Your model name" type="text" id="model_name" name="model_name" className="form-control" />
                      <label htmlFor="name">The Model Name</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input required onChange={this.handleColorChange} value={this.state.color} placeholder="The shoe color" type="text" id="color" name="color" className="form-control" />
                      <label htmlFor="name">The Color</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input required onChange={this.handleManufacturerChange} value={this.state.manufacturer} placeholder="The Manufacturer" type="text" id="manufacturer" name="manufacturer" className="form-control" />
                      <label htmlFor="email">The Manufacturer</label>
                    </div>
                  </div>
                </div>
                <button className="btn btn-lg btn-primary">Register to inventory</button>
              </form>
              <div className="alert alert-success d-none mb-0" id="success-message">
                Congratulations! You're shoe has been registered!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
}

export default ShoeForm;