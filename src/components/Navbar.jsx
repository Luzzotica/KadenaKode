import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { disconnectProvider } from '../kda-wallet/store/kadenaSlice';
import { showModal } from '../kda-wallet/store/modalSlice';
import reduceToken from '../kda-wallet/utils/reduceToken';
import CustomButton from './CustomButton'

function Navbar() {
  const account = useSelector(state => state.kadenaInfo.account);
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(showModal());
  }

  const disconnect = () => {
    dispatch(disconnectProvider());
  }

  return (
    <nav className="w-full flex flex-row justify-between place-items-center p-4 h-40">
      <div className="relative">
        <span className="text-7xl font-medium">
          KadenaKode
        </span>
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
