/*
* 記録する系のLAYOUT
*/

import React from 'react'
import PropTypes from 'prop-types'
import PayCategory from './PayCategory'

class LayoutInput extends React.Component {
  constructor(props) {
    super(props)
  }

  updateCalcNum(value) {
    this.setState({ num: value })
  }

  render() {
    console.log('🐓 LayoutInput')
    return (
      <div className="input">
        <PayCategory />
        {this.props.children}
      </div>
    )
  }
}

LayoutInput.propTypes = {
  children: PropTypes.node
}

export default LayoutInput
