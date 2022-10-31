import { useDispatch, useSelector } from "react-redux";
import { setChainIds, setGasLimit, setGasPrice } from "../../store/metaSlice";
import { setNetwork, setNetworkId } from "../../kda-wallet/store/kadenaSlice";
import FlexColumn from "../layout/FlexColumn";
import FlexRow from "../layout/FlexRow";

function MetaInput(props) {
  const dispatch = useDispatch();
  const network = useSelector(state => state.kadenaInfo.network);
  const networkId = useSelector(state => state.kadenaInfo.networkId);
  const chainIds = useSelector(state => state.metaInfo.chainIds);
  const gasLimit = useSelector(state => state.metaInfo.gasLimit);
  const gasPrice = useSelector(state => state.metaInfo.gasPrice);

  const onInputChanged = (value) => {
    let id = value.target.id;
    if (id === 'chainIds') {
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
            id="chainIds"
            defaultValue={chainIds.join(', ')}
            className='flex-auto bg-black rounded-md border-white border-2 p-1'
            onChange={onInputChanged}/>
        </FlexColumn>
        <FlexColumn className='flex-1'>
          <span>Network:</span>
          <select 
            id="network" 
            defaultValue={network}
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
            defaultValue={networkId}
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
            defaultValue={String(gasLimit)}
            className='flex-auto bg-black rounded-md border-white border-2 p-1'
            onChange={onInputChanged}/>
        </FlexColumn>
        <FlexColumn className='flex-1'>
          <span>Gas Price:</span>
          <input 
            id="gasPrice"
            // type="number"
            defaultValue={String(gasPrice)}
            className='flex-auto bg-black rounded-md border-white border-2 p-1'
            onChange={onInputChanged}/>
        </FlexColumn>
      </FlexRow>
    </FlexColumn>
  )
}

export default MetaInput;