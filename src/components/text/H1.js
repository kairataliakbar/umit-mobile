import React from 'react'
import { Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import Color from '../../theme/colors'

const H1 = ({ children, propStyles }) => (
  <Text style={{ ...styles.h1, ...propStyles }}>{children}</Text>
)

const styles = StyleSheet.create({
  h1: {
    fontSize: 40,
    fontWeight: '500',
    color: Color.white
  }
})

H1.propTypes = {
  children: PropTypes.string,
  propStyles: PropTypes.object
}

export default H1
