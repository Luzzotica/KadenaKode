import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { local } from "../../../kda-wallet/store/kadenaSlice";
import TxRender from "../../tx_and_toasts/TxRender";

function LocalTxRender(props) {
  const dispatch = useDispatch();
  const network = useSelector(state => state.kadenaInfo.network);
  const networkId = useSelector(state => state.kadenaInfo.networkId);
  const code = useSelector(state => state.metaInfo.code);
  const envData = useSelector(state => state.metaInfo.envData);
  const chainId = useSelector(state => state.metaInfo.chainId);
  const caps = useSelector(state => state.metaInfo.caps);
  const gasLimit = useSelector(state => state.metaInfo.gasLimit);
  const gasPrice = useSelector(state => state.metaInfo.gasPrice);

  //// Local Update Timer ////
  var timer
  const [localTx, setLocalTx] = useState({});

  const updateLocal = async () => {
    let capsList = Object.values(caps);
    console.log(capsList);
    let res = await dispatch(local(chainId, code, envData, capsList, gasLimit, gasPrice, true));
    setLocalTx(res);
  }

  // Immediate update when basic values change
  useEffect(() => {
    updateLocal();
  }, [network, networkId, chainId, gasLimit, gasPrice]);

  // Wait for a few seconds after typing to send the local command.
  useEffect(() => {
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(() => { 
      updateLocal();
      clearInterval(timer);
    }, 1500);
    return () => {
      clearInterval(timer);
    }
  }, [code, envData, caps])

  return (
    <TxRender className={props.className} txData={localTx}/>
  )
}

export default LocalTxRender;