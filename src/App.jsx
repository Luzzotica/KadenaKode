import './App.css';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConnectWalletModal from './kda-wallet/components/ConnectWalletModal';
import FlexColumn from './components/FlexColumn';
import FlexRow from './components/FlexRow';
import Tile from './components/tiles/Tile';


import MonacoEditor from '@uiw/react-monacoeditor';
import CustomButton from './components/CustomButton';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { local, setNetwork, setNetworkId, signAndSend } from './kda-wallet/store/kadenaSlice';
import { txToastManager, messageToastManager } from './components/TxToastManager';
import TxRender from './components/TxRender';
// import CodeMirror from '@uiw/react-codemirror';
// import { StreamLanguage } from '@codemirror/language';
// import { clojure } from '@codemirror/legacy-modes/mode/clojure';
// import { dracula } from '@uiw/codemirror-theme-dracula';
// import CustomButton from './components/CustomButton';


export default function App() {
  const dispatch = useDispatch();
  const network = useSelector(state => state.kadenaInfo.network);
  const networkId = useSelector(state => state.kadenaInfo.networkId);
  const transactions = useSelector(state => state.kadenaInfo.transactions);
  const account = useSelector(state => state.kadenaInfo.account);

  // let pactEditorRef = useRef(null);
  // let envDataRef = useRef(null);
  // let capsRef = useRef(null);

  // const pactEditorDidMount = (editor, monaco) => {
  //   pactEditorRef = editor;
  // }
  // const envDataEditorDidMount = (editor, monaco) => {
  //   envDataRef = editor;
  // }
  // const capsEditorDidMount = (editor, monaco) => {
  //   capsRef = editor;
  // }

  const [txRenders, setTxRenders] = useState([]);

  const [code, setCode] = useState('');
  const [envData, setEnvData] = useState('');
  // const [caps, setCaps] = useState('');
  const [chainId, setChainId] = useState('1');
  const [localOrSend, setLocalOrSend] = useState('local');

  const pactEditorChanged = (value, event) => {
    setCode(value);
  }
  const envDataEditorChanged = (value, event) => {
    setEnvData(JSON.parse(value));
  }
  // const capsEditorChanged = (value, event) => {
  //   setCaps(value);
  // }

  const onInputChanged = (value) => {
    let id = value.target.id;
    console.log(id);
    if (id === 'chainId') {
      setChainId(value.nativeEvent.data);
    }
    else if (id === 'network') {
      dispatch(setNetwork(value.target.value));
    }
    else if (id === 'networkId') {
      dispatch(setNetworkId(value.target.value));
    }
    else if (id === 'localOrSend') {
      setLocalOrSend(value.target.value);
    }
  }

  useEffect(() => {
    // console.log('txs updated');
    // console.log(transactions.length);
    let renders = [];
    for (var i = transactions.length - 1; i >= 0; i--) {
      console.log(transactions[i]);
      renders.push(<TxRender key={i} txData={transactions[i]}/>);
    }
    setTxRenders(renders);
  }, [transactions]);

  const runCommand = () => {
    if (localOrSend === 'local') {
      dispatch(local(chainId, code, envData));
    }
    else {
      dispatch(signAndSend(chainId, code, envData));
    }
  }

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
          buttonStyle="`border-white border-2 rounded-md h-auto px-10 py-2 hover:border-purple-300 active:border-purple-700 focus:border-purple-500 transition duration-150 ease-out"
        />
        <Navbar />
        <FlexColumn className='p-2 space-y-4'>
          <FlexRow className='h-auto text-left gap-2'>
            <FlexColumn className='flex-1'>
              <span>Chain ID:</span>
              <input 
                id="chainId"
                defaultValue="1"
                className='flex-auto bg-black rounded-md border-white border-2 p-1'
                onChange={onInputChanged}/>
            </FlexColumn>
            <FlexColumn className='flex-1'>
              <span>Network:</span>
              <select 
                id="network" 
                defaultValue="https://api.testnet.chainweb.com" 
                className='flex-auto bg-black rounded-md border-white border-2 p-1' 
                onChange={onInputChanged}
              >
                <option value="https://api.testnet.chainweb.com">https://api.testnet.chainweb.com</option>
                <option value="https://api.chainweb.com">https://api.chainweb.com</option>
              </select>
            </FlexColumn>
            <FlexColumn className='flex-1'>
              <span>Network ID:</span>
              <select 
                id="networkId" 
                defaultValue="testnet04" 
                className='flex-auto bg-black rounded-md border-white border-2 p-1' 
                onChange={onInputChanged}
              >
                <option value="testnet04">testnet04</option>
                <option value="mainnet">mainnet01</option>
              </select>
            </FlexColumn>
          </FlexRow>
          <FlexRow className='h-auto text-left space-x-2'>
            <span>Account:</span>
            <span>{account}</span>
          </FlexRow>
          <FlexColumn className='text-left space-y-2'>
            <span className='text-2xl'>Env Data:</span>
            <div className='rounded-lg overflow-hidden'>
              <MonacoEditor
                height="100px"
                language="json"
                value=''
                options={{
                  theme: 'vs-dark',
                }}
                onChange={envDataEditorChanged}
                // editorDidMount={envDataEditorDidMount}
              />
            </div>
          </FlexColumn>
          <FlexColumn className='h-auto text-left space-y-2'>
            <span className='text-2xl'>Code:</span>
            <div className='rounded-lg overflow-hidden'>
              {/* <CodeMirror
                // 
                value='(defun hello:string (input:string) (format "Hello {}!" [input]))'

              /> */}
              <MonacoEditor
                id="code"
                height="250px"
                language="clojure"
                value='"Hello"'
                options={{
                  theme: 'vs-dark',
                }}
                onChange={pactEditorChanged}
                // editorDidMount={pactEditorDidMount}
              />
            </div>
            <FlexRow className='space-x-2'>
              <select id="localOrSend" className='flex-auto bg-black rounded-md border-white border-2 p-1' onChange={onInputChanged}>
                <option value="local">Local</option>
                <option value="send">Send</option>
              </select>
              <CustomButton
                text="Run"
                onClick={runCommand}  
              />
            </FlexRow>
          </FlexColumn>
          <FlexColumn className='text-left space-y-2'>
            <span className='text-2xl'>Transactions:</span>
            {txRenders.length === 0 ? <span>None</span> : txRenders}
          <div className='h-40'/>
          </FlexColumn>
          {/* <FlexColumn className='text-left space-y-2'>
            <span className='text-2xl'>Caps</span>
            <div className='rounded-lg overflow-hidden'>
              <MonacoEditor
                height="100px"
                language="json"
                value=''
                options={{
                  theme: 'vs-dark',
                }}
                onChange={capsEditorChanged}
                // editorDidMount={capsEditorDidMount}
              />
            </div>
          </FlexColumn> */}
        </FlexColumn>
      </div>
    </div>
  )
}
