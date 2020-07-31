import { combineReducers } from 'redux'
import { providerReducer } from 'core/reducers/reducer-provider'
import { accountReducer }  from 'core/reducers/reducer-account'
import uiReducer           from 'core/reducers/reducer-ui'

const rootReducer = combineReducers({
  account: accountReducer,
  provider: providerReducer,
  ui: uiReducer
})

export default rootReducer
