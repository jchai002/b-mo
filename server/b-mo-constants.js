'use strict';
const EVENTS = disallowUndefinedProperties('EVENTS', {
  SEND_PAYMENT: 'SEND_PAYMENT',
  PAYMENT_RECEIVED: 'PAYMENT_RECEIVED',
  PAYMENT_CONFIRMED: 'PAYMENT_CONFIRMED'
});

module.exports.EVENTS = EVENTS;

function disallowUndefinedProperties(namepsace, obj) {
  const handler = {
    get(target, property) {
      if (property in target) {
        return target[property].toString();
      }

      throw new Error(
        `${namepsace.toString()} prop: [${property.toString()}] is not defined. I just saved you one headache.`
      );
    }
  };

  return new Proxy(obj, handler);
}
