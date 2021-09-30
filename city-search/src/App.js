import React, { Component } from 'react';
import './App.css';

function ZipCode(props){
  return(
    <div className="App-style">
      <div className="Header-style">Zipcodes: </div>
      <ul className="List-style">
      {props.zipCodeList}
      </ul>
    </div>

  )

}

function CitySearchField(props){
  return(
  <div>
    <label for="cityInput">City Name: </label>
    <input type="text" id="cityInput" onChange={props.changeHandler}/>
  </div>
  )
}

class App extends Component {

  state={
    city: "",
    zipCodes: [],
  }

  cityChanged = (e) => {
   console.log(e.target.value.toUpperCase());
   this.setState({city: e.target.value});

   if (isNaN(e.target.value)){
    fetch("http://ctp-zip-api.herokuapp.com/city/"+e.target.value.toUpperCase())
    .then((response) => response.json()).then((data) => {
      this.setState({zipCodes: data,});
      console.log(this.state.zipCodes);
     })
    
   }else{
      console.log("Error, please enter a non-numerical value")
    }

  }

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField zipCode={this.state.city} changeHandler={this.cityChanged} />
        <div className="App-style">Current City: {this.state.city}</div>
        <div>
          <ZipCode zipCodeList={this.state.zipCodes.map((num) =>{
            return(
              <li>{num}</li>
            );
          })}/>
        </div>
      </div>
    );
  }
}



export default App;
