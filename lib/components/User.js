import React, { Component, PropTypes } from "react";
import { Card, Image } from "semantic-ui-react";

export default class User extends Component {
  render() {
    const user = {
      name: "Steve Sanders",
      email: "ssanders@gmail.com"
    };
    return (
      <Card onClick={() => this.props.selectUser({ user: "test123" })}>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src={`https://robohash.org/${user.email}.png?set=set4`}
          />
          <Card.Header>{user.name}</Card.Header>
          <Card.Meta>{user.email}</Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}
