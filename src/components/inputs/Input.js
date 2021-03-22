import React, { useState } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import Colors from '../../theme/colors'

const Input = ({ ...rest }) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <TextInput
      style={[styles.input, isFocused && styles.inputFocused]}
      clearButtonMode="always"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 30,
    backgroundColor: Colors.third_bg,
    color: Colors.third_font,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: Colors.third_font,
    fontSize: 18
  },
  inputFocused: {
    borderColor: Colors.primary_font
  }
})

Input.propTypes = {
  onChange: PropTypes.func
}

export default Input
