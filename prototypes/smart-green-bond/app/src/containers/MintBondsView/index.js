import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as contractActionCreators from 'core/actions/actions-contract'
import MintBondForm from './components/MintBondForm'

class MintBondsView extends Component {
  render() {
    const { actions } = this.props

    return (
      <div className="container">
        <MintBondForm
          contract={actions.contract}
        />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      contract: bindActionCreators(contractActionCreators, dispatch)
    }
  }
}

export default connect(null, mapDispatchToProps)(MintBondsView)
