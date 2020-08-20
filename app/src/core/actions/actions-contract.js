import constants        from 'core/types'
import TruffleContract  from '@truffle/contract'
import { appConfig }    from 'configs/config-main'
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
  return async (dispatch, getState) => {
    const { web3Provider } = getState().provider
    const SmartGreenBondContract = TruffleContract(SmartGreenBond)
    let deployedContract

    SmartGreenBondContract.setProvider(web3Provider.currentProvider)
    SmartGreenBondContract.defaults({ from: defaultAccount })

    if (PRODUCTION) {
      deployedContract = await SmartGreenBondContract.at(appConfig.SMARTGREENBOND_ADDRESS_ROPSTEN)
    } else {
      deployedContract = await SmartGreenBondContract.deployed()
    }

    dispatchSetContract(dispatch, deployedContract)
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
  const result = SmartGreenBondContract.mintBond(buyerAddress, bondsAmount)

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
  const totalDebtOwed = SmartGreenBondContract.getTotalOwed()
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

    if (totalDebtOwed > 0) {
      const transaction = await web3Provider.eth.sendTransaction({
        from: ethAccount,
        to: smartGreenBondContract.address,
        value: web3Provider.utils.toWei(totalDebtOwed.toString(), 'ether')
      })

      dispatchPayTotalDebt(dispatch, transaction)
    }
  }
}
