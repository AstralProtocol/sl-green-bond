import constants from 'core/types'

export function setStatus(txHash, status) {
  return (dispatch) => {
    dispatch((() => {
      return {
        type: constants.SET_TX_STATUS,
        txHash,
        status
      }
    })())
  }
}
