import React, { Component, PropTypes } from 'react';
import { Card, Image } from 'semantic-ui-react';

export default class User extends Component {
  render() {
    const { userName, userEmail, ...rest } = this.props;
    return (
      <Card {...rest} key={userEmail}>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src={`https://robohash.org/${userEmail}.png?set=set4`}
          />
          <Card.Header>{userName || '--'}</Card.Header>
          <Card.Meta>{userEmail}</Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}
