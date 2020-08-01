import { TransactionChecker } from 'core/libs/lib-transaction-checker'
import { appConfig } from 'configs/config-main'

export function requestAccountAccess(callback) {
  const { ethereum } = window

  ethereum.enable().then((account) => {
    const { INFURA_PROJECT_ID } = appConfig
    const ethereumAccount = account[0]
    const txChecker = new TransactionChecker(INFURA_PROJECT_ID, ethereumAccount)

    txChecker.subscribe('pendingTransactions')
    txChecker.watchTransactions()

    callback(ethereumAccount)
  })
}
