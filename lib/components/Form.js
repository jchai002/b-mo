import React, { Component } from 'react';
import { Input, Label } from 'semantic-ui-react';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { amount: '' };
  }
  render() {
    return (
      <div className="form-inline w-100">
        <div className="input-group w-100">
          <input
            type="text"
            className="form-control w-100"
            placeholder="Amount..."
            value={this.state.amount}
            onChange={e => {
              this.setState({ amount: e.target.value });
            }}
          />
          <button
            onClick={() => {
              this.props.sendPayment({
                payer: this.props.currentUser,
                payee: this.props.selectedUser,
                amount: this.state.amount
              });
              this.setState({ amount: '' });
            }}
            className="form-control w-25 btn-primary"
            style={{ textAlgin: 'center', display: 'block' }}
          >
            Send ₿TC
          </button>
        </div>
      </div>
    );
  }
}
