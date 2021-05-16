import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const SlotMachine = (props) => {
  const { players } = props

  return (
    <View style={styles.slotContainer}>
      {players.map((player) => (
        <View key={player.id} style={styles.slot}>
          <Text style={styles.slotLabel}>{player.username}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  slotContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    width: '60%',
    height: 180,
    position: 'relative'
  },
  slot: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  slotLabel: {
    fontSize: 20
  }
})

SlotMachine.propTypes = {
  players: PropTypes.arrayOf({

  })
}

export default SlotMachine
