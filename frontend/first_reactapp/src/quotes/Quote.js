import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import QuoteRow from './QuoteRow';

export default class Quote extends Component {
constructor(){
  super();
  this.state = {
   quotes: []
  };
}
 componentWillMount() {
  fetch('/api/quotes', {
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
        this.setState({quotes: data });
      })
      .catch(error => {
        console.log(error);
      });
  }

   tabRow(){
        return this.state.quotes.map(function(object, i){
            return <QuoteRow obj={object} key={i} />;
        });
      }

   render() {

     return (
        <div>
          <h3 align="center">Quotes List</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Shortcut</th>
                <th>Shortcut Description</th>
                <th>Quote Price</th>
                <th>Trading Date</th>
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
