import React from 'react'
import Heading from "components/Heading"
import Navi from "components/Navi"

class Setting extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('🐓 setting page')

    return (
      <div>
        <Heading
          txt="設定"
          icon="setting" />
        <p>設定</p>
        <Navi page="setting" />
      </div>
    )
  }
}

export default Setting