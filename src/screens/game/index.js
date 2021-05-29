/* eslint-disable react/display-name */
import React, { useState, useEffect, useContext, useMemo, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { Alert, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import axios from 'axios'

import Container from '../../components/Container'
import CustomHeaderButton from '../../components/buttons/CustomHeaderButton'
import Info from './components/Info'
import Wait from './components/Wait'
import Drum from './components/Drum'
import Timer from './components/Timer'

import AuthContext from '../../theme/AuthContext'

const Game = ({ navigation, route }) => {
  const { bet, sessionId } = route.params
  const { userId } = useContext(AuthContext)

  const [players, setPlayers] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [winner, setWinner] = useState(null)

  let timer

  useEffect(() => {
    fetchTimer()

    return () => {
      clearTimeout(timer)
    }
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {},
      headerRight: () => {
        if (startTime && !winner) return
        return (
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
      }
    })
  }, [navigation, winner, startTime])

  const getPlayers = async () => {
    try {
      const res = await axios.get('/user-room.php', { params: { room_id: bet.id } })
      setPlayers(res.data.message.users)
    } catch (err) {
      Alert.alert('Ошибка', err.message, [{ text: 'Окей' }])
    }
  }

  const getStartTime = async () => {
    try {
      const res = await axios.post('/winner.php', { session_id: sessionId })
      setStartTime(res.data.message.game_session.start_time)
    } catch (err) {
      Alert.alert('Ошибка', err.message, [{ text: 'Окей' }])
    }
  }

  const getWinner = async () => {
    try {
      const res = await axios.post('/winner.php', { session_id: sessionId })
      setWinner(res.data.message.game_session.winner_user_id)
    } catch (err) {
      Alert.alert('Ошибка', err.message, [{ text: 'Окей' }])
    }
  }

  const onStartPrevGame = () => {
    getPlayers()
    if (!startTime && players.length >= 3) getStartTime()
    if (!winner) {
      clearTimeout(timer)
      fetchTimer()
    }
  }

  const fetchTimer = () => {
    timer = setTimeout(onStartPrevGame, 3000)
  }

  const onStartGame = () => {
    clearTimeout(timer)
    getWinner()
  }

  const onLogoutRoom = async () => {
    try {
      const params = {
        user_id: userId,
        room_id: bet.id
      }
      await axios.delete('/user-room.php', { params })
      navigation.navigate('Home')
    } catch (err) {
      Alert.alert('Ошибка', err.message, [{ text: 'Окей' }])
    }
  }

  const onFinish = () => {
    if (userId === winner.id) {
      Alert.alert('Вы выиграли!', [{ text: 'Окей', onPress: () => onLogoutRoom() }])
    } else {
      Alert.alert('Вы проиграли!', [{ text: 'Выйти', onPress: () => onLogoutRoom() }])
    }
  }

  const renderGame = useMemo(() => {
    if (startTime && winner) {
      return (
        <Drum
          winner={players.find((player) => player.id === winner)}
          players={players}
          onFinish={onFinish}
        />
      )
    } else if (startTime && players.length >= 3) {
      return <Timer end={startTime} onEndTimer={onStartGame} />
    } else {
      return <Wait />
    }
  }, [players, startTime, winner])

  return (
    <Container customStyle={styles.screen}>
      <Info bet={bet.bet} countPlayers={players.length} />
      {renderGame()}
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
