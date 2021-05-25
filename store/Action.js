// Action
// アクション（何が起きたのか）とそれに付随する情報を持つオブジェクト。
// ActionをStoreへdispatch（送信）すると、Storeのstateが変更される。
// stateの変更は必ずActionを経由して行う。
export const ActionTypes = {
  CALC: 'CALC',
  PAY: 'PAY',
  CATEGORY: 'CATEGORY'
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