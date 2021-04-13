import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import * as SecureStore from 'expo-secure-store'

import AppNavigation from './src/navigation'
import Colors from './src/theme/colors'

export default function App() {
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    const getTokenAsync = async () => {
      let userToken
      try {
        userToken = await SecureStore.getItemAsync('token')
      } catch (e) {
        console.log(e)
      }
      setToken(userToken)
      setIsLoading(false)
    }

    getTokenAsync()
  }, [])

  return (
    <View style={[styles.container, isLoading && styles.center]}>
      {isLoading
        ? <ActivityIndicator size="large" color={Colors.third_font} />
        : <AppNavigation token={token} />}
      <StatusBar style="auto" barStyle="light-content" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary_bg
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
