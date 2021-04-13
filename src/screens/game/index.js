import React, { useEffect, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import WaitTemplate from '../../components/templates/game/WaitTemplate'

const Game = ({ navigation, route }) => {
  const { bet } = route.params
  const playersCount = 100
  let timer

  useLayoutEffect(() => {
    navigation.setOptions({
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
    ? (
      <View>
        <Text>{bet}</Text>
      </View>
    ) : <WaitTemplate />
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
