import "semantic-ui-css/semantic.min.css";
import React, { Component } from "react";
import { Header } from "@bpanel/bpanel-ui";
import { Segment, Card, Feed, Label } from "semantic-ui-react";
import UserList from "./UserList";
import Form from "./Form";

export default class BmoPlugin extends Component {
  render() {
    console.log("got new state", this.props);
    return (
      <div>
        <Header type="h2">B-Mo, it's Venmo for bitcoin</Header>
        <Segment className="container">
          <div className="row">
            <div className="col-lg-4">
              <p>Recipient:</p>
              <Label className="w-100" as="a" image>
                <img src="https://react.semantic-ui.com//assets/images/avatar/large/steve.jpg" />
                Steve Sanders
              </Label>
            </div>
            <div className="col-lg-8">
              <Form sendPayment={this.props.sendPayment} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <UserList selectUser={this.props.selectUser} />
            </div>
            <div className="col-lg-8">
              <Card className="w-100">
                <Card.Content>
                  <Card.Header>Transaction History</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Feed>
                    <Feed.Event>
                      <Feed.Label image="https://react.semantic-ui.com//assets/images/avatar/small/jenny.jpg" />
                      <Feed.Content>
                        <Feed.Date content="1 day ago" />
                        <Feed.Summary>
                          0.032 BTC sent to ssanders@gmail.com -{" "}
                          <a href="https://blockchain.info/tx/4f6c60d4dea51c3cdaea7c0c69439bb05bcb7bb2b0e85488ff15b8a94829f900">
                            Details
                          </a>.
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                </Card.Content>
              </Card>
            </div>
          </div>
        </Segment>
      </div>
    );
  }
}