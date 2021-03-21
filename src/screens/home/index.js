import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FlatGrid } from 'react-native-super-grid'

import Card from '../../components/Card'
import H3 from '../../components/Text/H3'
import Bet from '../../components/Bet'

import { bets } from '../../constants'

const Home = () => {
  return (
    <View style={styles.screen}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2d2d2d'
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

export default Home
