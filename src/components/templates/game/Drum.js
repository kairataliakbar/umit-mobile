import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import SlotMachine from '../../organisms/game/SlotMachine'

import Colors from '../../../theme/colors'

const Drum = ({ winner, players }) => {
  return (
    <View style={styles.drumContainer}>
      <SlotMachine
        players={players}
        winner={winner}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  drumContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  drumText: {
    fontSize: 18,
    color: Colors.primary_font
  }
})

Drum.propTypes = {
  winner: PropTypes.shape({
    username: PropTypes.string
  }),
  players: PropTypes.array
}

export default Drum
