import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import { setEnvData } from "../../store/metaSlice";
import Tile from "./Tile";

function EnvData(props) {
  const dispatch = useDispatch();
  const envData = useSelector(state => state.metaInfo.envData);

  const envDataEditorChanged = (value, event) => {
    try {
      dispatch(setEnvData(JSON.parse(value)));
    }
    catch (e) {
      // console.log(e);
    }
  }

  return (
    <Tile 
      className="text-left gap-2"
      title="Env Data:">
      <div className='rounded-lg overflow-hidden'>
        <Editor
          height="100px"
          defaultLanguage="json"
          defaultValue={JSON.stringify(envData)}
          theme='vs-dark'
          onChange={envDataEditorChanged}
        />
      </div>
    </Tile>
  )
}

export default EnvData;