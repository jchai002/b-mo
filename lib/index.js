// lib/index.js
import React from 'react';
import * as actions from './actions';
import BmoPlugin from './components';

export const metadata = {
  name: 'bmo',
  pathName: 'bmo',
  displayName: 'bmo',
  author: '',
  description: '',
  version: require('../package.json').version,
  sidebar: true,
  icon: 'info'
};

// Decorate a target component (e.g. Footer, Header, Sidebar)
export const decorateSidebar = (Sidebar, { React, PropTypes }) => {
  return class extends React.PureComponent {
    static displayName() {
      return metadata.name;
    }

    static get propTypes() {
      return {
        customChildren: PropTypes.node
      };
    }

    render() {
      const { customChildren: existingCustomChildren } = this.props;

      const customChildren = (
        <div className="container">{existingCustomChildren}</div>
      );

      return <Sidebar {...this.props} customChildren={customChildren} />;
    }
  };
};
// a decorator for the Panel container component in our app
// here we're extending the Panel's children by adding
// our plugin's component (`MyComponent` below)
// You'll want to make sure to import an actual component
// This is what you need if you're making a new view/route
export const decoratePanel = (Panel, { React, PropTypes }) => {
  return class extends React.Component {
    static displayName() {
      return metadata.name;
    }

    render() {
      const { customChildren = [] } = this.props;
      const routeData = {
        name: metadata.name,
        metadata,
        Component: BmoPlugin
      };
      return (
        <Panel
          {...this.props}
          customChildren={customChildren.concat(routeData)}
        />
      );
    }
  };
};
// If you're adding a whole new view/Panel
// you'll want this to get props from the state, through
// Panel and to your specific route

// mapComponentDispatch will use react-redux's connect to
// retrieve props from the state, but we need a way
// for the Panel Container to pass it down to the plugin's Route view
// props getters like this are used in the app to pass new props
// added by plugins down to children components (such as your plugin)
// The Route props getter is special since different routes will want diff props
// so we pass the getter as the value of an object prop, w/ the key
// corresponding to the route that needs the props
export const getRouteProps = {
  [metadata.name]: (parentProps, props) =>
    Object.assign(props, {
      bmo: parentProps.bmo,
      selectUser: parentProps.selectUser,
      sendPayment: parentProps.sendPayment
    })
};

// This connects your plugin's component to the state's dispatcher
// Make sure to pass in an actual action to the dispatcher
export const mapComponentDispatch = {
  Panel: (dispatch, map) =>
    Object.assign(map, {
      selectUser: user => dispatch(actions.selectUser(user)),
      sendPayment: tx => dispatch(actions.sendPayment(tx))
    })
};

// Tells the decorator what our plugin needs from the state
// This is available for container components that use an
// extended version of react-redux's connect to connect
// a container to the state and retrieve props
// make sure to replace the corresponding state mapping
// (e.g. `state.chain.height`) and prop names
export const mapComponentState = {
  Panel: (state, map) =>
    Object.assign(map, {
      bmo: state.plugins.bmo
    })
};

// custom middleware for our plugin. This gets
// added to the list of middlewares in the app's store creator
// Use this to intercept and act on dispatched actions
// e.g. for responding to socket events
export const middleware = store => next => async action => {
  const { dispatch, getState } = store;
  const { type, payload } = action;
  switch (type) {
    case 'APP_LOADED':
      dispatch({
        type: 'ADD_PLUGIN',
        payload: {
          id: 'bmo',
          contacts: [],
          transactions: [],
          currentUser: null,
          selectedUser: null,
          transactionInputAmount: null,
          children: {},
          otherProps: {}
        }
      });
      break;
    case 'SOCKET_CONNECTED':
      break;
    case 'ADD_NEW_BLOCK':
      break;
  }

  next(action);
};

export const reducePlugins = (state, action) => {
  const { type, payload } = action;
  let currentTransactions;
  switch (type) {
    case 'NEW_TRANSACTION':
      console.log('hey im in reducer NEW_TRANSACTION', action);
      // const userAccount = [].concat(payload).pop();
			// return state.setIn(['bmo', 'currentUser'], userAccount);
			return state
    case 'USER_AUTH':
      console.log('hey im in reducer USER_AUTH', action);
      const userAccount = [].concat(payload).pop();
      return state.setIn(['bmo', 'currentUser'], userAccount);
    // return state.setIn(["bmo", "selectedUser"], null);
    case 'PAYMENT_SENT':
      console.log('hey im in reducer PAYMENT_SENT');
      return state.setIn(['bmo', 'selectedUser'], null);
    case 'PAYMENT_RECEIVED':
      currentTransactions = state.getIn(['bmo', 'transactions']);
      return state.setIn(
        ['bmo', 'transactions'],
        currentTransactions.concat(payload)
      );
    case 'PAYMENT_CONFIRMED':
      currentTransactions = state.getIn(['bmo', 'transactions']);
      return state.setIn(
        ['bmo', 'transactions'],
        currentTransactions.concat(payload)
      );
    case 'ACCOUNT_BALANCE_UPDATED':
      return state.setIn(['bmo', 'currentUser'], payload);
    case 'USER_SELECTED':
      return state.setIn(['bmo', 'selectedUser'], payload);
    default:
      return state;
  }
};

// add new socket listeners
// push an object with event and actionType properties
// onto existing array of listeners
export const addSocketConstants = (sockets = { listeners: [] }) => {
  sockets.listeners.push({
    event: 'NEW_TRANSACTION',
    actionType: 'NEW_TRANSACTION'
  });
  sockets.listeners.push({
    event: 'PAYMENT_RECEIVED',
    actionType: 'PAYMENT_RECEIVED'
  });
  sockets.listeners.push({
    event: 'PAYMENT_CONFIRMED',
    actionType: 'PAYMENT_CONFIRMED'
  });
  sockets.listeners.push({
    event: 'USER_AUTH',
    actionType: 'USER_AUTH'
  });
  return Object.assign(sockets, {
    socketListeners: sockets.listeners
  });
};

/* END EXPORTS */
