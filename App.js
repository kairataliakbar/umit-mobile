import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'

import AppNavigation from './src/navigation'
import Colors from './src/theme/colors'

axios.defaults.baseURL = 'http://kzbusinesstries.site'
axios.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      const token = await SecureStore.getItemAsync('token')

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  },
  error => Alert.alert('Error', error.message)
)

export default function App() {
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    const getTokenAsync = async () => {
      let userToken
      try {
        userToken = await SecureStore.getItemAsync('token')
        setToken(userToken)
      } catch (e) {
        console.log(e)
      }
      setIsLoading(false)
    }

    getTokenAsync()
  }, [token])

  const handleLogin = async (newToken) => {
    await SecureStore.setItemAsync('token', newToken)
    setToken(newToken)
  }

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('token')
    setToken(null)
  }

  return (
    <View style={[styles.container, isLoading && styles.center]}>
      {isLoading
        ? <ActivityIndicator size="large" color={Colors.third_font} />
        : <AppNavigation token={token} onLogin={handleLogin} onLogout={handleLogout} />}
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
