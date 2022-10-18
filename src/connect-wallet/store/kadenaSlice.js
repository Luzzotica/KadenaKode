import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { hideModal } from './modalSlice';

export const X_WALLET = 'X_WALLET';
export const ZELCORE = 'ZELCORE';

export const kadenaSlice = createSlice({
  name: 'kadenaInfo',
  initialState: {
    network: import.meta.env.VITE_NETWORK, //process.env.NETWORK,
    networkId: import.meta.env.VITE_NETWORK_ID, //process.env.NETWORK_ID,
    chainId: import.meta.env.VITE_CHAIN_ID,
    gasLimit: Number(import.meta.env.VITE_GAS_LIMIT),
    gasPrice: Number(import.meta.env.VITE_GAS_PRICE),
    ttl: 600,
    provider: '',
    account: '',
    pubKey: ''
  },
  reducers: {
    setNetwork: (state, action) => {
      state.network = action.payload;
    },
    setNetworkId: (state, action) => {
      state.networkId = action.payload;
    },
    setChainId: (state, action) => {
      state.chainId = action.payload;
    },
    setGasLimit: (state, action) => {
      state.gasLimit = action.payload;
    },
    setGasPrice: (state, action) => {
      state.gasPrice = action.payload;
    },
    setProvider: (state, action) => {
      state.provider = action.payload;
    },
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    setPubKey: (state, action) => {
      state.pubKey = action.payload;
    },
  },
})

export const connectXWallet = () => {
  return async function connectXWallet(dispatch, getState) {
    let accountResult = await kadena.request({
      method: "kda_connect",
      networkId: getState().kadenaInfo.networkId,
    });

    if (accountResult.status === 'fail') {
      console.log('Failing toast');
      toast.error(`Error: ${accountResult.message}. Make sure you are on ${getState().kadenaInfo.networkId}`);
    }
    else {
      dispatch(kadenaSlice.actions.setProvider(X_WALLET));
      dispatch(kadenaSlice.actions.setAccount(accountResult.account.account));
      dispatch(kadenaSlice.actions.setPubKey(accountResult.account.publicKey));
      dispatch(hideModal());
    }
  }
}

export const disconnectWallet = () => {
  return async function disconnectWallet(dispatch, getState) {
    let networkId = getState().kadenaInfo.networkId;
    let provider = getState().kadenaInfo.provider;

    if (provider === X_WALLET) {
      let accountResult = await kadena.request({
        method: "kda_disconnect",
        networkId: networkId,
      });

      if (accountResult.status === 'fail') {
        console.log('Failing toast');
        toast.error(`Error: ${accountResult.message}\nMake sure you are on: ${networkId}`);
      }
      else {
        dispatch(kadenaSlice.actions.setAccount(""));
        dispatch(kadenaSlice.actions.setAccount(""));
        dispatch(kadenaSlice.actions.setPubKey(""));
      }
    }
    else {
      dispatch(kadenaSlice.actions.setAccount(""));
      dispatch(kadenaSlice.actions.setAccount(""));
      dispatch(kadenaSlice.actions.setPubKey(""));
    }
  }
}

export const connectZelcore = () => {
  return async function connect(dispatch, getState) {
    try {
      const accounts = await fetch("http://127.0.0.1:9467/v1/accounts", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ asset: "kadena" }),
      });

      const accountsJson = await accounts.json();
      console.log(accountsJson);

      dispatch(kadenaSlice.actions.setProvider(ZELCORE));
      dispatch(kadenaSlice.actions.setAccount(accountsJson.data[0]));
      dispatch(kadenaSlice.actions.setPubKey(accountsJson.data[1]));
      dispatch(hideModal());
    }
    catch (e) {
      toast.error('Failed to connect to zelcore.');
    }
  };
}; 

export const { setNetwork, setNetworkId, setWallet, setAccount, setPubKey } = kadenaSlice.actions

export default kadenaSlice.reducer