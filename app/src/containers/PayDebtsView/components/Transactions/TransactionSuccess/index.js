import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as uiActionCreators from 'core/actions/actions-ui'
import { StandardModal } from 'components/Modals'
import {
  Card,
  Box,
  Icon,
  Text,
  Flex,
  Link,
  Heading,
  Button
} from 'rimble-ui'
import { styles } from './styles.scss'

class TransactionSuccess extends Component {
  close = () => {
    const { actions } = this.props
    actions.ui.closeModal({ modalKey: 'pay-debt-transaction-success' })
  }

  render() {
    const { ui } = this.props

    return (
      <div className={styles}>
        <StandardModal
          modalKey="pay-debt-transaction-success"
          modalState={ui.modalState}
          cssModule={styles}
          onClose={this.close}
        >
          <div>
            <Card p={0} borderRadius={1}>
              <Box height="4px" bg="success" borderRadius={['1rem 1rem 0 0']} />
              <Flex
                justifyContent="space-between"
                alignItems="center"
                borderBottom={1}
                borderColor="near-white"
                p={[3, 4]}
                pb={3}
              >
                <Icon name="CheckCircle" color="success" aria-label="Success" />
                <Heading textAlign="center" as="h1" fontSize={[2, 3]} px={[3, 0]}>
                  You&apos;ve successfully paid all debts!
                </Heading>
                <Link onClick={this.close}>
                  <Icon
                    name="Close"
                    color="moon-gray"
                    aria-label="Close and cancel connection"
                  />
                </Link>
              </Flex>
              <Box p={[3, 4]} pb={2}>
                <Text textAlign="center" mt={2}>
                  All debts have been paid to all current bond holders.
                </Text>
              </Box>
              <Flex justifyContent="center" flexDirection="column">
                <Heading textAlign="center" as="h4">
                  Transactions Id - #11242323
                </Heading>
                <Link textAlign="center">Show transaction details</Link>
              </Flex>

              <Flex
                pt={[4, 4]}
                pb={[4, 4]}
                p={[3, 4]}
                borderTop={1}
                borderColor="near-white"
                justifyContent="flex-end"
                flexDirection={['column', 'row']}
                alignItems="center"
              >
                <Button onClick={this.close} width={['100%', 'auto']}>Done</Button>
              </Flex>
            </Card>
          </div>
        </StandardModal>
      </div>
    )
  }
}

TransactionSuccess.propTypes = {
  actions: PropTypes.shape({}).isRequired,
  ui: PropTypes.shape({
    modalState: PropTypes.shape({})
  }).isRequired
}

function mapStateToProps(state) {
  return {
    ui: state.ui
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActionCreators, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionSuccess)
