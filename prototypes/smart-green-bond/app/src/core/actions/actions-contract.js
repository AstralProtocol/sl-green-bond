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

function dispatchMintBond(dispatch, transaction) {
  dispatch((() => {
    return {
      type: constants.MINT_BOND_TRANSACTION_SUBMITTED,
      transaction
    }
  })())
}

async function mint(SmartGreenBondContract, buyerAddress, bondsAmount) {
  const contract = await SmartGreenBondContract.deployed()
  const result = contract.mintBond(buyerAddress, bondsAmount)

  const transaction = (result !== null) ? result : null
  return transaction
}

export function mintBond(buyerAddress, bondsAmount, callback) {
  return async (dispatch, getState) => {
    const { smartGreenBondContract } = getState().contract
    const transaction = await mint(smartGreenBondContract, buyerAddress, bondsAmount)

    if (transaction) {
      dispatchMintBond(dispatch, transaction)
      if (callback) { callback() }
    }
  }
}
