import CustomButton from "./CustomButton";
import FlexColumn from "./FlexColumn";
import FlexRow from "./FlexRow";

function BondingPoolCreate(props) {

  const create = props.create;

  return (
    <form>
      <FlexColumn className="space-y-2 ">
      <div className="grid grid-rows-2 grid-flow-col gap-2 border-white border-2 p-2">
        <FlexColumn className="justify-start place-items-start items-stretch text-left">
          <label className="">Pool Name:</label>
          <input className="form-input flex-1 border-white border-2 bg-black min-w-0" 
              type="text"
              name="poolName"
              step="1"/>
        </FlexColumn>
        <FlexColumn className="justify-start place-items-start items-stretch text-left">
          <label className="">Token ID:</label>
          <input className="h-7 form-input flex-1 border-white border-2 bg-black min-w-0" 
              type="text"
              name="poolName"
              step="1"/>
        </FlexColumn>
        <FlexColumn className="justify-start place-items-start items-stretch text-left">
          <label className="">Payout Coin:</label>
          <input className="h-7 form-input flex-1 border-white border-2 bg-black min-w-0" 
              type="text"
              name="poolName"
              step="1"/>
        </FlexColumn>
        <FlexColumn className="justify-start place-items-start items-stretch text-left">
          <label className="">Token Value:</label>
          <input className="h-7 form-input flex-1 border-white border-2 bg-black min-w-0" 
              type="text"
              name="poolName"
              step="1"/>
        </FlexColumn>
        <FlexColumn className="justify-start place-items-start items-stretch text-left">
          <label className="">Mature Time:</label>
          <input className="h-7 form-input flex-1 border-white border-2 bg-black min-w-0" 
              type="text"
              name="poolName"
              step="1"/>
        </FlexColumn>
      </div>
        <CustomButton text="Create"/>
      </FlexColumn>
      
        
        
    </form>
    
  )
}

export default BondingPoolCreate
