import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import Colors from '../theme/colors'

const Container = ({ children, customStyle, ...rest }) => {
  return (
    <View style={{ ...styles.container, ...customStyle }} {...rest}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary_bg
  }
})

Container.propTypes = {
  customStyle: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ])
}

export default Container
