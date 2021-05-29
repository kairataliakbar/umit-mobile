import React from 'react'
import { Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import Color from '../../theme/colors'

const H3 = ({ children, propStyles }) => (
  <Text style={{ ...styles.h3, ...propStyles }}>{children}</Text>
)

const styles = StyleSheet.create({
  h3: {
    fontSize: 28,
    fontWeight: '500',
    color: Color.primary_font
  }
})

H3.propTypes = {
  children: PropTypes.string,
  propStyles: PropTypes.object
}

export default H3
