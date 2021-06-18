import React from 'react'
import Heading from "components/Heading"
import Navi from "components/Navi"
function done() {
  return (
    <div>
      <Heading
        txt="家計簿"
        sub="- 完了"
        icon="account"/>
      <p>記録が完了しました</p>
      <Navi page="account"/>
    </div>
  )
}

export default done