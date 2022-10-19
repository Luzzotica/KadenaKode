function TxRender(props) {
  console.log('tx render');
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
  else {
    structure = <div className="bg-slate-900 rounded-md p-2">
      <span>TX ID: {props.txData.reqKey}</span>
      <br></br>
      <span className="break-all">TX Result: {JSON.stringify(props.txData.result.data)}</span>
    </div>
  }

  return structure;
}

export default TxRender
