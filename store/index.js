import { createStore, applyMiddleware } from 'redux'
// クロームのextentionでReduxを確認するツール
import { composeWithDevTools } from 'redux-devtools-extension'
// reduxのactionに非同期処理の関数を返すことができる
import thunkMiddleware from 'redux-thunk'

import reducer from './Reducer'

// クロームの開発者ツールでReduxをデバックするための設定
// https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd/related?hl=ja
const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}


// Store
// createStore()の第1引数に渡したReducerがActionをdispatchする度に実行される
// Actionをdispatch（送信）する度にreducerが実行され、Actionに応じたstateを返す
export default function configureStore() {
  const store = createStore(
    reducer,
    //store生成時に、applyMiddlewareでredux-thunkを使えるように適用する。
    bindMiddleware([thunkMiddleware]),
  );
  return store
}