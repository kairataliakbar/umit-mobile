import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import moment from 'moment'

import Colors from '../../../theme/colors'

const Timer = ({ end, onEndTimer }) => {
  const [timer, setTimer] = useState()
  let interval

  useEffect(() => {
    startTimer()
    return () => {
      console.log('destroy')
    }
  }, [])

  const startTimer = () => {
    interval = setInterval(() => onTimer(), 1000)
  }

  const onTimer = () => {
    const currentDate = moment()
    const distance = moment(end).diff(currentDate, 'second')
    console.log(distance, 'distance')
    // let days = Math.floor(distance / (1000 * 60 * 60 * 24))
    // let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    // let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    // let seconds = Math.floor((distance % (1000 * 60)) / 1000)

    // setTimer(`${days}дней : ${hours}час : ${minutes}мин : ${seconds}сек`)
    setTimer(distance)

    if (distance <= 0) {
      console.log('clear interval')
      clearInterval(interval)
      setTimer('Игра началась')
      onEndTimer()
    }
  }

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerLabel}>Игра начнется через</Text>
      <Text style={styles.timerLabel}>{timer}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timerLabel: {
    color: Colors.primary_font,
    fontSize: 20
  }
})

Timer.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
  onEndTimer: PropTypes.func
}

export default Timer
