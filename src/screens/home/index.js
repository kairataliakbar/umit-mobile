/* eslint-disable react/display-name */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import Container from '../../components/atoms/Container'
import H1 from '../../components/atoms/text/H3'
import Bet from '../../components/atoms/bet'
import CustomHeaderButton from '../../components/atoms/buttons/CustomHeaderButton'

import { BETS } from '../../constants'

const Home = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Exit"
            iconName="exit-outline"
            onPress={() => console.log('exit')}
          />
        </HeaderButtons>
      )
    })
  }, [navigation])

  const handleClickBet = (bet) => navigation.navigate('Game', { bet })

  return (
    <Container customStyle={styles.screen}>
      <H1 propStyles={styles.title}>Выберите ставку</H1>
      
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
    setOptions: PropTypes.func,
    navigate: PropTypes.func
  })
}

export default Home
