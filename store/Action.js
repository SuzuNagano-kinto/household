// Action
// アクション（何が起きたのか）とそれに付随する情報を持つオブジェクト。
// ActionをStoreへdispatch（送信）すると、Storeのstateが変更される。
// stateの変更は必ずActionを経由して行う。
export const ActionTypes = {
  CALC: 'CALC',
  PAY: 'PAY',
  CATEGORY: 'CATEGORY',
  SUBCATEGORY: 'SUBCATEGORY',
  SET: 'SET',
  CAHNGEDAY: 'CAHNGEDAY',
}

// 金額入力時に呼び出し
export const calcResult = (result) => (dispatch) => {
  console.log('calcResult',result)
  return dispatch({
    type: ActionTypes.CALC,
    result: Number(result)
  })
}

// 支出・収入・立替の変更時に呼び出し
export const changePayType = (result) => (dispatch) => {
  console.log('changePayType',result)
  return dispatch({
    type: ActionTypes.PAY,
    pay: result
  })
}

// カテゴリーの変更時に呼び出し
export const changeCategory = (result) => (dispatch) => {
  console.log('changeCategory',result)
  return dispatch({
    type: ActionTypes.CATEGORY,
    category: result
  })
}

// カテゴリーの変更時に呼び出し
export const changeSubCategory = (result) => (dispatch) => {
  console.log('changeSubCategory',result)
  return dispatch({
    type: ActionTypes.SUBCATEGORY,
    subcategory: result
  })
}

// 全カテゴリー
export const setAllCategory = (result) => (dispatch) => {
  console.log('setAllCategory',result)
  return dispatch({
    type: ActionTypes.SET,
    data: result
  })
}

// 日付入力で変更時
export const changeDay = (obj) => (dispatch) => {
  console.log('changeDay',obj)
  return dispatch({
    type: ActionTypes.CAHNGEDAY,
    date: obj
  })
}