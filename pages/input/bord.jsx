import React from "react"
import Link from "next/link"
import PropTypes from "prop-types"
// connectとは、Reduxの「store」にReactがアクセスするための関数
import { connect } from "react-redux"

import CalcInput from "../../components/CalcInput"
import styles from "../../styles/page/input_bord.module.scss"

class bord extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pay: this.props.payTxt
    }
  }

  render() {
    console.log("🐓 input bord page")
    return (
      <div className="input_bord">
        <CalcInput style="bord" />
        <ul>
          <li className={styles.row}>
            <p>{this.props.payTxt}</p>
            <Link href="/input/category">
              <a className="c-btn--small">
                <span className="c-btn__inr">変更</span>
              </a>
            </Link>
          </li>

          <li className={styles.row}>
            <p>2021/4</p>
            <Link href="/input/bord">
              <a className="c-btn--small">
                <span className="c-btn__inr">変更</span>
              </a>
            </Link>
          </li>

          <li className={`${styles.row_col}`}>
            <p>メモ</p>
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </li>
        </ul>

        <div className="c-btn__wrap--center">
          <Link href="/input/">
            <a className="c-btn">もどる</a>
          </Link>
          <Link href="/input/">
            <a className="c-btn">記録する</a>
          </Link>
        </div>
      </div>
    )
  }
}

bord.propTypes = {
  result: PropTypes.number,
  calculate: PropTypes.func,
  payTxt: PropTypes.string
}

// mapStateToPropsはstateの中から、対象のコンポーネントに合ったプロパティを生成する為のもの
function mapStateToProps(state) {
  return {
    result: state.data.result,
    payTxt: state.data.pay.txt
  }
}

export default connect(mapStateToProps)(bord)