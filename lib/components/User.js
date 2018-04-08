import React, { Component, PropTypes } from "react";
import { Card, Image } from "semantic-ui-react";

export default class User extends Component {
  render() {
    return (
      <Card onClick={() => this.props.selectUser({ user: "test123" })}>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="https://react.semantic-ui.com//assets/images/avatar/large/steve.jpg"
          />
          <Card.Header>Steve Sanders</Card.Header>
          <Card.Meta>ssanders@gmail.com</Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}
