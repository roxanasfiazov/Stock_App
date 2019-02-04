import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {FormControl, FormGroup, HelpBlock, Form, ControlLabel, Button, Col} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';


export default class EditHolding extends Component {
constructor(props){
  super(props);
  this.onSubmit = this.onSubmit.bind(this);
  this.onChangeAmount = this.onChangeAmount.bind(this);
  this.state = {
   symbol: '',
   amount: 0.0,
   toHolding: false,
  };
}
componentDidMount() {
  fetch('/api/holdings/' + this.props.match.params.symbol, {
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
                       amount: data.amount});
      })
      .catch(error => {
        console.log(error);
      });
  }
  onChangeAmount(e) {
    this.setState({
      amount: e.target.value
    })
  }

onSubmit(e){
    e.preventDefault();

fetch('/api/holdings/' + this.props.match.params.symbol, {
   method: 'PUT',
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
              state: { referrer: '/edit' }
            }
        } />
        }
     return (
     <div style={{ marginTop: 10 }}>
                 <h3>Update Holding</h3>
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
                              Update Holding
                      </Button>
                    </Col>
                  </FormGroup>
                 </Form>
             </div>
      );
    }
  }
