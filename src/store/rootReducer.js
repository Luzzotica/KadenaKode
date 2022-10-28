import { combineReducers } from "redux";
import modalSlice from "../kda-wallet/store/modalSlice";
import kadenaSlice from "../kda-wallet/store/kadenaSlice";
import metaSlice from "./metaSlice";
import localTxSlice from "../components/local_tx/localTxSlice";
import hotkeySlice from "../components/hotkey_button/hotkeySlice";

const rootReducer = combineReducers({
  kadenaInfo: kadenaSlice,
  connectWalletModal: modalSlice,
  metaInfo: metaSlice,
  localTx: localTxSlice,
  keysPressed: hotkeySlice,
});

export default rootReducer;