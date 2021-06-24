/* eslint-disable no-undef */
import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { FontAwesome5 } from '@expo/vector-icons'

import Colors from '../../theme/colors'

const Bet = ({ onPress, bet, customStyle, type }) => {
  return (
    <TouchableOpacity
      style={[styles.bet, customStyle, type === 'primary' && styles.betPrimary]}
      onPress={onPress}
    >
      <Text style={[styles.label, type === 'primary' && styles.labelPrimary]}>
        {bet}
      </Text>
      <FontAwesome5
        name="tenge"
        size={24}
        color={type === 'primary' ? Colors.black : Colors.gold}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  bet: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.gold
  },
  label: {
    fontSize: 24,
    fontWeight: '500',
    color: Colors.gold,
    marginRight: 5
  },
  betPrimary: {
    backgroundColor: Colors.gold
  },
  labelPrimary: {
    color: Colors.black
  }
})

Bet.propTypes = {
  onPress: PropTypes.func.isRequired,
  bet: PropTypes.string,
  customStyle: PropTypes.object,
  type: PropTypes.string
}

export default Bet
