import React, { useState, useEffect, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'

import WaitTemplate from '../../components/templates/WaitTemplate'
import WheelFortuneTemplate from '../../components/templates/WheelFortuneTemplate'

const Game = ({ navigation, route }) => {
  const [playersCount, setPlayersCount] = useState(100)
  const { bet } = route.params
  let timer

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerBackTitle: 'Назад'
    })
  }, [navigation])

  useEffect(() => handleTimer(), [])

  const handleTimer = () => {
    timer = setTimeout(getPlayersCount, 5000)
  }

  const getPlayersCount = () => {
    if (playersCount !== 100) {
      handleTimer()
    } else {
      clearTimeout(timer)
    }
  }

  return playersCount === 100
    ? <WheelFortuneTemplate bet={bet} />
    : <WaitTemplate />
}

Game.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      bet: PropTypes.number
    })
  }),
  navigation: PropTypes.shape({
    setOptions: PropTypes.func
  })
}

export default Game
