import Pact from 'pact-lang-api';

export const creationTime = () => String(Math.round(new Date().getTime() / 1000) - 10);

export const buildUrl = (network, networkId, chainId) => {
  return `${network}/chainweb/0.0/${networkId}/chain/${chainId}/pact`;
}

export const createPactCommand = (getState, chainId, pactCode, envData, caps=[], gasLimit, gasPrice) => {
  let kadenaSliceState = getState().kadenaInfo;
  let signer = {
    pubKey: kadenaSliceState.pubKey
  }
  if (caps.length > 0) {
    signer['caps'] = caps;
  }

  return {
    networkId: kadenaSliceState.networkId,
    payload: {
      exec: {
        data: envData,
        code: pactCode,
      }
    },
    signers: [signer],
    meta: {
      chainId: chainId,
      gasLimit: gasLimit,
      gasPrice: gasPrice,
      sender: kadenaSliceState.account,
      ttl: kadenaSliceState.ttl,
      creationTime: creationTime(),
    }
  }
}

export const createSigningCommand = (getState, chainId, pactCode, envData, caps=[], gasLimit=15000, gasPrice=1e-5) => {
  let kadenaSliceState = getState().kadenaInfo;
  return {
    pactCode: pactCode,
    envData: envData,
    sender: kadenaSliceState.account,
    networkId: kadenaSliceState.networkId,
    chainId: chainId,
    gasLimit: gasLimit,
    gasPrice: gasPrice,
    signingPubKey: kadenaSliceState.pubKey,
    ttl: kadenaSliceState.ttl,
    caps: caps,
  }
}

export const sendCommand = async function(getState, chainId, signedCmd) {
  let kadenaInfo = getState().kadenaInfo;
  let networkUrl = buildUrl(kadenaInfo.network, kadenaInfo.networkId, chainId);
  
  return await Pact.wallet.sendSigned(signedCmd, networkUrl);
}

export const localCommand = async function (getState, chainId, pactCode, envData, gasLimit, gasPrice) {
  let kadenaInfo = getState().kadenaInfo;
  let networkUrl = buildUrl(kadenaInfo.network, kadenaInfo.networkId, chainId);
  let cmd = {
    keyPairs: [
      // No key pairs for no sigs
    ],
    pactCode: pactCode,
    envData: envData,
    nonce: creationTime(),
    meta: {
      chainId: chainId,
      gasLimit: gasLimit,
      gasPrice: gasPrice,
      sender: kadenaInfo.account,
      ttl: kadenaInfo.ttl,
      creationTime: creationTime(),
    }
  }
  let res = await Pact.fetch.local(cmd, networkUrl);
  return res;
}

export const listen = async function (getState, chainId, txId) {
  let kadenaInfo = getState().kadenaInfo;
  let networkUrl = buildUrl(kadenaInfo.network, kadenaInfo.networkId, chainId);
  return await Pact.fetch.listen({ listen: txId }, networkUrl);
}

export const mkReq = function (cmd) {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(cmd),
  };
};

export const parseRes = async function (raw) {
  const rawRes = await raw;
  const res = await rawRes;
  if (res.ok) {
    const resJSON = await rawRes.json();
    return resJSON;
  } else {
    const resTEXT = await rawRes.text();
    return resTEXT;
  }
};

export const wait = async (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export const handleError = (error) => {
  console.log(`ERROR: ${JSON.stringify(error)}`);
  return { errorMessage: 'Unhandled Exception' };
};

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
};

Date.prototype.yyyy_mm_dd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');
};
