// Action
// アクション（何が起きたのか）とそれに付随する情報を持つオブジェクト。
// ActionをStoreへdispatch（送信）すると、Storeのstateが変更される。
// stateの変更は必ずActionを経由して行う。
export const ActionTypes = {
  CALC: 'CALC'
};

export const calcResult = (result) => (dispatch) => {
  console.log('calcResult')
  return dispatch({
    type: ActionTypes.CALC,
    result: result
  })
}