import { combineReducers } from "redux";
import modalSlice from "../connect-wallet/store/modalSlice";
import kadenaSlice from "../connect-wallet/store/kadenaSlice.js";

const rootReducer = combineReducers({
  kadenaInfo: kadenaSlice,
  connectWalletModal: modalSlice,
});

export default rootReducer;