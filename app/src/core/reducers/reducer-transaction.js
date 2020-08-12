import constants from 'core/types'

const initialState = {
  txHash: '',
  status: ''
}

export function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SET_TX_STATUS:
      return Object.assign({}, state, {
        txHash: action.txHash,
        status: action.status
      })

    default:
      return state
  }
}
