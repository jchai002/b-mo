import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import User from './User';

export default class UserList extends Component {
  render() {
    return (
      <div className="user-list">
        {this.props.users.map(user => (
          <User
            onClick={() => this.props.selectUser(user)}
            userName={user.name}
            userEmail={user.email}
            key={user.userAccountId}
          />
        ))}
      </div>
    );
  }
}
