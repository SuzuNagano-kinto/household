import React from "react"
import Link from "next/link"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { setAllCategory } from 'store/Action'
// import firebase from "firebase/app"
import "firebase/firestore"

import Heading from "components/Heading"
import CalcInput from "components/CalcInput"
import PayCategory from "components/PayCategory"
import CategoryList from "components/CategoryList"
import getFirestore from "tool/getFirestore"
import styles from "styles/page/input_category.module.scss"
class Category extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      data: {},
      fs: new getFirestore()
    }

    this.state.fs.init()
    this.setData()
  }

  render() {
    return (
      <div className={styles.wrap}>
        <Heading txt="家計簿" sub="- カテゴリ" icon="account" />
        <PayCategory />
        <CalcInput style="bord" />
        <CategoryList data={this.state.data} />
        <div className="c-btn__wrap--center">
          <Link href="/account/bord">
            <a className="c-btn">決定</a>
          </Link>
        </div>
      </div >
    )
  }

  setData() {
    const db = this.state.fs.getData()
    const usersCollectionRef = db.collection("user")
    const cateRef = usersCollectionRef.doc("category")

    let _this = this
    cateRef.get().then((doc) => {
      _this.setState({ data: doc.data() })
      // storeに送信する
      _this.props.setAllCategory(doc.data())
    })

    console.log(this.state.data)
  }
}

Category.propTypes = {
  result: PropTypes.number,
  calculate: PropTypes.func
}

// mapStateToPropsはでっかいstateの中から、対象のコンポーネントに合ったプロパティを生成する為のもの
function mapStateToProps(state) {
  return {
    num: state.inputData.num,
    result: state.inputData.result
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAllCategory: (obj) => dispatch(setAllCategory(obj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)