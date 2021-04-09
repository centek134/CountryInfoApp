import React, { Component } from 'react';
import './App.css';


class App extends Component{
  
  state = {
    country:[],
    actualCountry: {
      flag:'',
      region:'',
      subRegion:'',
      capital:'',
      language:'',
      population: 0,
      currencyName:'',
      currSymbol:'',
      time:''

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
          let langs = '';
          let timesss = '';
          for (const time of country.timezones){
            timesss += `${time}, `;
          };
          timesss = timesss.slice(0, timesss.length - 2);
          country.languages.forEach(lang => langs+=`${lang.name}, `);
          langs = langs.slice(0, langs.length - 2);


          this.setState({actualCountry:{

            flag: country.flag,
            region: country.region,
            subRegion: country.subregion,
            capital: country.capital,
            language: langs,
            population: country.population.toLocaleString('pl-PL'),
            currencyName: country.currencies[0].name,
            currSymbol: country.currencies[0].symbol,
            time: timesss
          }})
        }
    })
  }

  render(){
    return (
      <div className = "wrap">
        <div className = "middle">
          <div className = "flag" style = {{backgroundImage: `url(${this.state.actualCountry.flag})`}}></div>
          <div className = "infoTable">
            <select className = "sel" onChange = {(e) => this.Checkme(e)}>
              <option value = "none">Select Country</option>
              {this.state.country.map(opt => {
                return(
                  <option key = {opt.name} value = {`${opt.name}`}>{`${opt.name}`}</option>
                  )
                })}
            </select>
            <p><span>Region:</span> {this.state.actualCountry.region}</p>
            <p><span>Subregion:</span>  {this.state.actualCountry.subRegion}</p>
            <p><span>Capital:</span>  {this.state.actualCountry.capital}</p>
            <p><span>Language:</span> {this.state.actualCountry.language}</p>
            <p><span>Population: </span>{this.state.actualCountry.population}</p>
            <p><span>Currency name:</span> {this.state.actualCountry.currencyName}</p>
            <p><span>Currency symbol:</span> {this.state.actualCountry.currSymbol}</p> 
            <p><span>Time zone:</span> {this.state.actualCountry.time}</p>
          </div>
        </div>
      </div>
    );
  }
}// later add another stats

export default App;
