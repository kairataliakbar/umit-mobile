import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import Colors from '../../../theme/colors'

const Info = ({ bet, countPlayers }) => {
  return (
    <View style={styles.info}>
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>Ставка:</Text>
        <Text style={styles.infoText}>{bet} тг.</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>Количество играков:</Text>
        <Text style={styles.infoText}>{countPlayers}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  info: {
    width: '80%'
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5
  },
  infoText: {
    fontSize: 18,
    color: Colors.third_font
  }
})

Info.propTypes = {
  bet: PropTypes.string,
  countPlayers: PropTypes.string
}

export default Info
