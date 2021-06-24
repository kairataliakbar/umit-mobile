import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'

import Colors from '../../theme/colors'

const Button = ({ label, children, onPress, load, type = 'default' }) => {
  return type === 'link'
    ? (
      <TouchableOpacity style={styles.link} onPress={onPress}>
        <Text style={[styles.label, styles.linkLabel]}>{label || children}</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        {load
          ? <ActivityIndicator size="small" color={Colors.white} />
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
    backgroundColor: Colors.black,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  link: {
    backgroundColor: 'transparent'
  },
  label: {
    fontSize: 20,
    color: Colors.white
  },
  linkLabel: {
    textDecorationLine: 'underline'
  }
})

Button.propTypes = {
  label: PropTypes.string,
  children: PropTypes.string,
  onPress: PropTypes.func,
  load: PropTypes.bool,
  type: PropTypes.oneOf(['link', 'default'])
}

export default Button
