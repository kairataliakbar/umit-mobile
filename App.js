import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'

import AppNavigation from './src/navigation'
import Colors from './src/theme/colors'
import AuthContext from './src/theme/AuthContext'

axios.defaults.baseURL = 'http://kzbusinesstries.site'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.get['Cache-Control'] = 'no-cache'
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
  const [userId, setUserId] = useState(null)
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

  const handleLogin = async (newToken, newUserId) => {
    await SecureStore.setItemAsync('token', newToken)
    setUserId(newUserId)
    setToken(newToken)
  }

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('token')
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{
        userId,
        onLogin: handleLogin,
        onLogout: handleLogout
      }}
    >
      <View style={[styles.container, isLoading && styles.center]}>
        {isLoading
          ? <ActivityIndicator size="large" color={Colors.white} />
          : <AppNavigation token={token} />}
        <StatusBar style="auto" barStyle="light-content" />
      </View>
    </AuthContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
