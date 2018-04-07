// lib/index.js
import React from 'react';
import { Header, Text } from '@bpanel/bpanel-ui';
import * as actions from './actions';

const NodeInfo = ({ network, height, progress, recentBlocks = [] }) => (
  <div>
    <Header type="h2">Node Info</Header>
    <Text type="p">Network: {network}</Text>
    <Text type="p">Height: {height}</Text>
    <Text type="p">Progress: {progress}</Text>
    <Text type="p">Recent Blocks:</Text>
    <ul>{recentBlocks.map((hash, index) => <li key={index}>{hash}</li>)}</ul>
  </div>
);

export const metadata = {
  name: 'b-mo',
  pathName: 'b-mo',
  displayName: 'b-mo',
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
        Component: NodeInfo
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
      network: parentProps.network,
      height: parentProps.height,
      progress: parentProps.progress,
      recentBlocks: parentProps.recentBlocks
    })
};

// This connects your plugin's component to the state's dispatcher
// Make sure to pass in an actual action to the dispatcher
export const mapComponentDispatch = {
  // Sidebar: (dispatch, map) =>
  //   Object.assign(map, {
  //     actionCreator: () => dispatch(actionCreator())
  //   })
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
      network: state.node.node.network,
      height: state.chain.height,
      progress: state.chain.progress,
      recentBlocks: state.chain.recentBlocks
    })
};

// custom middleware for our plugin. This gets
// added to the list of middlewares in the app's store creator
// Use this to intercept and act on dispatched actions
// e.g. for responding to socket events
export const middleware = ({ dispatch }) => next => async action => {
  const { type, payload } = action;
  if (type === 'SOCKET_CONNECTED') {
    dispatch(actions.watchChain());
    dispatch(actions.subscribeBlockConnect());
  } else if (type === 'ADD_NEW_BLOCK') {
    dispatch(actions.updateChain(...payload));
  }
  next(action);
};
// decorator for the node reducer
// this will extend the current node reducer
// make sure to replace the constants
// and prop names with your actual targets
// NOTE: state uses `seamless-immutable` to ensure immutability
// See their API Docs for more details (e.g. `set`)
// https://www.npmjs.com/package/seamless-immutable
export const reduceNode = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    // case 'ACTION_CONSTANT': {
    //   return state.set('testProp', payload);
    //   break;
    // }

    default:
      return state;
  }
};

// decorator for the chain reducer
// this will extend the current chain reducer
// make sure to replace the constants
// and prop names with your actual targets
// NOTE: state uses `seamless-immutable` to ensure immutability
// See their API Docs for more details (e.g. `set`)
// https://www.npmjs.com/package/seamless-immutable
export const reduceChain = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    // case 'ACTION_CONSTANT': {
    //   return state.set('testProp', payload);
    //   break;
    // }

    default:
      return state;
  }
};

// decorator for the wallets reducer
// this will extend the current wallets reducer
// make sure to replace the constants
// and prop names with your actual targets
// NOTE: state uses `seamless-immutable` to ensure immutability
// See their API Docs for more details (e.g. `set`)
// https://www.npmjs.com/package/seamless-immutable
export const reduceWallets = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    // case 'ACTION_CONSTANT': {
    //   return state.set('testProp', payload);
    //   break;
    // }

    default:
      return state;
  }
};

// add new socket listeners
// push an object with event and actionType properties
// onto existing array of listeners
export const addSocketConstants = (sockets = { listeners: [] }) => {
  sockets.listeners.push({
    event: 'new block',
    actionType: 'ADD_NEW_BLOCK'
  });
  return Object.assign(sockets, {
    socketListeners: sockets.listeners
  });
};

/* END EXPORTS */
