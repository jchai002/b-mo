const bpanel = require('./index');
const constructServiceBroker = require('../express-charge/services/service-broker');
const {
  EVENTS
} = require('../express-charge/services/events-and-services-and-actions');
const expressApp = require('express')();
const {
  BROKER_ACTIONS
} = require('../express-charge/services/events-and-services-and-actions');

const main = async () => {
  const {
    app,
    ready,
    logger,
    nodeClient,
    walletClient,
    bsock
  } = await bpanel();
  console.log('Waiting for bpanel...');
  await ready;
  console.log('Starting broker...');
  const broker = await constructServiceBroker({ bcoinWallet: walletClient });
  console.log('Attaching socket handlers...');
  attachSocketHandlers(bsock, broker);
  // const service = await createService(broker, socket);
  await broker.start();
  expressApp.use(app);
  expressApp.listen(5000, () => console.log('listening on 5000'));
};

main();

async function attachSocketHandlers(bsock, broker) {
  return new Promise((res, rej) => {
    bsock.on('socket', async socket => {
      const hardCodedUser = await broker.call(BROKER_ACTIONS.GET_LATEST_USER);

      const defaultHardCodedUser = await broker.call(
        BROKER_ACTIONS.GET_USER_ACCOUNT,
        {
          userAccountId: hardCodedUser.userAccountId
        }
      );

      // For demo purposes
      socket.fire('USER_AUTH', defaultHardCodedUser);

      socket.bind('BMO.SEND_PAYMENT', async (things, payload) => {
        const { payer, payee, amount } = payload;

        const { bcoinReceiveAddress } = payee.chargeAccount;

        return await broker.call(BROKER_ACTIONS.CREATE_BCOIN_TRANSACTION, {
          amount,
          payee,
          payer,
          accountName: payee.chargeAccount.chargeAccountId,
          targetAddress: bcoinReceiveAddress
        });
      });

      socket.bind(
        EVENTS.PAYMENT_RECEIVED,
        async ({ type, payer, payee, amount }) => {
          const { chargeAccountId: payerChargeAccontId } = payer;
          const { chargeAccountId: payeeChargeAccontId } = payee;

          const payeeBitCoinAddress = await broker.call(
            BROKER_ACTIONS.GET_BCOIN_ACCOUNT,
            { accoutName: payeeChargeAccontId }
          );
        }
      );
      socket.bind(
        EVENTS.PAYMENT_CONFIRMED,
        async ({ type, payer, payee, amount }) => {
          const { chargeAccountId: payerChargeAccontId } = payer;
          const { chargeAccountId: payeeChargeAccontId } = payee;
          // const brokerResponse = await broker.call(BROKER_ACTIONS.)
        }
      );
      res(createService(socket, broker));
    });
  });
}

async function createService(socket, broker) {
  broker.createService({
    name: 'JXN_SERVICE',
    events: {
      [EVENTS.CHARGE_ACCOUNT_TRANSACTION_CREATED]: async function(event) {
        console.log('FIRINGINGINGINIGNG', event);
        return socket.fire('NEW_TRANSACTION', event);
      }
    }
  });
}
