/* eslint-disable react/display-name */
import React, { useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Alert } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import axios from 'axios'

import CustomHeaderButton from '../../components/atoms/buttons/CustomHeaderButton'

const Game = ({ navigation, route }) => {
  const { bet } = route.params

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
                    onPress: () => handleLogoutRoom(),
                    style: 'destructive'
                  },
                  {
                    text: 'Нет',
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

  const handleLogoutRoom = async () => {
    try {
      const params = `user_id=${17}&room_id=${bet.id}`
      await axios.delete(`/user-room.php?${params}`)
      navigation.navigate('Home')
    } catch (err) {
      Alert.alert('Ошибка', err.message, [{ text: 'Окей' }])
    }
  }

  return (
    <View>
      <Text>{bet.name}</Text>
      <Text>{bet.bet}</Text>
    </View>
  )
}

Game.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      bet: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        bet: PropTypes.number
      })
    })
  }),
  navigation: PropTypes.shape({
    setOptions: PropTypes.func,
    navigate: PropTypes.func
  })
}

export default Game
