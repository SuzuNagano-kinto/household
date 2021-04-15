/*
* 記録する系のLAYOUT
*/

import React from 'react'

class LayoutInput extends React.Component {
  constructor(props) {
    super(props);
  }

  updateCalcNum(value) {
    this.setState({ num: value });
  }

  render() {
    console.log('🐓 Layout Input')
    return (
      <div className="input">
        {this.props.children}
      </div>
    )
  }
}

export default LayoutInput;
