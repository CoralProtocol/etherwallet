import unit from 'ethjs-unit';
import utils from 'web3-utils';
import EthCalls from '../web3Calls';
import { WEB3_WALLET } from '../../bip44/walletTypes';
import EventNames from '../events';
import { toPayload } from './jsonrpc';
import * as locStore from 'store';
import { getSanitizedTx } from './utils';

const setEvents = (promiObj, tx, dispatch) => {
  promiObj
    .once('transactionHash', hash => {
      dispatch('addNotification', [tx.from, hash, 'Transaction Hash']);
    })
    .on('receipt', res => {
      dispatch('addNotification', [tx.from, res, 'Transaction Receipt']);
    })
    .on('error', err => {
      dispatch('addNotification', [tx.from, err, 'Transaction Error']);
    });
};
export default async (
  { payload, store, requestManager, eventHub },
  res,
  next
) => {
  if (payload.method !== 'eth_sendTransaction') return next();
  const tx = payload.params[0];
  const localTx = Object.assign({}, payload);
  delete localTx['gas'];
  delete localTx['nonce'];
  const ethCalls = new EthCalls(requestManager);
  tx.nonce = !tx.nonce
    ? await store.state.web3.eth.getTransactionCount(
        store.state.wallet.getAddressString()
      )
    : tx.nonce;
  tx.gas = !tx.gas ? await ethCalls.estimateGas(localTx) : tx.gas;
  tx.chainId = !tx.chainId ? store.state.network.type.chainID : tx.chainId;
  tx.gasPrice = !tx.gasPrice
    ? unit.toWei(store.state.gasPrice, 'gwei').toString()
    : tx.gasPrice;
  getSanitizedTx(tx)
    .then(_tx => {
      if (store.state.wallet.identifier === WEB3_WALLET) {
        eventHub.$emit(EventNames.SHOW_WEB3_CONFIRM_MODAL, _tx, _response => {
          const _promiObj = ethCalls.sendSignedTransaction(
            _response.rawTransaction
          );
          _promiObj
            .once('transactionHash', hash => {
              const localStoredObj = locStore.get(
                utils.sha3(store.state.wallet.getChecksumAddressString())
              );
              locStore.set(
                utils.sha3(store.state.wallet.getChecksumAddressString()),
                {
                  nonce: localStoredObj + 1,
                  timestamp: localStoredObj.timestamp
                }
              );
              res(null, toPayload(payload.id, hash));
            })
            .on('error', err => {
              res(err);
            });
          setEvents(_promiObj, _tx, store.dispatch);
        });
      } else {
        eventHub.$emit(EventNames.SHOW_TX_CONFIRM_MODAL, _tx, _response => {
          const _promiObj = ethCalls.sendSignedTransaction(
            _response.rawTransaction
          );
          _promiObj
            .once('transactionHash', hash => {
              const localStoredObj = locStore.get(
                utils.sha3(store.state.wallet.getChecksumAddressString())
              ).nonce;
              locStore.set(
                utils.sha3(store.state.wallet.getChecksumAddressString()),
                {
                  nonce: localStoredObj + 1,
                  timestamp: localStoredObj.timestamp
                }
              );
              res(null, toPayload(payload.id, hash));
            })
            .on('error', err => {
              res(err);
            });
          setEvents(_promiObj, _tx, store.dispatch);
        });
      }
    })
    .catch(e => {
      res(e);
    });
};
