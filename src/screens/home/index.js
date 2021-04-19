import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

import Container from '../../components/atoms/Container'
import H1 from '../../components/atoms/text/H3'
import Bet from '../../components/atoms/bet'

import Colors from '../../theme/colors'

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [bets, setBets] = useState([])

  const fetchBets = async () => {
    setIsLoading(true)
    try {
      const token = await SecureStore.getItemAsync('token')
      const headers = { headers: { Authorization: `Bearer ${token}` } }
      const res = await axios.get('http://kzbusinesstries.site/rooms.php', headers)
      setBets(res.data.message)
      setIsLoading(false)
    } catch (error) {
      Alert.alert('Ошибка', error.message, [{ text: 'Окей' }])
    }
  }

  useEffect(() => {
    if (bets.length === 0) fetchBets()
  }, [bets])

  const handleClickBet = (betId) => navigation.navigate('Game', { betId })

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
                onPress={() => handleClickBet(bet.id)}
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
