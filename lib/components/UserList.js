import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import User from "./User";

export default class UserList extends Component {
  render() {
    return (
      <div className="user-list">
        {[1, 2, 3].map(user => (
          <User selectUser={this.props.selectUser} key={user} />
        ))}
      </div>
    );
  }
}
