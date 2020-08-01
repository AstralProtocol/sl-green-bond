import constants from 'core/types'

const initialState = {
  smartGreenBondContract: null,
  transaction: null
}

export function contractReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SET_CONTRACT:
      return Object.assign({}, state, {
        smartGreenBondContract: action.smartGreenBondContract
      })

    case constants.MINT_BOND_TRANSACTION_SUBMITTED:
      return Object.assign({}, state, {
        transaction: action.transaction
      })

    default:
      return state
  }
}
