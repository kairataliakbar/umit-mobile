import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FlatGrid } from 'react-native-super-grid'
import PropTypes from 'prop-types'

import Container from '../../components/Container'
import Card from '../../components/Card'
import H3 from '../../components/Text/H3'
import Bet from '../../components/Bet'

import { bets } from '../../constants'

const Home = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: ''
    })
  }, [navigation])

  return (
    <Container customStyle={styles.screen}>
      <Card propStyles={styles.card}>
        <View style={styles.card_inner}>
          <H3>Выберите ставку</H3>
          
          <FlatGrid
            itemDimension={70}
            spacing={20}
            data={bets}
            renderItem={({ item }) => <Bet onPress={() => {}}>{item}</Bet>}
          />
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
  card_inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

Home.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func
  })
}

export default Home
