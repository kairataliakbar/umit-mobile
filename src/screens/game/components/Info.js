import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import Colors from '../../../theme/colors'

const Info = ({ bet, countPlayers }) => {
  return (
    <View style={styles.info}>
      <View style={styles.row}>
        <Text style={styles.text}>Ставка:</Text>
        <Text style={styles.text}>{bet} тг.</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Количество играков:</Text>
        <Text style={styles.text}>{countPlayers}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  info: {
    width: '80%'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5
  },
  text: {
    fontSize: 18,
    color: Colors.white
  }
})

Info.propTypes = {
  bet: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  countPlayers: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired
}

export default Info
