import { ActionTypes } from './Action'

// Reducer
// Storeから受け取ったActionとstateに応じて、変更されたstateを返す純粋関数
// Actionを元にStateを更新するメソッドのことを言います
// 引数のstateの更新するのではなく、新しいstateのオブジェクトを返します
// 各Actionのtypeごとによって処理内容を変更できます

const initialState = {
  num: 0,
  result: 0
}

export default function reducer(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case ActionTypes.CALC: {
      return { num: state.num + 1, result: action.result }
    }
    default:
      return state;
  }
}