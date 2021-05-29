import React from 'react'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import PropTypes from 'prop-types'

const Container = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {children}
    </TouchableWithoutFeedback>
  )
}

Container.propTypes = {
  children: PropTypes.element
}

export default Container
