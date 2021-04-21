import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import Colors from '../../../theme/colors'

const Info = ({ bet }) => {
  return (
    <View style={styles.info}>
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>Ставка:</Text>
        <Text style={styles.infoText}>{bet} тг.</Text>
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
    justifyContent: 'space-around'
  },
  infoText: {
    fontSize: 18,
    color: Colors.third_font
  }
})

Info.propTypes = {
  bet: PropTypes.string
}

export default Info
