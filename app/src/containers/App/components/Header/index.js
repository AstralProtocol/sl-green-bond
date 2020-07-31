import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as accountActionCreators from 'core/actions/actions-account'
import { withRouter, Link } from 'react-router-dom'

import AppBar from 'components/AppBar'
import Typography from 'components/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { requestAccountAccess } from 'core/libs/lib-metamask-helper'
import {
  MetaMaskButton,
  EthAddress
} from 'rimble-ui'
import { appConfig } from 'configs/config-main'
import { styles } from './styles.scss'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      anchorEl: null
    }
  }

  getMenu() {
    const { account } = this.props
    const { anchorEl } = this.state

    if (account.ethAccount) {
      return (
        <div>
          <div className="dropdown">
            <IconButton
              aria-haspopup="true"
              color="inherit"
              className="dropdown"
              aria-owns={anchorEl ? 'simple-menu' : null}
              onClick={this.handleClick}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.close}
            >
              <MenuItem data-link="account" onClick={this.goTo}>Menu Option 1</MenuItem>
              <MenuItem data-link="settings" onClick={this.goTo}>Menu Option 2</MenuItem>
            </Menu>
          </div>
          <EthAddress id="eth-address" address={account.ethAccount} />
        </div>
      )
    }
    return (
      <div>
        <MetaMaskButton.Outline
          size="small"
          id="metamask-signin"
          onClick={this.requestMetaMaskApproval}
        >
          Connect with MetaMask
        </MetaMaskButton.Outline>
      </div>
    )
  }

  requestMetaMaskApproval = () => {
    const { actions, history } = this.props

    requestAccountAccess((defaultAccount) => {
      actions.account.setDefaultAccount(defaultAccount)
      history.push('/')
    })
  }

  goTo = (evt) => {
    const { history } = this.props
    const { link } = evt.currentTarget.dataset

    history.push(link)
    this.close()
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  close = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const menu = this.getMenu()

    return (
      <div className={styles}>
        <AppBar>
          <Toolbar>
            <Typography variant="title" color="inherit">
              <Link id="app-name" to="/">{appConfig.name}</Link>
            </Typography>
            {menu}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.string.isRequired
  }).isRequired
}

function mapStateToProps(state) {
  return {
    account: state.account
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      account: bindActionCreators(accountActionCreators, dispatch)
    }
  }
}

Header.propTypes = {
  account: PropTypes.shape({
    ethAccount: PropTypes.string
  }).isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
