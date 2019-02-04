import React, { Component } from 'react';

class QuoteRow extends Component {
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
            {this.props.obj.price}
           </td>
            <td>
             {this.props.obj.tradingDay}
           </td>           
        </tr>
    );
  }
}

export default QuoteRow;