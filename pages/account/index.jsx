import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import Heading from "components/Heading"
import Calculator from 'components/Calculator'
import CalcInput from "components/CalcInput"

// connectとは、Reduxの「store」にReactがアクセスするための関数
import { connect } from 'react-redux'
import { calcResult } from 'store/Action'

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 0
    }
  }

  updateCalcNum(value) {
    this.setState({ num: value })
  }

  render() {
    console.log('🐓 account page')

    return (
      <div className="input">
        <Heading
          txt="家計簿"
          sub="- 入力"
          icon="account"/>
        <CalcInput style="input" />
        <Calculator update={(value) => { this.updateCalcNum(value) }} />

        <div className="c-btn__wrap--center">
          <Link href="/account/bord">
            <a
              className="c-btn"
              onClick={() => this.props.calculate(this.props.result)}>
              <span className="c-btn__inr">つぎへ</span>
            </a>
          </Link>
        </div>
      </div>
    )
  }
}
Input.propTypes = {
  result: PropTypes.number,
  calculate: PropTypes.func
}

// mapStateToPropsはstoreが持っているstateをpropsに入れて子コンポーネントに渡す
function mapStateToProps(state) {
  return {
    result: state.data.result
  }
}

// mapDispatchToPropsは、dispatchを呼び出す関数をpropsに入れて子コンポーネントに渡す
// 第一引数 = dispatch:ストアが更新されるたび呼び出される関数
// 第二引数 = ownProps:dispatchを通じてstateを書き換えます
function mapDispatchToProps(dispatch) {
  return {
    calculate: (num) => dispatch(calcResult(num)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input)