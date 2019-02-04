import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HoldingRow from './HoldingRow';
import CreateHolding from './CreateHolding';
import EditHolding from './EditHolding';
import {FormControl, FormGroup, HelpBlock, Form, ControlLabel, Button, Col} from 'react-bootstrap';
import {Link, Route, BrowserRouter, Switch} from 'react-router-dom';

export default class Holding extends Component {
constructor(props){
  super(props);
  this.state = {
   holdings: [],
   referrer: '',
  };
}
 componentDidMount() {
  fetch('/api/holdings', {
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
        this.setState({holdings: data });
      })
      .catch(error => {
        console.log(error);
      });
  }

   tabRow(path, url){
        return this.state.holdings.map(function(object){
            return <HoldingRow obj={object} key={object.symbol} path={path} url={url} />;
        });
      }

   render() {

     return (
      <BrowserRouter>
      <div>
        <Form inline>
               <FormGroup controlId="formHoldingList">
                   <ControlLabel>Holdings List</ControlLabel>{' '}
                 </FormGroup>{' '}
                 <br/>
                   <Link to={this.props.match.url + '/create'} className="btn btn-primary">Create</Link>
               </Form>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Shortcut</th>
                <th>Shortcut Description</th>
                <th>Holding Amount</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow(this.props.match.path, this.props.match.url) }
            </tbody>
          </table>
           <Switch>
           <Route path={this.props.match.path + '/create'} component={CreateHolding}/>
           <Route path={this.props.match.path + '/edit/:symbol'} component={EditHolding}/>
          </Switch>
          </div>
                </BrowserRouter>
      );
    }
  }
