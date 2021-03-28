import React, { useState, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, Text, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'

import Container from '../../components/Container'
import H3 from '../../components/Text/H3'

import Colors from '../../theme/colors'

const Game = ({ navigation, route }) => {
  const [playersCount, setPlayersCount] = useState(40)
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

  return (
    <Container customStyle={styles.screen}>
      {playersCount === 100 ? (
        <>
          <Text>Игра началась</Text>
          <Text>{bet}</Text>
        </>
      ) : (
        <>
          <H3 propStyles={styles.title}>Ожидание других игроков</H3>
          <ActivityIndicator size="large" color={Colors.primary_font} />
        </>
      )}
    </Container>
  )
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    width: '80%',
    maxWidth: 400,
    textAlign: 'center',
    marginBottom: 20
  }
})

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
