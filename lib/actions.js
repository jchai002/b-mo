import { ChainEntry } from "bcoin";

export function sendPayment(tx) {
  return dispatch => {
    dispatch({
      type: "EMIT_SOCKET",
      bsock: {
        type: "bmo.broadcast",
        message: "SEND_PAYMENT",
        payload: tx
      }
    });
    return dispatch({
      type: "PAYMENT_SENT"
    });
  };
}

export function selectUser(user) {
  return {
    type: "USER_SELECTED",
    payload: user
  };
}
