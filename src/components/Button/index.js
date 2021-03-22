import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import Colors from '../../theme/colors'

const Button = ({ label, children, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label || children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 30,
    backgroundColor: Colors.secondary_bg,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: Colors.third_bg,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 18,
    color: Colors.third_font
  }
})

Button.propTypes = {
  label: PropTypes.string,
  children: PropTypes.string,
  onPress: PropTypes.func
}

export default Button
