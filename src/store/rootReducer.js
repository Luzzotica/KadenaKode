import { combineReducers } from "redux";
import modalSlice from "../kda-wallet/store/modalSlice";
import kadenaSlice from "../kda-wallet/store/kadenaSlice";

const rootReducer = combineReducers({
  kadenaInfo: kadenaSlice,
  connectWalletModal: modalSlice,
});

export default rootReducer;