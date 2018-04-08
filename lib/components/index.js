import 'semantic-ui-css/semantic.min.css';
import React, { Component } from 'react';
import { Header } from '@bpanel/bpanel-ui';
import { Segment, Card, Feed, Label, Divider } from 'semantic-ui-react';
import UserList from './UserList';
import Form from './Form';
import SelectedUser from './SelectedUser';

export default class BmoPlugin extends Component {
  render() {
    if (!this.props.bmo.currentUser) {
      return null;
    }
    const { friends, transactions } = this.props.bmo.currentUser;
    const { selectedUser } = this.props.bmo;
    console.log('got new state', this.props);
    console.log(selectedUser);
    return (
      <div>
        <Header type="h2">B-Mo, it's Venmo for bitcoin</Header>
        <Segment
          className="container"
          style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
        >
          <div className="row">
            <div className="col-lg-4">
              {selectedUser ? <SelectedUser user={selectedUser} /> : null}
            </div>
            <div className="col-lg-8">
              <Form
                sendPayment={this.props.sendPayment}
                currentUser={this.props.bmo.currentUser}
                selectedUser={selectedUser}
              />
            </div>
          </div>
          <Divider fitted className="my-4" />
          <div className="row">
            <div className="col-lg-4">
              <UserList selectUser={this.props.selectUser} users={friends} />
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
                          0.032 BTC sent to ssanders@gmail.com -{' '}
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
