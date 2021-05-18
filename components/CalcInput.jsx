import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import styles from '../styles/components/calcInput.module.scss'


// 入力欄
InputNum.propTypes = {
  num: PropTypes.string,
  style: PropTypes.string
}
function InputNum(props) {
  return (
    <div className={`${styles.wrap} ${props.style}`}>
      <p className={styles.box}>
        <span className={styles.unit}>¥</span>
        <span className={styles.input_num} >{props.result}</span>
      </p>
    </div>
  )
}

InputNum.propTypes = {
  result: PropTypes.number,
}

// mapStateToPropsはstateの中から、対象のコンポーネントに合ったプロパティを生成する為のもの
function mapStateToProps(state) {
  return {
    result: state.data.result,
  }
}

export default connect(mapStateToProps)(InputNum)