/* eslint-disable no-undef */
import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const betImages = {
  100: require('../../../assets/bets/100.png'),
  200: require('../../../assets/bets/200.png'),
  300: require('../../../assets/bets/300.png'),
  400: require('../../../assets/bets/400.png'),
  500: require('../../../assets/bets/500.png'),
  1000: require('../../../assets/bets/1000.png'),
  2000: require('../../../assets/bets/2000.png'),
  5000: require('../../../assets/bets/5000.png')
}

const Bet = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image style={styles.image} source={betImages[children]} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 75,
    height: 38
  }
})

Bet.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.number
}

export default Bet
