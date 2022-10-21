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
import { useSelector } from 'react-redux';

export default function App() {
  const account = useSelector(state => state.kadenaInfo.account);

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
          <Transactions/>
          <div className='h-40'/>
        </FlexColumn>
      </div>
    </div>
  )
}
