import { useDispatch } from "react-redux";
import { setChainIds, setGasLimit, setGasPrice } from "../../store/metaSlice";
import { setNetwork, setNetworkId } from "../../kda-wallet/store/kadenaSlice";
import FlexColumn from "../layout/FlexColumn";
import FlexRow from "../layout/FlexRow";

function MetaInput(props) {
  const dispatch = useDispatch();

  const onInputChanged = (value) => {
    let id = value.target.id;
    if (id === 'chainId') {
      var chainIds = value.target.value.split(',')
        .map(e => e.trim())
        .filter(e => e !== '');
      console.log(chainIds);
      dispatch(setChainIds(chainIds));
    }
    else if (id === 'network') {
      dispatch(setNetwork(value.target.value));
    }
    else if (id === 'networkId') {
      dispatch(setNetworkId(value.target.value));
    }
    else if (id === 'gasLimit') {
      dispatch(setGasLimit(Number(value.target.value)));
    }
    else if (id === 'gasPrice') {
      dispatch(setGasPrice(Number(value.target.value)));
    }
  }

  return (
    <FlexColumn className='gap-4'>
      <FlexRow className='h-auto text-left gap-2'>
        <FlexColumn className='flex-1'>
          <span>Chain IDs, (1, 2, 5, 6...):</span>
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
            <option value="mainnet01">mainnet01</option>
          </select>
        </FlexColumn>
      </FlexRow>
      <FlexRow className='h-auto text-left gap-2'>
        <FlexColumn className='flex-1'>
          <span>Gas Limit:</span>
          <input 
            id="gasLimit"
            type="number"
            defaultValue="15000"
            className='flex-auto bg-black rounded-md border-white border-2 p-1'
            onChange={onInputChanged}/>
        </FlexColumn>
        <FlexColumn className='flex-1'>
          <span>Gas Price:</span>
          <input 
            id="gasPrice"
            // type="number"
            defaultValue="1e-5"
            className='flex-auto bg-black rounded-md border-white border-2 p-1'
            onChange={onInputChanged}/>
        </FlexColumn>
      </FlexRow>
    </FlexColumn>
  )
}

export default MetaInput;