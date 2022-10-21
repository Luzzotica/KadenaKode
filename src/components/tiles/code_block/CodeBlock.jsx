import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import pactLanguageSpec from "../../../constants/pactLanguageSpec";
import FlexRow from "../../layout/FlexRow";
import RunCodeButton from "./RunCodeButton";
import LocalTxRender from "./LocalTxRender";
import Tile from "../Tile";
import { setCode } from "../../../store/metaSlice";
import { signAndSend } from "../../../kda-wallet/store/kadenaSlice";

function CodeBlock(props) {
  const dispatch = useDispatch();
  const code = useSelector(state => state.metaInfo.code);
  const envData = useSelector(state => state.metaInfo.envData);
  const chainId = useSelector(state => state.metaInfo.chainId);
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
    console.log(capsList);
    dispatch(signAndSend(chainId, code, envData, capsList, gasLimit, gasPrice));
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
      <FlexRow className='gap-2'>
        <LocalTxRender className='flex-1'/>
        <RunCodeButton onClick={runCommand}/>
      </FlexRow>
    </Tile>
  )
}

export default CodeBlock;