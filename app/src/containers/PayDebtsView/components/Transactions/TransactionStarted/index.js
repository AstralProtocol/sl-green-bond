import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as uiActionCreators from 'core/actions/actions-ui'
import { StandardModal } from 'components/Modals'
import {
  Tooltip,
  Card,
  Box,
  Icon,
  Text,
  Flex,
  Link,
  Heading,
  Button,
  Loader
} from 'rimble-ui'
import { styles } from './styles.scss'

class TransactionStarted extends Component {
  close = () => {
    const { actions } = this.props
    actions.ui.closeModal({ modalKey: 'pay-debt-transaction-started' })
  }

  render() {
    const { ui } = this.props

    return (
      <div className={styles}>
        <StandardModal
          modalKey="pay-debt-transaction-started"
          modalState={ui.modalState}
          cssModule={styles}
          onClose={this.close}
        >
          <div>
            <Card borderRadius={1} p={0}>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                borderBottom={1}
                borderColor="near-white"
                p={[3, 4]}
                pb={3}
              >
                <Loader aria-label="Processing" size="24px" />
                <Heading textAlign="center" as="h1" fontSize={[2, 3]} px={[3, 0]}>
                  Your transaction is being processed...
                </Heading>
                <Link onClick={this.close}>
                  <Icon
                    name="Close"
                    color="moon-gray"
                    aria-label="Close and cancel connection"
                  />
                </Link>
              </Flex>
              <Box p={[3, 4]}>
                <Flex justifyContent="space-between" flexDirection="column">
                  <Text textAlign="center">
                    Your transaction should be successfully completed shortly.
                  </Text>
                  <Flex
                    alignItems="stretch"
                    flexDirection="column"
                    borderRadius={2}
                    borderColor="moon-gray"
                    borderWidth={1}
                    borderStyle="solid"
                    overflow="hidden"
                    my={[3, 4]}
                  >
                    <Box bg="success" width={1 / 2} px={3} py={2} />
                    <Flex
                      bg="primary"
                      p={3}
                      borderBottom="1px solid gray"
                      borderColor="moon-gray"
                      alignItems="center"
                      justifyContent="space-between"
                      flexDirection={['column', 'row']}
                    >
                      <Box height="2em" width="2em" mr={[0, 3]} mb={3}>
                        <Flex
                          bg="near-white"
                          borderRadius="50%"
                          height="3em"
                          width="3em"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Text>50%</Text>
                        </Flex>
                      </Box>

                      <Box>
                        <Text
                          textAlign={['center', 'left']}
                          color="near-white"
                          ml={[0, 3]}
                          my={[1, 0]}
                          fontSize={3}
                          lineHeight="1.25em"
                        >
                          Sending...
                        </Text>
                      </Box>

                      <Box>
                        <Flex flexDirection="row" alignItems="center">
                          <Link
                            color="near-white"
                            ml={[0, 3]}
                            fontSize={1}
                            lineHeight="1.25em"
                            href="https://etherscan.io"
                          >
                            Details
                            <Icon
                              ml={1}
                              color="near-white"
                              name="Launch"
                              size="14px"
                            />
                          </Link>
                        </Flex>
                      </Box>
                    </Flex>

                    <Flex
                      justifyContent="space-between"
                      bg="light-gray"
                      p={[2, 3]}
                      borderBottom="1px solid gray"
                      borderColor="moon-gray"
                      flexDirection={['column', 'row']}
                    >
                      <Text
                        textAlign={['center', 'left']}
                        color="near-black"
                        fontWeight="bold"
                      >
                        Your account
                      </Text>
                      <Link
                        href="https://rinkeby.etherscan.io/address/"
                        target="_blank"
                      >
                        <Tooltip message="0xAc03BB73b6a9e108530AFf4Df5077c2B3D481e5A">
                          <Flex
                            justifyContent={['center', 'auto']}
                            alignItems="center"
                            flexDirection="row-reverse"
                          >
                            <Text fontWeight="bold">0xAc03...1e5A</Text>
                            <Flex
                              mr={2}
                              p={1}
                              borderRadius="50%"
                              bg="primary-extra-light"
                              height="2em"
                              width="2em"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Icon color="primary" name="RemoveRedEye" size="1em" />
                            </Flex>
                          </Flex>
                        </Tooltip>
                      </Link>
                    </Flex>

                    <Flex
                      justifyContent="space-between"
                      bg="near-white"
                      py={[2, 3]}
                      px={3}
                      alignItems="center"
                      borderBottom="1px solid gray"
                      borderColor="moon-gray"
                      flexDirection={['column', 'row']}
                    >
                      <Text
                        textAlign={['center', 'left']}
                        color="near-black"
                        fontWeight="bold"
                      >
                        Debt Owed
                      </Text>
                      <Flex
                        alignItems={['baseline', 'flex-end']}
                        flexDirection={['row', 'column']}
                      >
                        <Text
                          mr={[2, 0]}
                          color="near-black"
                          fontWeight="bold"
                          lineHeight="1em"
                        >
                          5.4 ETH
                        </Text>
                        <Text color="mid-gray" fontSize={1}>
                          $1450 USD
                        </Text>
                      </Flex>
                    </Flex>

                    <Flex
                      justifyContent="space-between"
                      bg="light-gray"
                      py={[2, 3]}
                      px={3}
                      alignItems="center"
                      borderBottom="1px solid gray"
                      borderColor="moon-gray"
                      flexDirection={['column', 'row']}
                    >
                      <Flex alignItems="center">
                        <Text
                          textAlign={['center', 'left']}
                          color="near-black"
                          fontWeight="bold"
                        >
                          Transaction fee
                        </Text>
                        <Tooltip
                          message="Pays the Ethereum network to process your transaction. Spent even if the transaction fails."
                          position="top"
                        >
                          <Icon
                            ml={1}
                            name="InfoOutline"
                            size="14px"
                            color="primary"
                          />
                        </Tooltip>
                      </Flex>

                      <Flex
                        alignItems={['baseline', 'flex-end']}
                        flexDirection={['row', 'column']}
                      >
                        <Text
                          mr={[2, 0]}
                          color="near-black"
                          fontWeight="bold"
                          lineHeight="1em"
                        >
                          $0.42
                        </Text>
                        <Text color="mid-gray" fontSize={1}>
                          0.00112 ETH
                        </Text>
                      </Flex>
                    </Flex>

                    <Flex
                      justifyContent="space-between"
                      bg="near-white"
                      p={[2, 3]}
                      alignItems="center"
                      flexDirection={['column', 'row']}
                    >
                      <Text color="near-black" fontWeight="bold">
                        Estimated time
                      </Text>
                      <Text color="mid-gray">Less than 2 minutes remaining</Text>
                    </Flex>
                  </Flex>
                  <Button.Outline onClick={this.close}>Close</Button.Outline>
                </Flex>
              </Box>
            </Card>
          </div>
        </StandardModal>
      </div>
    )
  }
}

TransactionStarted.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionStarted)
