import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {FormControl, FormGroup, HelpBlock, Form, ControlLabel, Button, Col} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';


export default class CreateHolding extends Component {
constructor(props){
  super(props);
  this.onSubmit = this.onSubmit.bind(this);
  this.onChangeSymbol = this.onChangeSymbol.bind(this);
  this.onChangeAmount = this.onChangeAmount.bind(this);
  this.state = {
   symbol: '',
   amount: 0.0,
   toHolding: false,
  };
}

onChangeSymbol(e) {
    this.setState({
      symbol: e.target.value
    });
  }
  onChangeAmount(e) {
    this.setState({
      amount: e.target.value
    })
  }

onSubmit(e){
    e.preventDefault();

fetch('/api/holdings', {
   method: 'POST',
   headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
   body: JSON.stringify({
     "symbol": this.state.symbol,
     "amount": this.state.amount
   })
 }).then(response => {
           if(response.ok) return this.setState(() => ({ toHolding: true }))
           throw new Error('Request failed.');
         })
         .catch(error => {
           console.log(error);
         });
   this.setState({
         symbol: '',
         amount: 0.0,
       })
}

getValidationState() {
    const length = this.state.symbol.length;
    if (length < 5) return 'success';
    else if (length > 5) return 'error';
    return null;
  }

   render() {
        if (this.state.toHolding === true) {
          return <Redirect to={
          {
              pathname: '/holdings',
              state: { referrer: '/create' }
            }
        } />
        }
     return (
     <div style={{ marginTop: 10 }}>
                 <h3>Add New Holding</h3>
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
                 <FormGroup controlId="formAmount">
                    <Col componentClass={ControlLabel} sm={2}>
                          Amount
                    </Col>
                    <Col sm={10}>
                          <FormControl type="number"
                                       pattern="[0-9]*"
                                       placeholder="%"
                                       value={this.state.amount}
                                       onChange={this.onChangeAmount}
                           />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                      <Button type="submit"
                              bsStyle="primary">
                              Create Holding
                      </Button>
                    </Col>
                  </FormGroup>
                 </Form>
             </div>
      );
    }
  }
