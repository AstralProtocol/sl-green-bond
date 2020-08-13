import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as contractActionCreators from 'core/actions/actions-contract'
import * as uiActionCreators from 'core/actions/actions-ui'
import TransactionSummary from './components/Transactions/TransactionSummary'
import TransactionStarted from './components/Transactions/TransactionStarted'
import TransactionSuccess from './components/Transactions/TransactionSuccess'
import MintBondForm from './components/MintBondForm'

class MintBondsView extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.transaction.txHash !== this.props.transaction.txHash) {
      this.onSuccess()
    }
  }

  onSubmit = async (ethAccount, bondsAmount) => {
    const { actions } = this.props

    actions.ui.openModal({ modalKey: 'transaction-summary' })
    await actions.contract.mintBond(ethAccount, bondsAmount)
    this.onConfirm()
  }

  onConfirm = () => {
    const { actions } = this.props
    actions.ui.closeModal({ modalKey: 'transaction-summary' })
    actions.ui.openModal({ modalKey: 'transaction-started' })
  }

  onSuccess = () => {
    const { actions } = this.props
    actions.ui.closeModal({ modalKey: 'transaction-started' })
    actions.ui.openModal({ modalKey: 'transaction-success' })
  }

  render() {
    return (
      <div className="container">
        <MintBondForm
          onSubmit={this.onSubmit}
        />
        <TransactionSummary />
        <TransactionStarted />
        <TransactionSuccess />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    account: state.account,
    transaction: state.transaction
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      contract: bindActionCreators(contractActionCreators, dispatch),
      ui: bindActionCreators(uiActionCreators, dispatch)
    }
  }
}

MintBondsView.propTypes = {
  transaction: PropTypes.shape({
    txHash: PropTypes.string
  }).isRequired
}


export default connect(mapStateToProps, mapDispatchToProps)(MintBondsView)
