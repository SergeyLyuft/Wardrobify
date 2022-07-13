import React from "react";
import { render } from "react-router-dom";



function HatsList(props) {
        return (
            <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Picture</th>
                    <th>Fabric</th>
                    <th>Style</th>
                    <th>Color</th>
                  </tr>
                </thead>
                <tbody>
                  {props.hats.map(hat => {
                    return (
                      <tr key={hat.id}>
                        <td><img src={ hat.picture_url } alt="" height="300" /></td> 
                        <td>{ hat.fabric }</td>
                        <td>{ hat.style }</td>
                        <td>{ hat.color }</td>
                                               
                      </tr>
                    );
                  })}
                </tbody>
            </table>    
        );
    
}


export default HatsList