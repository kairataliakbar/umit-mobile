import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Signin = () => {
  return (
    <View style={styles.screen}>
      <Text>Signin</Text>
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

export default Signin
