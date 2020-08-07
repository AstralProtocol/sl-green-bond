import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaMaskApprovalModal from './components/MetaMaskApprovalModal'

class HomeView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openModal: false
    }
  }

  closeMetaMaskModal = () => {
    this.setState({ openModal: false })
  }

  displayMetaMaskModal = (e) => {
    const { account } = this.props
    if (account.ethAccount !== '') { return }
    this.setState({ openModal: true })
    e.preventDefault()
  }

  render() {
    const { openModal } = this.state
    return (
      <div className="container">
        <Link to="/mint" onClick={this.displayMetaMaskModal}>Mint Bonds</Link>
        <br />
        <br />
        <Link to="/pay-debts">Pay Debts</Link>

        <MetaMaskApprovalModal
          isOpen={openModal}
          closeModal={this.closeMetaMaskModal}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    account: state.account
  }
}

HomeView.propTypes = {
  account: PropTypes.shape({
    ethAccount: PropTypes.string
  }).isRequired
}

export default connect(mapStateToProps)(HomeView)
