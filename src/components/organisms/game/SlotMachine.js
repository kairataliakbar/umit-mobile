import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import PropTypes from 'prop-types'

const getRandomNumber = (min, max) => {
  const minNum = Math.ceil(min)
  const maxNum = Math.floor(max)
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
}

const SlotMachine = ({ players, winner }) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let timer
    const startTimer = () => {
      timer = setInterval(() => {
        setValue(getRandomNumber(0, players.length - 1))
      }, 5000)
    }

    startTimer()
    return () => clearInterval(timer)
  })

  const getPosition = (value) => parseInt(value, 10) * 50 * -1

  const getTranslateStyle = (position) => {
    return ({
      transform: [{ translateY: position }]
    })
  }

  const transformStyle = getTranslateStyle(getPosition(value))

  return (
    <View style={styles.container}>
      <View style={transformStyle}>
        {players.map((player) => (
          <View key={player.id} style={styles.player}>
            <Text style={styles.playerLabel}>{player.username}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    height: 50
  },
  player: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  playerLabel: {
    color: 'white',
    fontSize: 40
  }
})

SlotMachine.propTypes = {
  players: PropTypes.arrayOf({
    id: PropTypes.number,
    username: PropTypes.string
  }),
  winner: PropTypes.object
}

export default SlotMachine
