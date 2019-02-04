import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class AllocationRow extends Component {
constructor(props){
  super(props);
  this.delete = this.delete.bind(this);
  this.state = {
     toAllocation: false,
    };
 }

   delete() {
         fetch('/api/allocations/' + this.props.obj.symbol, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
          }).then(response => {
                    if(response.ok) return this.setState(() => ({ toAllocation: true }))
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
            {this.props.obj.percentage}%
           </td>
           <td>
            <Link to={this.props.url + '/edit/' +this.props.obj.symbol} className="btn btn-primary">Edit</Link>
           </td>
           <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
           </td>
        </tr>
    );
  }
}

export default AllocationRow;