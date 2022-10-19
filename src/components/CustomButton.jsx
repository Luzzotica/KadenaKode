function CustomButton(props) {
  return (
    <button
      className={`border-white border-2 rounded-md h-auto px-10 py-2 hover:border-red-400 active:border-red-700 focus:border-red-500 transition duration-150 ease-out ${props.className}`}
      onClick={props.onClick ? props.onClick : () => { }}>
      {props.text}
    </button>
  )
}

export default CustomButton
