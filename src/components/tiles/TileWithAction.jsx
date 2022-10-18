import CustomButton from '../CustomButton'

function TileWithAction(props) {

  return (
    <div className={`flex-auto grow min-w-min object-fit flex flex-col justify-start space-y-4 p-4 ${props.className}`}>
      <span className="text-5xl font-medium text-left">
        {props.title}
      </span>
      <div className="grow flex flex-col border-white border-2 p-2">
        {props.children}
      </div>
      <CustomButton
        text={props.actionName}
        onClick={props.action}
      />
    </div>
  )
}

export default TileWithAction
