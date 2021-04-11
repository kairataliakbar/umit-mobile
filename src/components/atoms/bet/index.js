/* eslint-disable no-undef */
import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { FontAwesome5 } from '@expo/vector-icons'

import Colors from '../../../theme/colors'

const Bet = ({ onPress, bet, customStyle }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.bet, ...customStyle }}
      onPress={onPress}
    >
      <Text style={styles.label}>{bet}</Text>
      <FontAwesome5 name="tenge" size={24} color={Colors.primary_font} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  bet: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary_bg,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.primary_bg
  },
  label: {
    fontSize: 24,
    fontWeight: '500',
    color: Colors.primary_font,
    marginRight: 5
  }
})

Bet.propTypes = {
  onPress: PropTypes.func.isRequired,
  bet: PropTypes.number,
  customStyle: PropTypes.object
}

export default Bet
