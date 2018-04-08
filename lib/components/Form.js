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
      <div className="payment-form w-100">
        <Label basic>₿</Label>
        <Input labelPosition="right" type="text" placeholder="Amount..." />
        <Label
          onClick={() =>
            this.props.sendPayment({ payer: null, payee: null, amount: 1 })
          }
        >
          Send BTC
        </Label>
      </div>
    );
  }
}
