import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import pactLanguageSpec from "../../../constants/pactLanguageSpec";
import FlexRow from "../../layout/FlexRow";
import HotkeyButton from "../../hotkey_button/HotkeyButton";
import LocalTxRender from "../../local_tx/LocalTxRender";
import Tile from "../Tile";
import { setCode } from "../../../store/metaSlice";
import { signAndSend } from "../../../kda-wallet/store/kadenaSlice";
import FlexColumn from "../../layout/FlexColumn";
import { updateLocal } from "../../local_tx/localTxSlice";

function CodeBlock(props) {
  const dispatch = useDispatch();
  const code = useSelector(state => state.metaInfo.code);
  const envData = useSelector(state => state.metaInfo.envData);
  const chainIds = useSelector(state => state.metaInfo.chainId);
  const caps = useSelector(state => state.metaInfo.caps);
  const gasLimit = useSelector(state => state.metaInfo.gasLimit);
  const gasPrice = useSelector(state => state.metaInfo.gasPrice);

  // Setup the pact editor and language
  const pactEditorDidMount = (editor, monaco) => {
    monaco.languages.register({
        id: 'pact'
    });
    
    monaco.languages.setMonarchTokensProvider('pact', pactLanguageSpec);
  }

  const pactEditorChanged = (value, event) => {
    dispatch(setCode(value));
  }

  const runCommand = () => {
    let capsList = Object.values(caps);
    // console.log(capsList);
    for (var chainId of chainIds) {
      dispatch(signAndSend(chainId, code, envData, capsList, gasLimit, gasPrice));
    }
  }

  const updateLocalSign = async () => {
    updateLocal(true);
  }

  return (
    <Tile
      title="Code:"
      className="h-auto text-left gap-2"
    > 
      <div className='rounded-lg overflow-hidden'>
        <Editor
          height="250px"
          defaultLanguage="pact"
          defaultValue=""
          theme='vs-dark'
          onMount={pactEditorDidMount}
          onChange={pactEditorChanged}
        />
      </div>
      <FlexColumn className='gap-2'>
        <LocalTxRender className='flex-1'/>
        <FlexRow className='gap-2'>
          <HotkeyButton
            className='flex-auto'
            text="Sign Local"
            hotkeys={['Control', 't']}
            onClick={updateLocalSign}/>
          <HotkeyButton 
            className='flex-auto'
            text="Send"
            hotkeys={['Control', 'r']}
            onClick={runCommand}/>
        </FlexRow>
      </FlexColumn>
    </Tile>
  )
}

export default CodeBlock;