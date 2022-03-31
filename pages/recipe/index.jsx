import React from 'react'
import Heading from "components/Heading"
import Navi from "components/Navi"

class Recipe extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('🐓 recipe page')

    return (
      <div>
        <Heading
          txt="レシピ"
          icon="recipe" />
        <p>レシピ</p>
        <Navi page="recipe" />
      </div>
    )
  }
}

export default Recipe