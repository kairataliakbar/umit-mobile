/* eslint-disable react/display-name */
import React, { useLayoutEffect, useEffect, useState, useContext, useMemo } from 'react'
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

  const [winner, setWinner] = useState(null)
  const [players, setPlayers] = useState([])

  let timer

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {},
      headerRight: () => {
        if (winner?.start_time) return
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
    onStartPrevGame()
    return () => {
      console.log('destroy')
    }
  }, [])

  const getPlayers = async () => {
    try {
      const res = await axios.get(`/user-room.php?room_id=${bet.id}`)
      console.log(res.data.message.users, 'get players')
      setPlayers(res.data.message.users)
    } catch (err) {
      Alert.alert('Ошибка', err.message, [{ text: 'Окей' }])
    }
  }

  const getWinner = async () => {
    try {
      const res = await axios.post('/winner.php', { session_id: sessionId })
      setWinner(res.data.message.game_session)
      console.log('get winner')
      if (winner?.start_time) {
        console.log('clear timer')
        clearTimeout(timer)
      } else {
        startTimer()
      }
    } catch (err) {
      startTimer()
    }
  }

  const startTimer = () => {
    timer = setTimeout(() => onStartPrevGame(), 3000)
  }

  const onStartPrevGame = async () => {
    await getPlayers()
    await getWinner()
  }

  const onStartGame = () => console.log('start')

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
    console.log('render game', winner?.start_time)
    if (winner?.start_time && winner?.start_time === new Date()) {
      return <Drum />
    } else if (winner?.start_time) {
      return <Timer end={winner.start_time} onEndTimer={onStartGame} />
    } else {
      return <Wait />
    }
  }, [winner])

  return (
    <Container customStyle={styles.screen}>
      <Info bet={bet.bet} countPlayers={players.length} />
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
