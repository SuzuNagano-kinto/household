import React from "react"
import Link from "next/link"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import Heading from "components/Heading"
import CalcInput from "components/CalcInput"
import PayCategory from "components/PayCategory"
// import CategoryList from "components/CategoryList"
// import styles from "styles/page/input_category.module.scss"

class CategorySub extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      data: {}
    }
  }

  // DOM にレンダーされた後に実行
  componentDidMount() {
    console.log("🐓 componentDidMount")
  }

  render() {
    console.log("🐓 category sub page")
    return (
      <div className="input_category">
        <Heading txt="家計簿" sub="- カテゴリ" icon="account" />
        <PayCategory />
        <CalcInput style="bord" />
        <p>サブカテゴリー</p>
        <div className="c-btn__wrap--center">
          <Link href="/account/bord">
            <a className="c-btn">決定</a>
          </Link>
        </div>
      </div >
    )
  }
}

CategorySub.propTypes = {
  result: PropTypes.number,
  calculate: PropTypes.func
}

// mapStateToPropsはでっかいstateの中から、対象のコンポーネントに合ったプロパティを生成する為のもの
function mapStateToProps(state) {
  return {
    num: state.num,
    result: state.result
  }
}

export default connect(mapStateToProps)(CategorySub)