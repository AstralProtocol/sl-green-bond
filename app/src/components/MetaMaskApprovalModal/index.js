import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import * as accountActionCreators from 'core/actions/actions-account'
import * as contractActionCreators from 'core/actions/actions-contract'
import * as transactionActionCreators from 'core/actions/actions-transaction'
import {
  Heading,
  Text,
  Icon,
  Modal,
  Flex,
  Box,
  MetaMaskButton
} from 'rimble-ui'
import { requestAccountAccess } from 'core/libs/lib-metamask-helper'
import ModalCard from '../ModalCard'

class MetaMaskApprovalModal extends React.Component {
  requestMetaMaskApproval = () => {
    const { actions, history, route } = this.props

    requestAccountAccess((defaultAccount) => {
      actions.account.setDefaultAccount(defaultAccount)
      actions.contract.setContract(defaultAccount)
      history.push(`/${route}`)
    }, actions.transaction.setStatus)
  }

  renderModalContent = () => {
    return (
      <React.Fragment>
        {/* Start primary content */}
        <Box mt={4} mb={5}>
          <Heading fontSize={[4, 5]}>Before you connect</Heading>
          <Text fontSize={[2, 3]} my={3}>
            Connecting lets you create Smart Green Bonds via your
            Ethereum account.
          </Text>
        </Box>

        <Flex
          flexDirection={['column', 'row']}
          justifyContent="space-between"
          my={[0, 4]}
        >
          <Box flex="1 1" width={1} mt={[3, 0]} mb={[4, 0]} mr={4}>
            <Flex justifyContent="center" mb={3}>
              <Icon
                name="Public"
                color="primary"
                size="4rem"
              />
            </Flex>
            <Heading fontSize={2}>The blockchain is public</Heading>
            <Text fontSize={1}>
              Your Ethereum account activity is public on the
              blockchain. Choose an account you don’t mind being
              linked with your activity here.
            </Text>
          </Box>
          <Box flex="1 1" width={1} mt={[3, 0]} mb={[4, 0]} mr={4}>
            <Flex justifyContent="center" mb={3}>
              <Icon
                name="AccountBalanceWallet"
                color="primary"
                size="4rem"
              />
            </Flex>
            <Heading fontSize={2}>Have some Ether for fees</Heading>
            <Text fontSize={1} mb={3}>
              You’ll need Ether to pay transaction fees. Buy Ether
              from exchanges like Coinbase.
            </Text>
          </Box>
          <Box flex="1 1" width={1} mt={[3, 0]} mb={[4, 0]}>
            <Flex justifyContent="center" mb={3}>
              <Icon
                name="People"
                color="primary"
                size="4rem"
              />
            </Flex>
            <Heading fontSize={2}>Have the right account ready</Heading>
            <Text fontSize={1}>
              If you have multiple Ethereum accounts, check that the
              one you want to use is active in your browser.
            </Text>
          </Box>
        </Flex>
        {/* End Modal Content */}
      </React.Fragment>
    )
  }

  renderConnectButton = () => {
    return (
      <MetaMaskButton
        onClick={this.requestMetaMaskApproval}
        width={[1, 1 / 2]}
        mb={[5, 0]}
      >
        Connect with MetaMask
      </MetaMaskButton>
    )
  }

  render() {
    const { isOpen, closeModal } = this.props

    return (
      <Modal isOpen={isOpen}>
        <ModalCard closeFunc={closeModal}>
          <React.Fragment>
            <ModalCard.Body>
              {this.renderModalContent()}
            </ModalCard.Body>
            <ModalCard.Footer>
              {this.renderConnectButton()}
            </ModalCard.Footer>
          </React.Fragment>
        </ModalCard>
      </Modal>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      account: bindActionCreators(accountActionCreators, dispatch),
      contract: bindActionCreators(contractActionCreators, dispatch),
      transaction: bindActionCreators(transactionActionCreators, dispatch)
    }
  }
}

MetaMaskApprovalModal.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  route: PropTypes.string
}

MetaMaskApprovalModal.defaultProps = {
  route: null
}

export default withRouter(connect(null, mapDispatchToProps)(MetaMaskApprovalModal))
