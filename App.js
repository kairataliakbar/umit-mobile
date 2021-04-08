import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import AppNavigation from './src/navigation/app'
import AuthNavigation from './src/navigation/auth'

export default function App() {
  return (
    <View style={styles.container}>
      {AsyncStorage.getItem('token')
        ? <AppNavigation />
        : <AuthNavigation />}
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
