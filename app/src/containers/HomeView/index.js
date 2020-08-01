import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaMaskApprovalModal from 'components/MetaMaskApprovalModal'

class HomeView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openModal: false,
      route: null
    }
  }

  closeMetaMaskModal = () => {
    this.setState({ openModal: false })
  }

  displayMetaMaskModal = (e) => {
    const { account } = this.props
    const route = e.currentTarget.href.split('/')
    const routeLength = e.currentTarget.href.split('/').length

    if (account.ethAccount !== '') { return }

    this.setState({
      openModal: true,
      route: route[routeLength - 1]
    })

    e.preventDefault()
  }

  render() {
    const { openModal, route } = this.state
    return (
      <div className="container">
        <Link to="/mint" onClick={this.displayMetaMaskModal}>Mint Bonds</Link>
        <br />
        <br />
        <Link to="/pay-debts" onClick={this.displayMetaMaskModal}>Pay Debts</Link>

        <MetaMaskApprovalModal
          isOpen={openModal}
          route={route}
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
