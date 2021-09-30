import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
  <div>
    <div>{props.cityName}</div>
  </div>);
}



function ZipSearchField(props) {
  return (
  <div className="Component-margin Component-alignment" >
    <label for="zipCodeField">Zip Code:</label>
    <input type="text" id="zipCodeField" onChange={props.changeHandler} />
  </div>);
}



class App extends Component {

  state = {
    zipCode: "",
    cities: [],

  }

 zipChanged = (e) =>{
   console.log(e.target.value);
   this.setState({zipCode:e.target.value});

   if ((e.target.value.length !== 5) || (isNaN(e.target.value))){
     console.log("Error, not a valid zip code")
   }else{
     fetch("http://ctp-zip-api.herokuapp.com/zip/"+e.target.value)
     .then((response) => response.json()).then((data) => {
      this.setState({cities: data,});
      console.log(this.state.cities);
     })
    }
  }
    
  
     

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div className="Component-margin Header-alignment ">
        <ZipSearchField zipCode={this.state.zipCode} changeHandler={this.zipChanged} />
        </div>
        <div className="Component-margin Header-alignment">Current Zip Code: {this.state.zipCode}</div>
        <div>
          <City cityName={this.state.cities.map((city) => {
             return (
               <div>
                 <div >
                   <div className="Component-margin Header-alignment Header-style">
                    <span>{city.City},&nbsp;</span>
                    <span>{city.State}</span>
                     </div>
                     <div className="Data-alignment">
                      <ul>
                        <li>State:&nbsp;{city.State}</li>
                        <li>Location:&nbsp;(<span>{city.Lat}</span>,&nbsp;<span>{city.Long})</span></li>
                        <li>Population (estimated):&nbsp;{city.EstimatedPopulation}</li>
                        <li>Total Wages:&nbsp;{city.TotalWages}</li>
                      </ul>
                   </div>
                  </div>
               </div>
              );
           })}
          />
        </div>
       
     </div>
    );
  }
}

export default App;
