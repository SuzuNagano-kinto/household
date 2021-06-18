import { ActionTypes } from './Action'

// Reducer
// Storeから受け取ったActionとstateに応じて、変更されたstateを返す純粋関数
// Actionを元にStateを更新するメソッドのことを言います
// 引数のstateの更新するのではなく、新しいstateのオブジェクトを返します
// 各Actionのtypeごとによって処理内容を変更できます

let date = new Date
let initialState = {
  inputData: {
    result: 0,
    pay: {
      id: 'expense',
      txt: '支出'
    },
    category: {
      id: '',
      txt: '',
      sub: {
        id: '',
        txt: '',
      }
    },
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  },
  category:{}
}

export default function reducer(state = initialState, action) {
  console.log(state)
  switch (action.type) {
  case ActionTypes.CALC:
    state.inputData.result = action.result

    // Reducerでは新規にオブジェクトや配列を返す必要がある
    // https://qiita.com/sakamotoryouta/items/6da7b2e8c7ff6490026e
    return {
      ...state
    }

  case ActionTypes.PAY:
    state.inputData.pay = action.pay
    return {
      ...state
    }

  case ActionTypes.CATEGORY:
    state.inputData.category = action.category
    return {
      ...state
    }

  case ActionTypes.SUBCATEGORY:
    state.inputData.category.sub = action.subcategory
    return {
      ...state
    }

  case ActionTypes.SET:
    state.category = action.data
    return {
      ...state
    }

  case ActionTypes.CAHNGEDAY:
    state.inputData.year = action.date.year
    state.inputData.month = action.date.month
    state.inputData.day = action.date.day
    return {
      ...state
    }

  default:
    return state
  }
}