import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import '../styles/style.scss'

// 全ページで必要な挙動を書ける場所
// - ページ移動間の固定レイアウト
// - componentDidCatchを使用したカスタムエラーハンドリング
// - 状態管理ライブラリとの結合
//   Reduxの <Provider>でラップするなど
// 参考：https://qiita.com/tetsutaroendo/items/c7171286137d963cdecf

// Providerってなに？
// ①Reactコンポーネント内でreact-reduxのconnect()関数を使えるようにする
// ②ラップしたコンポーネントにstore情報を渡す
import { Provider } from 'react-redux'
import configureStore from '../store/index'
const store = configureStore()

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <title>家計簿</title>
        </Head>
        <div className="wrap">
          <Component {...pageProps} />
        </div>
      </Provider>
    </>
  )
}
MyApp.propTypes = {
  Component: PropTypes.object,
  pageProps: PropTypes.object
}