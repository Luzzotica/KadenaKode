import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton";
import { connectXWallet, connectZelcore } from "../store/kadenaSlice";
import { hideModal } from "../store/modalSlice";

function ConnectWalletModal() {
  const shouldShow = useSelector(state => state.connectWalletModal.showing);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(hideModal());
  }

  const connectXWalletClicked = () => {
    dispatch(connectXWallet());
  }

  const connectZelcoreClicked = () => {
    dispatch(connectZelcore());
  }

  if (!shouldShow) {
    return null;
  }
  return (
    <div className="bg-blend-darken bg-black bg-opacity-50 transition duration-150 ease-in-out fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto flex flex-col justify-center place-items-center">
      {/* <div className="w-full flex flex-row justify-center pointer-events-none"> */}
      <div className="border-white border-4 py-4 px-8 shadow-lg min-w-max max-w-xl flex flex-col space-y-4 bg-slate-800">
        <div className="flex flex-row justify-between space-x-10">
          <span className="text-3xl">Connect Wallet</span>
          <button
            className="text-3xl"
            onClick={closeModal}
          >X</button>
        </div>
        <CustomButton
          text="X WALLET"
          onClick={connectXWalletClicked}
        />
        <CustomButton
          text="ZELCORE (COMING SOON)"
          onClick={connectZelcoreClicked}
        />
      </div>
      {/* </div> */}
    </div>
  );
}

export default ConnectWalletModal;