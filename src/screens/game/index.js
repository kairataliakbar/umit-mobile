/* eslint-disable react/display-name */
import React, { useLayoutEffect, useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Alert, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import axios from 'axios'

import Container from '../../components/atoms/Container'
import CustomHeaderButton from '../../components/atoms/buttons/CustomHeaderButton'
import Info from '../../components/templates/game/Info'
import Wait from '../../components/templates/game/Wait'
import AuthContext from '../../theme/AuthContext'

const Game = ({ navigation, route }) => {
  const { bet, sessionId } = route.params
  const { userId } = useContext(AuthContext)

  const [winner, setWinner] = useState(null)

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
                    onPress: () => onLogoutRoom(),
                    style: 'destructive'
                  },
                  { text: 'Нет', style: 'default' }
                ]
              )
            }}
          />
        </HeaderButtons>
      )
    })
  }, [navigation])

  useEffect(() => startTimer(), [])

  useEffect(() => console.log(winner, 'winner'), [winner])

  const startTimer = () => {
    timer = setTimeout(() => {
      getWinner()
      if (winner?.start_time) clearTimer()
    }, 3000)
  }

  const getWinner = async () => {
    console.log('timer')
    try {
      const res = await axios.post('/winner.php', { session_id: sessionId })
      setWinner(res.data.message)
    } catch (err) {
      Alert.alert('Ошибка', err.message, [{ text: 'Окей' }])
    }
  }

  const clearTimer = () => clearTimeout(timer)

  const onLogoutRoom = async () => {
    try {
      const params = `user_id=${userId}&room_id=${bet.id}`
      await axios.delete(`/user-room.php?${params}`)
      clearTimeout(timer)
      navigation.navigate('Home')
    } catch (err) {
      Alert.alert('Ошибка', err.message, [{ text: 'Окей' }])
    }
  }

  return (
    <Container customStyle={styles.screen}>
      <Info bet={bet.bet} />
      <Wait />
    </Container>
  )
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center'
  }
})

Game.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      bet: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        bet: PropTypes.string
      }),
      sessionId: PropTypes.number
    })
  }),
  navigation: PropTypes.shape({
    setOptions: PropTypes.func,
    navigate: PropTypes.func
  })
}

export default Game
