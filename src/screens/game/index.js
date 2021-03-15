import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Game = () => {
  return (
    <View style={styles.screen}>
      <Text>Game</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Game
