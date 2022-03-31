import React from 'react'
import Heading from "components/Heading"
import Navi from "components/Navi"

class Analize extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('🐓 analize page')

    return (
      <div>
        <Heading
          txt="家計簿"
          sub="- 分析"
          icon="account" />
        <p>分析</p>
        <Navi page="account" />
      </div>
    )
  }
}

export default Analize