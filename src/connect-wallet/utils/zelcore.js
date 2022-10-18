import { mkReq, parseRes } from './utils';
import { WALLET } from './wallet';

const fetch = require('node-fetch');

const cmd = {
  asset: 'kadena',
};

const getAccounts = async () => {
  try {
    let res = await fetch(WALLET.ZELCORE.getAccountsUrl, mkReq(cmd));
    let pRes = await parseRes(res);
    return pRes;
  } catch (e) {
    return -1;
  }
};

const openZelcore = () => window.open('zel:', '_self');

export { getAccounts, openZelcore };

export const connectZelcore = async () => {
  const accounts = await fetch("http://127.0.0.1:9467/v1/accounts", {
      headers: {
          "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ asset: "kadena" }),
  });

  const accountsJson = await accounts.json();
  return accountsJson;
};
