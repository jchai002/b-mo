import React, { Component, PropTypes } from 'react';
import { Feed } from 'semantic-ui-react';
import moment from 'moment';

export default class TransactionRow extends Component {
  render() {
    const { userName, userEmail, ...rest } = this.props;
    return (
      <Feed.Event>
        <Feed.Label image={`https://robohash.org/test.png?set=set4`} />
        <Feed.Content>
          <Feed.Date content={moment(1523214623).format()} />
          <Feed.Summary>
            {(0.032).toFixed(5)} BTC sent to ssanders@gmail.com -{' '}
            <a href="https://blockchain.info/tx/4f6c60d4dea51c3cdaea7c0c69439bb05bcb7bb2b0e85488ff15b8a94829f900">
              Details
            </a>.
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    );
  }
}
