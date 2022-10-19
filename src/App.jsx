import './App.css';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConnectWalletModal from './connect-wallet/components/ConnectWalletModal';
import FlexColumn from './components/FlexColumn';
import FlexRow from './components/FlexRow';
import Tile from './components/tiles/Tile';


import MonacoEditor from '@uiw/react-monacoeditor';
import CustomButton from './components/CustomButton';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNetworkInfo, signAndSend } from './connect-wallet/store/kadenaSlice';
// import CodeMirror from '@uiw/react-codemirror';
// import { StreamLanguage } from '@codemirror/language';
// import { clojure } from '@codemirror/legacy-modes/mode/clojure';
// import { dracula } from '@uiw/codemirror-theme-dracula';
// import CustomButton from './components/CustomButton';


export default function App() {
  const dispatch = useDispatch();

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

  const [code, setCode] = useState('');
  const [envData, setEnvData] = useState('');
  // const [caps, setCaps] = useState('');
  const [chainId, setChainId] = useState('');
  const [network, setNetwork] = useState('');
  const [networkId, setNetworkId] = useState('');
  const [localOrSend, setLocalOrSend] = useState('');

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
    if (id === 'chainId') {
      setChainId(value.nativeEvent.data);
    }
    else if (id === 'network') {
      setNetwork(value.target.value)
    }
    else if (id === 'networkId') {
      setNetworkId(value.target.value)
    }
    else if (id === 'localOrSend') {
      setLocalOrSend(value.target.value)
    }
  }

  useEffect(() => {
    dispatch(setNetworkInfo({
      chainId: chainId,
      networkId: networkId,
      networkRoot: network,
    }));
  }, [chainId, network, networkId]);

  const runCommand = () => {
    dispatch(signAndSend(localOrSend, code, envData));
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
        <ConnectWalletModal />
        <Navbar />
        <FlexColumn className='p-2 space-y-4'>
          <FlexRow className='h-16 text-left space-x-2'>
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
                defaultValue="testnet04" 
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
                <option value="mainnet">mainnet</option>
              </select>
            </FlexColumn>
          </FlexRow>
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
                value='(defun hello:string (input:string) (format "Hello {}!" [input]))'
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
