import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const Card = ({ propStyles, children }) => {
  return (
    <View style={{ ...styles.card, ...propStyles }}>{children}</View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 30,
    backgroundColor: '#4e6276',
    borderRadius: 4
  }
})

Card.propTypes = {
  children: PropTypes.element,
  propStyles: PropTypes.object
}

export default Card
