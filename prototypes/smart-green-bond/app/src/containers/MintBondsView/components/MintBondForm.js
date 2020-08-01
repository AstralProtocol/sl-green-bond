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

export default function MintBondForm(props) {
  const [formValidated] = useState(false)
  const [validated, setValidated] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [formInputValue, setFormInputValue] = useState('')
  const [selectValue] = useState('')
  const [checkboxValue] = useState(false)
  const [radioValue] = useState('')
  const { ethAccount } = props

  const validateInput = (e) => {
    e.target.parentNode.classList.add('was-validated')
  }

  const handleInput = (e) => {
    setInputValue(e.target.value)
    validateInput(e)
  }

  const handleFormInput = (e) => {
    setFormInputValue(e.target.value)
    validateInput(e)
  }

  const validateForm = () => {
    // Perform advanced validation here
    if (
      inputValue.length > 0 &&
        selectValue.length > 0 &&
        checkboxValue === true &&
        radioValue.length > 0
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
    e.preventDefault()
  }

  return (
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
                  value={ethAccount}
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
                  value={formInputValue}
                  width={1}
                />
              </Field>
            </Box>
          </Flex>
          <Box>
            {/* Use the validated state to update UI */}
            <Button type="submit" disabled={!validated}>
              Mint Bonds
            </Button>
          </Box>
        </Form>
      </Box>
    </Box>
  )
}

MintBondForm.propTypes = {
  ethAccount: PropTypes.string.isRequired
}
