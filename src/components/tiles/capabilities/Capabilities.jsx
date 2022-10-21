import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeCap, writeCap } from "../../../store/metaSlice";
import CustomButton from "../../layout/CustomButton";
import Tile from "../Tile";
import DefCap from "./DefCap";
import Pact from 'pact-lang-api';

function Capabilities(props) {
  const dispatch = useDispatch();
  const [capKey, setCapKey] = useState(0);
  const [capKeys, setCapKeys] = useState([]);

  const addCap = () => {
    dispatch(writeCap({ key: capKey, cap: Pact.lang.mkCap('', '', '', []) }));
    setCapKeys([...capKeys, capKey]);
    setCapKey(capKey + 1);
  }

  const deleteCap = (key) => {
    console.log("removing cap");
    dispatch(removeCap(key));
    setCapKeys(capKeys.filter(function(k) { 
      return k !== key;
    }));
  }

  return (
    <Tile title="Capabilities">
      {capKeys.length > 0 ? capKeys.map(key => <DefCap key={key} keyId={key} onDelete={deleteCap}/>) : <span className="text-center">None</span>}
      <CustomButton
        text="Add Cap"
        onClick={addCap}
      />
    </Tile>
  )
}

export default Capabilities
