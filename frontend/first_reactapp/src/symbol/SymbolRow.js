import React, { Component } from 'react';

class SymbolRow extends Component {
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.shortcut}
          </td>
          <td>
            {this.props.obj.description}
          </td>
        </tr>
    );
  }
}

export default SymbolRow;