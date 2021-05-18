import { ActionTypes } from './Action'

// Reducer
// Storeから受け取ったActionとstateに応じて、変更されたstateを返す純粋関数
// Actionを元にStateを更新するメソッドのことを言います
// 引数のstateの更新するのではなく、新しいstateのオブジェクトを返します
// 各Actionのtypeごとによって処理内容を変更できます

let initialState = {
  data: {
    num: 0,
    result: 0,
    pay: {
      id: 'expense',
      txt: '支出'
    }
  }
}

export default function reducer(state = initialState, action) {
  console.log(state)
  switch (action.type) {
  case ActionTypes.CALC:
    state.data.num = action.num
    state.data.result = action.result

    // Reducerでは新規にオブジェクトや配列を返す必要がある
    // https://qiita.com/sakamotoryouta/items/6da7b2e8c7ff6490026e
    return {
      ...state
    }

  case ActionTypes.PAY:
    state.data.pay = action.pay
    return {
      ...state
    }

  default:
    return state
  }
}