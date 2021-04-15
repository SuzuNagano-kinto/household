import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

import Layout from '../../components/LayoutInput'
import Calculator from '../../components/Calculator'


// connectとは、Reduxの「store」にReactがアクセスするための関数
import { connect } from 'react-redux'
import { calcResult } from '../../store/Action'


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
    console.log('🐓 input page')

    return (
      <Layout num={this.state.num}>
        {/* <p>Inputコンポーネント this.state.num = {this.state.num}</p>
        <p className="test">redux store.result = {this.props.result}</p> */}
        <Calculator update={(value) => { this.updateCalcNum(value) }} />

        <div className="c-btn__wrap--center">
          <Link href="/input/bord">
            <a className="c-btn" onClick={() => this.props.calculate(this.state.num)}>
              <span className="c-btn__inr">つぎへ</span>
            </a>
          </Link>
        </div>
      </Layout>
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
    num: state.num,
    result: state.result
  }
}

// mapDispatchToPropsは、dispatchを呼び出す関数をpropsに入れて子コンポーネントに渡す
// 第一引数 = dispatch:ストアが更新されるたび呼び出される関数
// 第二引数 = ownProps:dispatchを通じてstateを書き換えます
function mapDispatchToProps(dispatch) {
  console.log('mapDispatchToProps')
  return {
    calculate: (num) => dispatch(calcResult(num))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input)


// export default Input;