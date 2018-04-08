import React, { Component } from "react";
import { Input, Label } from "semantic-ui-react";

export default class Form extends Component {
  render() {
    //     {
    //    payer: { chargeAccountId: '#', name },
    //    payee: { chargeAccountId: '#', name },
    //    amount: #,
    // },
    return (
      <div className="form-inline w-100">
        <div className="input-group w-100">
          <input
            type="text"
            className="form-control w-100"
            placeholder="Amount..."
          />
          <button
            onClick={() =>
              this.props.sendPayment({ payer: null, payee: null, amount: 1 })
            }
            className="form-control w-25 btn-primary"
            style={{ textAlgin: "center" }}
          >
            Send BTC
          </button>
        </div>
      </div>
    );
  }
}
