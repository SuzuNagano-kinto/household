import React from "react"
import Link from "next/link"
import PropTypes from "prop-types"
// connectとは、Reduxの「store」にReactがアクセスするための関数
import { connect } from "react-redux"

import Heading from "components/Heading"
import CalcInput from "components/CalcInput"
import styles from "styles/page/input_bord.module.scss"

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
        <Heading txt="家計簿" sub="- 詳細" icon="account" />
        <CalcInput style="bord" />
        <ul>
          <li className={styles.row}>
            <p className={styles.row_cate}>
              <span>{this.props.payTxt}</span>
              <span>{this.props.categoryTxt}</span>
            </p>
            <Link href="/account/category">
              <a className="c-btn--small">
                <span className="c-btn__inr">変更</span>
              </a>
            </Link>
          </li>

          <li className={styles.row}>
            <p>2021/4</p>
            <Link href="/account/bord">
              <a className="c-btn--small">
                <span className="c-btn__inr">変更</span>
              </a>
            </Link>
          </li>

          <li className={`${styles.row_col}`}>
            <p>メモ</p>
            <textarea name="" id="" cols="30" rows="5"></textarea>
          </li>
        </ul>

        <div className="c-btn__wrap--center">
          <Link href="/account/">
            <a className="c-btn">もどる</a>
          </Link>
          <Link href="/account/">
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
  payTxt: PropTypes.string,
  categoryTxt: PropTypes.string,
}

// mapStateToPropsはstateの中から、対象のコンポーネントに合ったプロパティを生成する為のもの
function mapStateToProps(state) {
  return {
    result: state.data.result,
    payTxt: state.data.pay.txt,
    categoryTxt: state.data.category.txt
  }
}

export default connect(mapStateToProps)(bord)