import React, { Component } from 'react';
import {FormControl, FormGroup, Form, ControlLabel, Button, Col} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';


export default class CreateAllocation extends Component {
constructor(props){
  super(props);
  this.onSubmit = this.onSubmit.bind(this);
  this.onChangeSymbol = this.onChangeSymbol.bind(this);
  this.onChangePercentage = this.onChangePercentage.bind(this);
  this.state = {
   symbol: '',
   percentage: 0.0,
   toAllocation: false,
  };
}

onChangeSymbol(e) {
    this.setState({
      symbol: e.target.value
    });
  }
  onChangePercentage(e) {
    this.setState({
      percentage: e.target.value
    })
  }

onSubmit(e){
    e.preventDefault();

fetch('/api/allocations', {
   method: 'POST',
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
              state: { referrer: '/create' }
            }
        } />
        }
     return (
     <div style={{ marginTop: 10 }}>
                 <h3>Add New Allocation</h3>
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
                            type="text"
                            value={this.state.symbol}
                            onChange={this.onChangeSymbol}
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
                              Create Allocation
                      </Button>
                    </Col>
                  </FormGroup>
                 </Form>
             </div>
      );
    }
  }
