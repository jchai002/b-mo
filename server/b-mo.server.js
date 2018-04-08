const bpanel = require('./index');
const constructServiceBroker = require('../express-charge/services/service-broker');
const { EVENTS } = require('./b-mo-constants');
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
  console.log('Starting broker...');
  await broker.start();
  expressApp.use(app);
  expressApp.listen(5000, () => console.log('listening on 5000'));
};

main();

function attachSocketHandlers(bsock, broker) {
  // Payment objects looks like:
  // {
  //    type: 'SEND_PAYMENT'
  //    payer: { chargeAccountId: '#', name },
  //    payee: { chargeAccountId: '#', name },
  //    amount: #,
  // },
  bsock.on('socket', async socket => {
    const hardCodedUser = await broker.call(BROKER_ACTIONS.GET_LATEST_USER);
    const user = await broker.call(BROKER_ACTIONS.GET_USER_ACCOUNT, {
      userAccountId: hardCodedUser.userAccountId
    });
    socket.fire('USER_AUTH', user);

    socket.bind('BMO.SEND_PAYMENT', async (things, xxxxx) => {
      // setInterval(() => socket.fire('USER_AUTH', hardCodedUser), 1000)

      // {
      //   type,
      //   payer: { chargeAccountId: payerChargeAccountId },
      //   payee: { chargeAccountId: payeeChargeAccontId },
      //   amount
      // }
      const payeeBcoinAccount = await broker.call(
        BROKER_ACTIONS.GET_BCOIN_ACCOUNT,
        { accountName: payeeChargeAccontId }
      );

      if (!payeeBcoinAccount) {
        throw new Error('Payee account doesnt exist');
      }

      const { receiveAddress } = payeeBcoinAccount;

      const brokerResponse = await broker.call(
        BROKER_ACTIONS.CREATE_BCOIN_TRANSACTION,
        {
          accountName: payerChargeAccountId,
          amount,
          targetAddress: receiveAddress
        }
      );

      return brokerResponse;
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
  });
}
