import { combineReducers } from 'redux'
import { contractReducer } from 'core/reducers/reducer-contract'
import { providerReducer } from 'core/reducers/reducer-provider'
import { accountReducer } from 'core/reducers/reducer-account'
import { transactionReducer } from 'core/reducers/reducer-transaction'
import uiReducer from 'core/reducers/reducer-ui'

const rootReducer = combineReducers({
  account: accountReducer,
  contract: contractReducer,
  provider: providerReducer,
  transaction: transactionReducer,
  ui: uiReducer
})

export default rootReducer
