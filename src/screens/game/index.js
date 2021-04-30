/* eslint-disable react/display-name */
import React, { useRef, useEffect, useContext, useMemo, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { Alert, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import axios from 'axios'

import Container from '../../components/atoms/Container'
import CustomHeaderButton from '../../components/atoms/buttons/CustomHeaderButton'
import Info from '../../components/templates/game/Info'
import Wait from '../../components/templates/game/Wait'
import Drum from '../../components/templates/game/Drum'
import Timer from '../../components/templates/game/Timer'
import AuthContext from '../../theme/AuthContext'

const Game = ({ navigation, route }) => {
  const { bet, sessionId } = route.params
  const { userId } = useContext(AuthContext)

  const players = useRef([])
  const winner = useRef(null)
  const startTime = useRef(null)

  let timer

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {},
      headerRight: () => {
        if (startTime.current) return
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
  }, [navigation, winner])

  useEffect(() => {
    timer = setInterval(() => onStartPrevGame(), 3000)

    return () => {
      clearInterval(timer)
      startTime.current = null
      players.current = null
      winner.current = null
    }
  }, [])

  const getPlayers = async () => {
    try {
      const res = await axios.get(`/user-room.php?room_id=${bet.id}`)
      players.current = res.data.message.users
    } catch (err) {
      Alert.alert('Ошибка', err.message, [{ text: 'Окей' }])
    }
  }

  const getStartTime = async () => {
    try {
      const res = await axios.post('/winner.php', { session_id: sessionId })
      startTime.current = res.data.message.game_session.start_time
    } catch (err) {
      Alert.alert('Ошибка', err.message, [{ text: 'Окей' }])
    }
  }

  const getWinner = async () => {
    try {
      const res = await axios.post('/winner.php', { session_id: sessionId })
      winner.current = res.data.message.game_session.winner_user_id
    } catch (err) {
      Alert.alert('Ошибка', err.message, [{ text: 'Окей' }])
    }
  }

  const onStartPrevGame = async () => {
    console.log(startTime.current, players.current.length)
    await getPlayers()
    if (!startTime.current && players.current.length >= 3) {
      await getStartTime()
    }
  }

  const onStartGame = async () => {
    clearInterval(timer)
    await getWinner()
    console.log(winner.current)
  }

  const onLogoutRoom = async () => {
    try {
      const params = `user_id=${userId}&room_id=${bet.id}`
      await axios.delete(`/user-room.php?${params}`)
      navigation.navigate('Home')
    } catch (err) {
      Alert.alert('Ошибка', err.message, [{ text: 'Окей' }])
    }
  }

  const renderGame = useMemo(() => {
    if (startTime.current && winner.current) {
      return <Drum />
    } else if (startTime.current && players.current.length >= 3) {
      return <Timer end={startTime.current} onEndTimer={onStartGame} />
    } else {
      return <Wait />
    }
  }, [startTime, winner])

  return (
    <Container customStyle={styles.screen}>
      <Info bet={bet.bet} countPlayers={players.current.length} />
      {renderGame}
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
