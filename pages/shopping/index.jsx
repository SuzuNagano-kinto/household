import React from 'react'
import Heading from "components/Heading"
import Navi from "components/Navi"

class Shopping extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('🐓 analize page')

    return (
      <div>
        <Heading
          txt="買い物リスト"
          icon="shopping" />
        <p>買い物リスト</p>
        <Navi page="shopping" />
      </div>
    )
  }
}

export default Shopping