import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SymbolRow from './SymbolRow';

export default class Symbol extends Component {
constructor(){
  super();
  this.state = {
   symbols: []
  };
}
 componentDidMount() {
  fetch('/api/symbols', {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'}
  })
      .then(response => {
        if(response.ok) return response.json();
        throw new Error('Request failed.');
      })
      .then(data => {
      console.log(data);
            console.log(data.length);
        this.setState({symbols: data });
      })
      .catch(error => {
        console.log(error);
      });
  }

   tabRow(){
        return this.state.symbols.map(function(object, i){
            return <SymbolRow obj={object} key={i} />;
        });
      }

   render() {

     return (
        <div>
          <h3 align="center">Symbol List</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Shortcut</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
      );
    }
  }
