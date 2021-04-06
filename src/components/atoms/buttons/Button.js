import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'

import Colors from '../../../theme/colors'

const Button = ({ label, children, onPress, load }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {load
        ? <ActivityIndicator size="small" color={Colors.third_font} />
        : <Text style={styles.label}>{label || children}</Text>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    minHeight: 50,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 30,
    backgroundColor: Colors.secondary_bg,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: Colors.third_bg,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 20,
    color: Colors.third_font
  }
})

Button.propTypes = {
  label: PropTypes.string,
  children: PropTypes.string,
  onPress: PropTypes.func,
  load: PropTypes.bool
}

export default Button
