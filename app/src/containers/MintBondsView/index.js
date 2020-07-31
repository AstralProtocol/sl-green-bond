import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import MintBondForm from './components/MintBondForm'

class MintBondsView extends Component {
  render() {
    const { account } = this.props
    return (
      <div className="container">
        <MintBondForm ethAccount={account.ethAccount} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    account: state.account
  }
}

MintBondsView.propTypes = {
  account: PropTypes.shape({
    ethAccount: PropTypes.string
  }).isRequired
}

export default connect(mapStateToProps)(MintBondsView)
