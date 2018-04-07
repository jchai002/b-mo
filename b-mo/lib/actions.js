import { ChainEntry } from 'bcoin';

export const updateChain = entry => (dispatch, getState) => {
  const blockMeta = ChainEntry.fromRaw(entry);
  const { height, hash } = blockMeta;
  const chainState = getState().chain;
  const blocks = chainState.getIn(['recentBlocks'])
    ? chainState.getIn(['recentBlocks'])
    : []; // `getIn` is a seamless-immutable method
  const newBlocks = [...blocks]; // get mutable version of blocks
  newBlocks.push(hash);
  const updatedChain = {
    height,
    tip: hash,
    recentBlocks: newBlocks
  };

  return dispatch({
    type: 'SET_CHAIN_INFO',
    payload: updatedChain
  });
};

export function watchChain() {
  return {
    type: 'EMIT_SOCKET',
    bsock: {
      type: 'broadcast',
      message: 'watch chain'
    }
  };
}

export function subscribeBlockConnect() {
  return {
    type: 'EMIT_SOCKET',
    bsock: {
      type: 'subscribe',
      message: 'block connect',
      responseEvent: 'new block'
    }
  };
}
