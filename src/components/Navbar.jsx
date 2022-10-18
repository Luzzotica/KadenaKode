import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { disconnectWallet } from '../connect-wallet/store/kadenaSlice';
import { showModal } from '../connect-wallet/store/modalSlice';
import reduceToken from '../connect-wallet/utils/reduceToken';
import CustomButton from './CustomButton'

function Navbar() {
  const account = useSelector(state => state.kadenaInfo.account);
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(showModal());
  }

  const disconnect = () => {
    dispatch(disconnectWallet());
  }

  return (
    <nav className="w-full flex flex-row justify-between place-items-center p-4 h-40">
      <div className="relative">
        <span className="text-7xl font-medium">
          $DOC
        </span>
        <div className="absolute -bottom-6 -right-14 -rotate-12">
          <span className="text-6xl font-cursive text-red-500">
            Admin
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-between place-items-center space-y-2">
        <CustomButton
          text={account === '' ? "Connect Wallet" : "Disconnect"}
          onClick={account === '' ? openModal : disconnect} />
        {account !== '' && <span>{reduceToken(account)}</span>}
      </div>
    </nav>
  )
}

export default Navbar
