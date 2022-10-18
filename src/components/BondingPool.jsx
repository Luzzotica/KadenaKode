import CustomButton from "./CustomButton";
import FlexColumn from "./FlexColumn";

function BondingPool(props) {

  return (
    <FlexColumn className="space-y-2 ">
      <div className="grid grid-rows-2 grid-flow-col gap-2 border-white border-2 p-2">
        <span>Pool Name: doc-bond</span>
        <span>Token ID: swag-token</span>
        <span>Payout Coin: doc</span>
        <span>Payout Bank: u:abcxyz</span>
        <span>Bond Burn Address: u:abcxyz</span>
        <span>Bond Value: 100000</span>
        <span>Mature Time: 2023-08-01</span>
        <span>Status: ACTIVE</span>
      </div>
      <CustomButton text="Set Inactive"/>
    </FlexColumn>
  )
}

export default BondingPool
