import constants        from 'core/types'
import TruffleContract  from 'truffle-contract'
import SmartGreenBond   from 'contracts/SmartGreenBond.json'

function dispatchSetContract(dispatch, smartGreenBondContract) {
  dispatch((() => {
    return {
      type: constants.SET_CONTRACT,
      smartGreenBondContract
    }
  })())
}

export function setContract(defaultAccount) {
  return (dispatch, getState) => {
    const { web3Provider } = getState().provider
    const SmartGreenBondContract = TruffleContract(SmartGreenBond)

    SmartGreenBondContract.setProvider(web3Provider.currentProvider)
    SmartGreenBondContract.defaults({ from: defaultAccount })

    dispatchSetContract(dispatch, SmartGreenBondContract)
  }
}
