import React from 'react'
import PropTypes from "prop-types"

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('🐓 layout')
    return (
      <div className="wrap" >
        {this.props.children}
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node
}
export default Layout