import './App.css';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConnectWalletModal from './connect-wallet/components/ConnectWalletModal';
import FlexColumn from './components/FlexColumn';
import FlexRow from './components/FlexRow';
import Tile from './components/tiles/Tile';
import BondingPool from './components/BondingPool';
import BondingPoolCreate from './components/BondingPoolCreate';

export default function App() {

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
        <ConnectWalletModal />
        <Navbar />
        <FlexColumn>
          <Tile title="Network Info">
            <span>Network: {import.meta.env.VITE_NETWORK}</span>
            <span>Network ID: {import.meta.env.VITE_NETWORK_ID}</span>
            <span>Chain ID: {import.meta.env.VITE_CHAIN_ID}</span>
          </Tile>
          <Tile title="Bonding">
            <span className='pb-4'>Bonding Contract: {import.meta.env.VITE_CONTRACT_BONDING}</span>
            <FlexColumn className="space-y-4">
              <BondingPool/>
              <BondingPool/>
              <BondingPoolCreate/>
            </FlexColumn>
            
          </Tile>
          <Tile title="Staking">
            <span>Staking Contract: {import.meta.env.VITE_CONTRACT_STAKING}</span>
          </Tile>
        </FlexColumn>
      </div>
    </div>
  )
}
