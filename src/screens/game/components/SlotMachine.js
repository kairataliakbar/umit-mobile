import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import PropTypes from 'prop-types'

import Colors from '../../../theme/colors'

const HEIGHT_SLOT = 60

const getRandomNumber = (min, max) => {
  const minNum = Math.ceil(min)
  const maxNum = Math.floor(max)
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
}

const getPosition = (value) => parseInt(value, 10) * HEIGHT_SLOT * -1

const SlotMachine = ({ players, winner, onFinish }) => {
  const [value, setValue] = useState(0)

  const animatingOffsets = useRef(new Animated.Value(getPosition(value))).current

  useEffect(() => {
    let timer
    let endGameTimer

    const startTimer = () => {
      timer = setInterval(() => {
        setValue(getRandomNumber(0, players.length - 1))
      }, 110)
    }

    const startEndGameTimer = () => {
      endGameTimer = setTimeout(() => {
        setValue(players.findIndex((player) => player.id === winner.id))
        clearInterval(timer)
        onFinish()
      }, 6000)
    }

    startTimer()
    startEndGameTimer()
    return () => {
      clearInterval(timer)
      clearInterval(endGameTimer)
    }
  }, [])

  useEffect(() => {
    Animated.timing(animatingOffsets, {
      toValue: getPosition(value),
      duration: 110,
      useNativeDriver: true
    }).start()
  }, [value])

  const getTranslateStyle = (position) => {
    return ({
      transform: [{ translateY: position }]
    })
  }

  const transformStyle = getTranslateStyle(animatingOffsets)

  return (
    <View style={styles.container}>
      <Animated.View style={transformStyle}>
        {players.map((player) => (
          <View key={player.id} style={styles.player}>
            <Text style={styles.playerLabel}>{player.username}</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    height: HEIGHT_SLOT,
    borderWidth: 4,
    borderColor: Colors.gold,
    borderRadius: 10
  },
  player: {
    height: HEIGHT_SLOT,
    alignItems: 'center',
    justifyContent: 'center'
  },
  playerLabel: {
    color: 'white',
    fontSize: 40
  }
})

SlotMachine.propTypes = {
  players: PropTypes.array,
  winner: PropTypes.shape({
    id: PropTypes.number
  }),
  onFinish: PropTypes.func
}

export default SlotMachine
