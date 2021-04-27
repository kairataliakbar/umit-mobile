import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Colors from '../../../theme/colors'

const Drum = () => {
  return (
    <View style={styles.drumContainer}>
      <Text style={styles.drumText}>Drum</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  drumContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  drumText: {
    fontSize: 18,
    color: Colors.primary_font
  }
})

export default Drum
