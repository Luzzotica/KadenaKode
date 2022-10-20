import { useState } from "react";

function TxRender(props) {
  var structure
  if (typeof(props.txData) === 'string') {
    structure = (
      <div className="bg-slate-900 rounded-md p-2">
        <span>Error</span>
        <br></br>
        <span className="break-all">{props.txData}</span>
      </div>
    );
  }
  else if ('listenPromise' in props.txData) {
    const [result, setResult] = useState({});

    const updateOnReturn = async () => {
      let res = await props.txData.listenPromise;
      // console.log(res);
      setResult(res);
    }
    updateOnReturn();

    structure = (
      <div className="bg-slate-900 rounded-md p-2">
        <span><b className="text-green-300">TX ID:</b> {props.txData.reqKey}</span>
        <br></br>
        <span className="break-all"><b className="text-green-300">TX Result:</b> {Object.keys(result).length === 0 ? `Listening...` : JSON.stringify(result)}</span>
      </div>
    );
  }
  else {
    structure = (
      <div className="bg-slate-900 rounded-md p-2">
        <span>TX ID: {props.txData.reqKey}</span>
        <br></br>
        <span className="break-all">TX Result: {JSON.stringify(props.txData.result.data)}</span>
      </div>
    )
  }

  return structure;
}

export default TxRender
