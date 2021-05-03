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
    return () => {}
  }, [])

  const startTimer = () => {
    interval = setInterval(() => onTimer(), 1000)
  }

  const onTimer = () => {
    const currentDate = moment()
    const seconds = moment(end).diff(currentDate, 'second')
    const timeDistance = moment.utc(seconds * 1000).format('HH:mm:ss')

    setTimer(timeDistance)

    if (seconds <= 0) {
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
    fontSize: 20,
    marginVertical: 5
  }
})

Timer.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
  onEndTimer: PropTypes.func
}

export default Timer
