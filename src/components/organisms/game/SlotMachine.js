import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import PropTypes from 'prop-types'

const getRandomNumber = (min, max) => {
  const minNum = Math.ceil(min)
  const maxNum = Math.floor(max)
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
}

const getPosition = (value) => parseInt(value, 10) * 50 * -1

const SlotMachine = ({ players, winner }) => {
  const [value, setValue] = useState(0)

  const animatingOffsets = useRef(new Animated.Value(getPosition(value))).current

  useEffect(() => {
    let timer
    const startTimer = () => {
      timer = setInterval(() => {
        setValue(getRandomNumber(0, players.length - 1))
      }, 1000)
    }

    startTimer()
    return () => clearInterval(timer)
  })

  useEffect(() => {
    console.log(animatingOffsets, 'animatingOffsets')
    Animated.timing(animatingOffsets, {
      toValue: getPosition(value),
      duration: 1000,
      useNativeDriver: true
    }).start()
  }, [animatingOffsets])

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
  players: PropTypes.array,
  winner: PropTypes.object
}

export default SlotMachine
