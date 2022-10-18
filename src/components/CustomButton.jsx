import React, { useState } from 'react'

class CustomButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        className="border-white border-2 rounded-none h-16 px-10 py-2 hover:border-red-400 active:border-red-700 focus:border-red-500 transition duration-150 ease-out"
        onClick={this.props.onClick ? this.props.onClick : () => { }}>
        {this.props.text}
      </button>
    )
  }
}

export default CustomButton
