import React, { Component } from 'react';
import {Link, Route, BrowserRouter} from 'react-router-dom';

class HoldingRow extends Component {
constructor(props){
  super(props);
    this.delete = this.delete.bind(this);
    this.state = {
       toHolding: false,
      };
 }

  delete() {
          fetch('/api/holdings/' + this.props.obj.symbol, {
             method: 'DELETE',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
               },
           }).then(response => {
                     if(response.ok) return this.setState(() => ({ toHolding: true }))
                     throw new Error('Request failed.');
                   })
                   .catch(error => {
                     console.log(error);
                   });
      }

  render() {
    return (
        <tr>
          <td>
            {this.props.obj.symbol}
          </td>
          <td>
            {this.props.obj.symbolDescription}
          </td>
           <td>
            {this.props.obj.amount}
           </td>
           <td>
             <Link to={this.props.url + '/edit/' + this.props.obj.symbol} className="btn btn-primary">Edit</Link>
           </td>
           <td>
              <button onClick={this.delete} className="btn btn-danger">Delete</button>
           </td>
        </tr>
    );
  }
}

export default HoldingRow;