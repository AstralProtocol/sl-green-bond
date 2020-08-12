import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Form,
  Input,
  Field,
  Button,
  Flex
} from 'rimble-ui'
import { styles } from './styles.scss'

function MintBondForm(props) {
  const [formValidated, setFormValidated] = useState(false)
  const [validated, setValidated] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [numOfBondsInputValue, setNumOfBondsInputValue] = useState(10)

  const validateInput = (e) => {
    e.target.parentNode.classList.add('was-validated')
  }

  const handleInput = (e) => {
    setInputValue(e.target.value)
    validateInput(e)
  }

  const handleFormInput = (e) => {
    setNumOfBondsInputValue(e.target.value)
    validateInput(e)
  }

  const validateForm = () => {
    // Perform advanced validation here
    if (
      inputValue.length > 0
    ) {
      setValidated(true)
    } else {
      setValidated(false)
    }
  }

  useEffect(() => {
    validateForm()
  })

  const handleSubmit = (e) => {
    const { onSubmit } = props
    const ethAccount = e.currentTarget[0].value
    const bondsAmount = e.currentTarget[1].value

    onSubmit(ethAccount, bondsAmount)
    setFormValidated()
    e.preventDefault()
  }

  return (
    <div className={styles}>
      <Box p={4}>
        <Box>
          <Form onSubmit={handleSubmit} validated={formValidated}>
            <Flex mx={-3} flexWrap="wrap">
              <Box width={[1, 1, 1 / 2]} px={3}>
                <Field label="Your Ethereum Address" validated={validated} width={1}>
                  <Input
                    type="text"
                    required // set required attribute to use brower's HTML5 input validation
                    onChange={handleInput}
                    value={inputValue}
                    width={1}
                  />
                </Field>
              </Box>
              <Box width={[1, 1, 1 / 2]} px={3}>
                <Field label="Number Of Bonds" validated={validated} width={1}>
                  <Form.Input
                    type="number"
                    required // set required attribute to use brower's HTML5 input validation
                    onChange={handleFormInput}
                    value={numOfBondsInputValue}
                    width={1}
                  />
                </Field>
              </Box>
            </Flex>
            <Box>
              {/* Use the validated state to update UI */}
              {/* <Button type="submit" disabled={!validated}> */}
              <Button type="submit">
                Mint Bonds
              </Button>
            </Box>
          </Form>
        </Box>
      </Box>
    </div>
  )
}

MintBondForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default MintBondForm
