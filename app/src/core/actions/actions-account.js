import constants from 'core/types'

export function setDefaultAccount(defaultAccount) {
  return (dispatch, getState) => {
    const { web3Provider } = getState().provider
    web3Provider.eth.defaultAccount = defaultAccount

    dispatch((() => {
      return {
        type: constants.SET_ACCOUNT,
        ethAccount: defaultAccount
      }
    })())
  }
}
