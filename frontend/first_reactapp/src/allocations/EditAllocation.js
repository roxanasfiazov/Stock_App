import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {FormControl, FormGroup, HelpBlock, Form, ControlLabel, Button, Col} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';


export default class EditAllocation extends Component {
constructor(props){
  super(props);
  this.onSubmit = this.onSubmit.bind(this);
  this.onChangePercentage = this.onChangePercentage.bind(this);
  console.log(props);
  this.state = {
   symbol: '',
   percentage: 0.0,
  };
}

 componentDidMount() {
  fetch('/api/allocations/' + this.props.match.params.symbol, {
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
        this.setState({symbol: data.symbol,
                       percentage: data.percentage});
      })
      .catch(error => {
        console.log(error);
      });
  }

  onChangePercentage(e) {
    this.setState({
      percentage: e.target.value
    })
  }

onSubmit(e){
    e.preventDefault();

fetch('/api/allocations/' + this.props.match.params.symbol, {
   method: 'PUT',
   headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
   body: JSON.stringify({
     "symbol": this.state.symbol,
     "percentage": this.state.percentage
   })
 }).then(response => {
           if(response.ok) return this.setState(() => ({ toAllocation: true }))
           throw new Error('Request failed.');
         })
         .catch(error => {
           console.log(error);
         });
   this.setState({
         symbol: '',
         percentage: 0.0,
       })
}

getValidationState() {
    const length = this.state.symbol.length;
    if (length < 5) return 'success';
    else if (length > 5) return 'error';
    return null;
  }

   render() {
        if (this.state.toAllocation === true) {
          return <Redirect to={
          {
              pathname: '/allocations',
              state: { referrer: '/edit' }
            }
        } />
        }
     return (
     <div style={{ marginTop: 10 }}>
                 <h3>Update Allocation</h3>
                 <Form horizontal
                 onSubmit={this.onSubmit}>
                 <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}>
                    <Col componentClass={ControlLabel} sm={2}>
                          Symbol
                    </Col>
                    <Col sm={10}>
                          <FormControl
                          readOnly
                            type="text"
                            value={this.state.symbol}
                          />
                    </Col>
                 </FormGroup>
                 <FormGroup controlId="formPercentage">
                    <Col componentClass={ControlLabel} sm={2}>
                          Percentage
                    </Col>
                    <Col sm={10}>
                          <FormControl type="number"
                                       pattern="[0-9]*"
                                       placeholder="%"
                                       value={this.state.percentage}
                                       onChange={this.onChangePercentage}
                           />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                      <Button type="submit"
                              bsStyle="primary">
                              Update Allocation
                      </Button>
                    </Col>
                  </FormGroup>
                 </Form>
             </div>
      );
    }
  }
