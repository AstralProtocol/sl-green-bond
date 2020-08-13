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
    const transaction = await mint(smartGreenBondContract, buyerAddress, bondsAmount).then(() => {
      if (callback) { callback() }
    })

    if (transaction) {
      dispatchMintBond(dispatch, transaction)
    }
  }
}

function dispatchTotalDebtOwed(dispatch, totalDebtOwed) {
  dispatch((() => {
    return {
      type: constants.TOTAL_DEBT_OWED,
      totalDebtOwed
    }
  })())
}

async function callGetTotalDebtOwed(SmartGreenBondContract) {
  const contract = await SmartGreenBondContract.deployed()
  const totalDebtOwed = contract.getTotalOwed()
  return totalDebtOwed
}

export function getTotalDebtOwed() {
  return async (dispatch, getState) => {
    const { smartGreenBondContract } = getState().contract
    const contractReturnVal = await callGetTotalDebtOwed(smartGreenBondContract)
    const totalDebtOwed = contractReturnVal.words[0]

    dispatchTotalDebtOwed(dispatch, totalDebtOwed)
  }
}

function dispatchPayTotalDebt(dispatch, transaction) {
  dispatch((() => {
    return {
      type: constants.PAY_TOTAL_DEBT,
      transaction
    }
  })())
}

export function payTotalDebt() {
  return async (dispatch, getState) => {
    const { smartGreenBondContract, totalDebtOwed } = getState().contract
    const { ethAccount } = getState().account
    const { web3Provider } = getState().provider
    const contract = await smartGreenBondContract.deployed()

    if (totalDebtOwed > 0) {
      const transaction = await web3Provider.eth.sendTransaction({
        from: ethAccount,
        to: contract.address,
        value: web3Provider.utils.toWei(totalDebtOwed.toString(), 'ether')
      })

      dispatchPayTotalDebt(dispatch, transaction)
    }
  }
}
