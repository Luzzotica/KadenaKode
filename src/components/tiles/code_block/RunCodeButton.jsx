import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomButton from "../../layout/CustomButton";

function RunCodeButton(props) {

  const [keysPressed, setKeysPressed] = useState({
    'Control': false,
    'Meta': false,
    'r': false,
  });

  useEffect(() => {
    const keyDownHandler = event => {
      // console.log('pressed', event.key);
      let key = event.key;
      setKeysPressed({
        ...keysPressed,
        [key]: true,
      })
    }
    const keyUpHandler = event => {
      // console.log('unpressed', event.key);
      let key = event.key;
      setKeysPressed({
        ...keysPressed,
        [key]: false,
      })
    }

    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    }
  })

  useEffect(() => {
    // console.log(keysPressed);
    if (keysPressed.Control && keysPressed.r) {
      setKeysPressed({
        ...keysPressed,
        'Control': false,
        'r': false,
      })
      // console.log('running');
      props.onClick();
    }
  }, [keysPressed]);

  return (
    <CustomButton
      text="Send (Control + r)"
      onClick={props.onClick}/>
  )
}

export default RunCodeButton;