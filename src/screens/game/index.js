/* eslint-disable react/display-name */
import React, { useEffect, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Alert } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../../components/atoms/buttons/CustomHeaderButton'
import WaitTemplate from '../../components/templates/game/WaitTemplate'

const Game = ({ navigation, route }) => {
  const { bet } = route.params
  const playersCount = 100
  let timer

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {},
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Exit room"
            iconName="exit-outline"
            onPress={() => {
              Alert.alert(
                'Выйти из комнаты?',
                'Вы действительно хотите выйти из комнаты?',
                [
                  {
                    text: 'Да',
                    onPress: () => console.log('Да'),
                    style: 'destructive'
                  },
                  {
                    text: 'Нет',
                    onPress: () => console.log('Нет'),
                    style: 'default'
                  }
                ]
              )
            }}
          />
        </HeaderButtons>
      )
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
