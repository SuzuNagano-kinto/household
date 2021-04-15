import React from 'react'

class Layout extends React.Component {
  constructor(props) {
    super(props);
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


export default Layout;