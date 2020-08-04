import constants from 'core/types'

const initialState = {
  ethAccount: ''
}

export function accountReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SET_ACCOUNT:
      return Object.assign({}, state, {
        ethAccount: action.ethAccount
      })

    default:
      return state
  }
}
