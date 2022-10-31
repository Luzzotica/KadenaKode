import './App.css';
import Navbar from './components/misc/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConnectWalletModal from './kda-wallet/components/ConnectWalletModal';
import FlexRow from './components/layout/FlexRow';
import FlexColumn from './components/layout/FlexColumn';
import { txToastManager, messageToastManager, walletConnectedToastManager } from './components/tx_and_toasts/TxToastManager';
import Capabilities from './components/tiles/capabilities/Capabilities';
import EnvData from './components/tiles/EnvData';
import CodeBlock from './components/tiles/code_block/CodeBlock';
import MetaInput from './components/tiles/MetaInput';
import Transactions from './components/tiles/Transactions';
import { useDispatch, useSelector } from 'react-redux';
import KeySensor from './components/hotkey_button/KeySensor';
import { useEffect } from 'react';
import { setNetwork, setNetworkId } from './kda-wallet/store/kadenaSlice';
import { setCapabilities, setChainIds, setCode, setEnvData, setGasLimit, setGasPrice } from './store/metaSlice';
import ShareButton from './components/ShareButton';
import { setUnsafe } from './store/miscSlice';
import Modal from './components/modal/Modal';


export default function App() {
  const dispatch = useDispatch();
  const account = useSelector(state => state.kadenaInfo.account);

  useEffect(() => {
    let urlParams = new URLSearchParams(window.location.search);
    var isUnsafe = false;
    for (const [key, value] of urlParams) {
      isUnsafe = true;
      // console.log(key, typeof value, value);
      if (key === 'network') {
        dispatch(setNetwork(value));
      }
      else if (key === 'networkId') {
        dispatch(setNetworkId(value));
      }
      else if (key === 'chainIds') {
        console.log('ChainIds:', JSON.parse(value));
        dispatch(setChainIds(JSON.parse(value)));
      }
      else if (key === 'gasLimit') {
        dispatch(setGasLimit(Number(value)));
      }
      else if (key === 'gasPrice') {
        dispatch(setGasPrice(Number(value)));
      }
      else if (key === 'caps') {
        dispatch(setCapabilities(JSON.parse(value)));
      }
      else if (key === 'envData') {
        dispatch(setEnvData(JSON.parse(value)));
      }
      else if (key === 'code') {
        dispatch(setCode(value));
      }
    }

    dispatch(setUnsafe(isUnsafe));
  });

  return (
    <div className="w-full flex flex-col items-center bg-slate-600">
      <div className="w-full max-w-5xl h-min min-h-screen flex flex-col text-white text-center">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <KeySensor/>
        <ConnectWalletModal 
          onNewTransaction={txToastManager}
          onNewMessage={messageToastManager}
          onWalletConnected={walletConnectedToastManager}
          buttonStyle="`border-white border-2 rounded-md h-auto px-10 py-2 hover:border-purple-300 active:border-purple-700 focus:border-purple-500 transition duration-150 ease-out"
        />
        <Navbar />
        <FlexColumn className='p-2 gap-4'>
          <MetaInput/>
          <FlexRow className='h-auto text-left text-xl gap-2'>
            <span>Account:</span>
            <span className='break-all'>{account}</span>
          </FlexRow>
          <Capabilities/>
          <EnvData/>
          <CodeBlock/>
          <ShareButton text='Share'/>
          <Transactions/>
          <div className='h-40'/>
        </FlexColumn>
      </div>
    </div>
  )
}
