import React, { Component } from 'react';
import './App.css';


class App extends Component{
  
  state = {
    country:[],
    actualCountry: {
      capital:'',
      currency:'',
      flag:''

    }
  }

  componentDidMount(){
    fetch('https://restcountries.eu/rest/v2/all')
    .then(res => res.json())
    .then(data => this.setState({country:data}))
    .then(() => console.log(this.state.country));
  }

  Checkme = (e) =>{
    this.state.country.forEach(country => {
      if(e.target.value === country.name){
          this.setState({actualCountry:{
            capital: country.capital,
            currency: `${country.currencies[0].name} ${country.currencies[0].symbol}`,
            flag: country.flag
          }})
        }
    })
  }

  render(){
    return (
      <div>
        <select onChange = {(e) => this.Checkme(e)}>
          {this.state.country.map(opt => {
            return(
              <option key = {opt.name} value = {`${opt.name}`}>{`${opt.name}`}</option>
            )
          })}
        </select>
          <div>
            <img src = {this.state.actualCountry.flag} alt = "flag"></img>
            <p>{this.state.actualCountry.capital}</p>
            <p>{this.state.actualCountry.currency}</p> 
          </div>
      </div>
    );
  }
}// later add another stats

export default App;
