import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import Colors from '../../../theme/colors'

const Timer = ({ end, onEndTimer }) => {
  const [timer, setTimer] = useState()
  const endDate = new Date(end).getTime()
  let interval

  useEffect(() => {
    startTimer()
    return () => {
      console.log('destroy')
    }
  })

  const startTimer = () => {
    interval = setInterval(onTimer(), 1000)
  }

  const onTimer = () => {
    const nowDate = new Date().getTime()
    const distance = endDate - nowDate

    var days = Math.floor(distance / (1000 * 60 * 60 * 24))
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)

    setTimer(`${days}дней, ${hours}часов, ${minutes}минут, ${seconds}секунд`)

    if (distance < 0) {
      clearInterval(interval)
      setTimer('Игра началась')
      onEndTimer()
    }
  }

  return (
    <View style={styles.timerContainer}>
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
