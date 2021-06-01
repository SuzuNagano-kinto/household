import React from "react"
import Link from "next/link"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { setAllCategory } from 'store/Action'
import firebase from "firebase/app"
import "firebase/firestore"

import Heading from "components/Heading"
import CalcInput from "components/CalcInput"
import PayCategory from "components/PayCategory"
import CategoryList from "components/CategoryList"
import styles from "styles/page/input_category.module.scss"
class Category extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      data: {}
    }

    this.init()
  }

  // DOM にレンダーされた後に実行
  componentDidMount() {
    console.log("🐓 componentDidMount")
    this.getData()
  }

  render() {
    console.log(this.state)
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

  init() {
    console.log("init")
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
      apiKey: "AIzaSyBFFD4z2aB6Xg3lZSTDzINh6qlnsTVS_4M",
      authDomain: "household-accounts-system.firebaseapp.com",
      projectId: "household-accounts-system",
      storageBucket: "household-accounts-system.appspot.com",
      messagingSenderId: "1012625851416",
      appId: "1:1012625851416:web:4b8827f72d9bcf99322f6d",
      measurementId: "G-0NG8R0KTEY"
    }
    // Initialize Firebase
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig)
    }
  }

  getData() {
    console.log("getData")

    const db = firebase.firestore()
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