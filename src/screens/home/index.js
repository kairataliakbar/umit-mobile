import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, StyleSheet, View, Alert } from 'react-native'
import PropTypes from 'prop-types'
import axios from 'axios'

import Container from '../../components/atoms/Container'
import H1 from '../../components/atoms/text/H3'
import Bet from '../../components/atoms/bet'

import Colors from '../../theme/colors'
import AuthContext from '../../theme/AuthContext'

const Home = ({ navigation }) => {
  const { userId, onLogout } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(false)
  const [bets, setBets] = useState([])

  const fetchBets = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get('/rooms.php')
      setBets(res.data.message)
      setIsLoading(false)
    } catch (error) {
      onLogout()
    }
  }

  useEffect(() => {
    if (bets.length === 0) fetchBets()
  }, [bets])

  const handleClickBet = async (bet) => {
    try {
      const res = await axios.post(
        '/user-room.php',
        {
          user_id: userId,
          room_id: bet.id
        }
      )
      navigation.navigate('Game', { bet, sessionId: res.data.message.session_id })
    } catch (err) {
      Alert.alert('Ошибка', err.message, [{ text: 'Окей' }])
    }
  }

  return (
    <Container customStyle={styles.screen}>
      {isLoading ? <ActivityIndicator size="large" color={Colors.primary_font} /> : (
        <>
          <H1 propStyles={styles.title}>Выберите ставку</H1>
          <View style={styles.bets}>
            {bets.map((bet) => (
              <Bet
                key={bet.id}
                bet={bet.bet}
                onPress={() => handleClickBet(bet)}
                customStyle={styles.bet}
              />
            ))}
          </View>
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
    marginBottom: 14
  },
  bets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  },
  bet: {
    width: '40%',
    marginVertical: 10
  }
})

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  })
}

export default Home
