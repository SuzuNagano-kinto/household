import React from 'react'
import Link from 'next/link';
import firebase from 'firebase/app';
import 'firebase/firestore';

import Layout from '../../components/LayoutInput';
import CategoryList from '../../components/CategoryList';

class category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      data: {}
    };

    this.init()
  }

  // DOM にレンダーされた後に実行
  componentDidMount() {
    console.log('🐓 componentDidMount')
    this.getData()
  }

  render() {
    console.log('🐓 input category page')
    return (
      <Layout>
        <h1>カテゴリ</h1>
        <CategoryList data={this.state.data} />
        <div className="c-btn__wrap--center">
          <Link href="/input/bord">
            <a className="c-btn">もどる</a>
          </Link>
        </div>
      </Layout >
    )
  }

  init() {
    console.log('init')
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
    };
    // Initialize Firebase
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  getData() {
    const db = firebase.firestore();
    const usersCollectionRef = db.collection('user')
    const cateRef = usersCollectionRef.doc('category');

    let self = this
    cateRef.get().then((doc) => {
      self.setState({ data: doc.data() })
    })

    console.log(this.state.data)
  }
}

export default category;