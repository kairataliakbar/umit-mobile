import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import SlotMachine from './SlotMachine'

const Drum = ({ winner, players, onFinish }) => {
  return (
    <View style={styles.container}>
      <View style={styles.slotMachineWrapper}>
        <SlotMachine
          players={players}
          winner={winner}
          onFinish={onFinish}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  slotMachineWrapper: {
    width: '70%'
  }
})

Drum.propTypes = {
  winner: PropTypes.shape({
    username: PropTypes.string
  }),
  players: PropTypes.array,
  onFinish: PropTypes.func
}

export default Drum
