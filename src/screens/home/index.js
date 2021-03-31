import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import Container from '../../components/atoms/Container'
import Card from '../../components/atoms/card'
import H3 from '../../components/atoms/text/H3'
import Bet from '../../components/atoms/bet'

import { BETS } from '../../constants'

const Home = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: ''
    })
  }, [navigation])

  const handleClickBet = (bet) => {
    navigation.navigate('Game', { bet })
  }

  return (
    <Container customStyle={styles.screen}>
      <Card propStyles={styles.card}>
        <View style={styles.cardInner}>
          <H3 propStyles={styles.cardTitle}>Выберите ставку</H3>
          
          <View style={styles.bets}>
            {BETS.map((bet) => (
              <Bet
                key={bet}
                bet={bet}
                onPress={() => handleClickBet(bet)}
                customStyle={styles.bet}
              />
            ))}
          </View>
        </View>
      </Card>
    </Container>
  )
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    width: '90%',
    height: 400
  },
  cardInner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardTitle: {
    marginBottom: 14
  },
  bets: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  bet: {
    margin: 5
  }
})

Home.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func,
    navigate: PropTypes.func
  })
}

export default Home
