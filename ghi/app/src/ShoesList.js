import React from 'react';
import { Link } from 'react-router-dom';

function ShoeColumn(props) {
  return (
    <div className="col">
      {props.list.map(data => {
        const shoe = data;
        return (
          <div key={shoe.id} className="card mb-3 shadow">
            <img alt='' src={shoe.picture_url} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{shoe.model_name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {shoe.color}
              </h6>
              <p className="card-text">
                {shoe.manufacturer}
              </p>
              <button onClick={() => this.delete(shoe.id)}>Delete Shoe</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

class ShoesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoeColumns: [[], [], []],
    };
    this.delete = this.delete.bind(this)
  }
  async delete(shoeId) {
    const shoeUrl = `http://localhost:8080/api/shoes/${shoeId}/`
    const fetchConfig = {
        method: "delete",
    }
    const response = await fetch(shoeUrl, fetchConfig);
       if (response.ok) {
        console.log("delete successful");
}
  }

  async componentDidMount() {
    const url = 'http://localhost:8080/api/shoes/';

    try {
      const response = await fetch(url);
      if (response.ok) {
        // Get the list of conferences
        const data = await response.json();

        // Create a list of for all the requests and
        // add all of the requests to it
        const requests = [];
        for (let shoe of data.shoes) {
          const detailUrl = `http://localhost:8080/api/shoes/${shoe.id}`;
          requests.push(fetch(detailUrl));
        }

        // Wait for all of the requests to finish
        // simultaneously
        const responses = await Promise.all(requests);

        // Set up the "columns" to put the conference
        // information into
        const shoeColumns = [[], [], []];

        // Loop over the conference detail responses and add
        // each to to the proper "column" if the response is
        // ok
        let i = 0;
        for (const shoeResponse of responses) {
          if (shoeResponse.ok) {
            const details = await shoeResponse.json();
            shoeColumns[i].push(details);
            i = i + 1;
            if (i > 2) {
              i = 0;
            }
          } else {
            console.error(shoeResponse);
          }
        }

        // Set the state to the new list of three lists of
        // conferences
        this.setState({shoeColumns: shoeColumns});
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <>
        <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
        <img className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" alt="" width="600" />
          <h1 className="display-5 fw-bold">Shoes</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              Here is a collection of all your shoes
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to="/shoes/new" className="btn btn-primary btn-lg px-4 gap-3">Add a new Shoe</Link>
            </div>
          </div>
        </div>
        <div className="container">
          <h2>Your Current Inventory</h2>
          <div className="row">
            {this.state.shoeColumns.map((shoeList, index) => {
              return (
                <ShoeColumn key={index} list={shoeList} />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default ShoesList;