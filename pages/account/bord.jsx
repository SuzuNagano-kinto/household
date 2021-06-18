import React from "react"
import Link from "next/link"
import Router from 'next/router'
import PropTypes from "prop-types"
// connectとは、Reduxの「store」にReactがアクセスするための関数
import { connect } from "react-redux"

import Heading from "components/Heading"
import Navi from "components/Navi"
import CalcInput from "components/CalcInput"
import Modal from "components/Modal"
import CalendarItem from 'components/CalendarItem'
import getFirestore from "tool/getFirestore"
// CSS
import styles from "styles/page/input_bord.module.scss"

class bord extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pay: this.props.payTxt,
      modal: false,
    }
    this.fs = new getFirestore()
  }
  toggleModal() {
    // 子コンポーネントの実体を取得し、メソッドを呼び出す。
    this.modalRef.current.toggleModal()
  }

  sendData() {
    console.log(`記録する！`)
    const sendData = async()=>{
      this.fs.init()
      let data = this.props.inputData
      const db = this.fs.getData()
      const logRef = db.collection("user").doc("log").collection('history')
      logRef.add(data)
    }
    sendData().then(()=>{
      Router.push("/account/done")
    })

  }

  render() {
    console.log("🐓bord page")
    this.modalRef = React.createRef()
    return (
      <div className="input_bord">
        <Heading txt="家計簿" sub="- 詳細" icon="account" />
        <CalcInput style="bord" />
        <ul>
          <li className={styles.row}>
            <p className={styles.row_cate}>
              {this.props.payTxt && <span>{this.props.payTxt}</span>}
              {this.props.categoryTxt && <span>{this.props.categoryTxt}</span>}
              {this.props.subCtegoryTxt && <span>{this.props.subCtegoryTxt}</span>}
            </p>
            <Link href="/account/category">
              <a className="c-btn--small">
                <span className="c-btn__inr">変更</span>
              </a>
            </Link>
          </li>

          <li className={styles.row}>
            <p>
              {this.props.year}
              <span>/</span>
              {this.props.month}
              <span>/</span>
              {this.props.day}
            </p>
            <button
              className="c-btn--small"
              onClick={() => this.toggleModal()}
            >
              <span className="c-btn__inr">変更</span>
            </button>
          </li>

          <li className={`${styles.row_col}`}>
            <p>メモ</p>
            <textarea name="" id="" cols="30" rows="5"></textarea>
          </li>
        </ul>

        <div className="c-btn__wrap">
          <Link href="/account/">
            <a className="c-btn">もどる</a>
          </Link>
          <button
            className="c-btn"
            onClick={() => { this.sendData() }}>記録する</button>
        </div>

        <Navi page="account"/>

        <Modal
          target="calender"
          ref={this.modalRef}>
          <CalendarItem />
          <div className={styles.footer}>
            <ul className="c-btn__wrap">
              <li>
                <button
                  className="c-btn--small"
                  onClick={() => { this.toggleModal() }}>決定</button>
              </li>
            </ul>
          </div>
        </Modal>
      </div>
    )
  }
}

bord.propTypes = {
  result: PropTypes.number,
  calculate: PropTypes.func,
  payTxt: PropTypes.string,
  categoryTxt: PropTypes.string,
  subCtegoryTxt: PropTypes.string,
  inputData: PropTypes.object,
  year: PropTypes.number,
  month: PropTypes.number,
  day: PropTypes.number,
}

// mapStateToPropsはstateの中から、対象のコンポーネントに合ったプロパティを生成する為のもの
function mapStateToProps(state) {
  return {
    inputData: state.inputData,
    result: state.inputData.result,
    payTxt: state.inputData.pay.txt,
    categoryTxt: state.inputData.category.txt,
    subCtegoryTxt: state.inputData.category.sub ? state.inputData.category.sub.txt : "",
    year: state.inputData.year,
    month: state.inputData.month,
    day: state.inputData.day,
  }
}

export default connect(mapStateToProps)(bord)