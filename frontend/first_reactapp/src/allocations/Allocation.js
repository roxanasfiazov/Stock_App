import React, { Component } from 'react';
import AllocationRow from './AllocationRow';
import {FormGroup, Form, ControlLabel} from 'react-bootstrap';
import {Link, Route, BrowserRouter, Switch} from 'react-router-dom';
import CreateAllocation from './CreateAllocation';
import EditAllocation from './EditAllocation';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

export default class Allocation extends Component {

constructor(props){
  super(props);
  this.state = {
   allocations: [],
   referrer: '',
  };
}

componentWillReceiveProps (nextProps) {
   console.log(nextProps);
}

 componentDidMount() {
  fetch('/api/allocations', {
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
        this.setState({allocations: data });
      })
      .catch(error => {
        console.log(error);
      });
  }

   tabRow(path, url){
        return this.state.allocations.map(function(object){
            return <AllocationRow obj={object} key={object.symbol} path={path} url={url}/>;
        });
      }

   render() {
     return (
               <BrowserRouter>
        <div>
        <Form inline>
        <FormGroup controlId="formAllocationList">
            <ControlLabel>Allocations List</ControlLabel>{' '}
          </FormGroup>{' '}
          <br/>
            <Link to={this.props.match.url + '/create'} className="btn btn-primary">Create</Link>
        </Form>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Shortcut</th>
                <th>Shortcut Description</th>
                <th>Allocation Percentage</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow(this.props.match.path, this.props.match.url) }
            </tbody>
          </table>
            <Switch>
           <Route path={this.props.match.path + '/create'} component={CreateAllocation}/>
           <Route path={this.props.match.path + '/edit/:symbol'} component={EditAllocation}/>
           </Switch>

           </div>
        </BrowserRouter>

      );
    }
  }