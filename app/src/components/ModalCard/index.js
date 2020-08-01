import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Flex,
  Card,
  Button
} from 'rimble-ui'

const ModalCard = ({ children, closeFunc }) => (
  <Card
    border={0}
    mx="auto"
    my="auto"
    p={0}
    height={['100vh', 'auto']}
    width={['auto']}
    maxWidth="960px"
    overflow="hidden"
  >
    <Box
      position="absolute"
      top="0"
      right="0"
      m={3}
      borderRadius="100%"
      bg="white"
    >
      <Button.Text
        icononly
        icon="Close"
        mainColor="moon-gray"
        onClick={closeFunc}
        size="2.5rem"
      />
    </Box>
    <Flex flexDirection="column" height="100%">
      {children}
    </Flex>
  </Card>
)

ModalCard.Body = ({ children }) => (
  <Flex flex="1 1 auto" style={{ overflow: 'auto' }} >
    <Box width={1} p={['4', '5']} m="auto">
      {children}
    </Box>
  </Flex>
)

ModalCard.Footer = ({ children }) => (
  <Flex
    flex="1 0 auto"
    justifyContent="center"
    borderTop={1}
    borderColor="light-gray"
    p={3}
  >
    {children}
  </Flex>
)


ModalCard.BackButton = ({ onClick }) => (
  <Box
    position="absolute"
    top="0"
    left="0"
    m={3}
    bg="white"
  >
    <Button.Outline
      onClick={onClick}
      icononly
      icon="ArrowBack"
      size="2.5rem"
    />
  </Box>
)

ModalCard.propTypes = {
  children: PropTypes.node.isRequired,
  closeFunc: PropTypes.func.isRequired
}

ModalCard.Footer.propTypes = {
  children: PropTypes.node.isRequired
}

ModalCard.Body.propTypes = {
  children: PropTypes.node.isRequired
}

ModalCard.BackButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default ModalCard
