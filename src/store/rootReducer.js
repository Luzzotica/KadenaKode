import { combineReducers } from "redux";
import modalSlice from "../kda-wallet/store/modalSlice";
import kadenaSlice from "../kda-wallet/store/kadenaSlice";
import metaSlice from "./metaSlice";

const rootReducer = combineReducers({
  kadenaInfo: kadenaSlice,
  connectWalletModal: modalSlice,
  metaInfo: metaSlice,
});

export default rootReducer;