import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as contractActionCreators from 'core/actions/actions-contract'
import {
  Box,
  Button,
  Flex
} from 'rimble-ui'
import { styles } from './styles.scss'

class PayDebtsView extends Component {
  componentDidMount() {
    const { actions } = this.props
    actions.contract.getTotalDebtOwed()
  }

  payTotalDebt = () => {
    const { actions } = this.props
    actions.contract.payTotalDebt()
  }

  render() {
    const { contract } = this.props

    return (
      <div className={styles}>
        <div className="container">
          <h2>Pay Outstanding Debts</h2>
          <Box>
            <Flex mx={-3} flexWrap="wrap">
              <Box px={3}>
                <span>Total Debt Owed: {contract.totalDebtOwed}</span>
              </Box>
              <Box px={3}>
                <Button onClick={this.payTotalDebt}>Pay Total Now</Button>
              </Box>
            </Flex>
          </Box>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    contract: state.contract
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      contract: bindActionCreators(contractActionCreators, dispatch)
    }
  }
}

PayDebtsView.propTypes = {
  contract: PropTypes.shape({
    totalDebtOwed: PropTypes.number,
    getTotalDebtOwed: PropTypes.func
  }).isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(PayDebtsView)
