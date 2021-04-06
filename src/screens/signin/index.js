import React, { useState, useLayoutEffect } from 'react'
import { View, StyleSheet, Text, Alert } from 'react-native'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Container from '../../components/atoms/Container'
import H1 from '../../components/atoms/text/H1'
import SigninForm from '../../components/organisms/forms/SigninForm'

import Colors from '../../theme/colors'

const Signin = ({ navigation, route }) => {
  const [isLoad, setIsLoad] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: ''
    })
  }, [navigation])

  const handleSubmit = async (data) => {
    setIsLoad(true)
    try {
      const res = await axios.post('http://kzbusinesstries.site/login.php', data)
      await AsyncStorage.setItem('token', res.data.message.token)
      setIsLoad(false)
      navigation.navigate('App')
    } catch (err) {
      setIsLoad(false)
      Alert.alert('Ошибка', err.message, [{ text: 'Окей' }])
    }
  }

  return (
    <Container customStyle={styles.screen}>
      <H1 propStyles={styles.title}>Вход</H1>
        
      {route?.params?.afterSignup && (
        <View style={styles.alert}>
          <Ionicons name="alert-circle-outline" size={26} color={Colors.third_font} />
          <Text style={styles.alertLabel}>
            После регистрации, перед входом, обязательно нужно подтвердить почту
          </Text>
        </View>
      )}
      
      <View style={styles.form}>
        <SigninForm isLoad={isLoad} onSubmit={handleSubmit} />
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
    marginBottom: 30
  },
  form: {
    maxWidth: 400,
    width: '80%'  
  },
  alert: {
    maxWidth: 400,
    width: '80%',
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  alertLabel: {
    marginLeft: 10,
    color: Colors.third_font,
    fontSize: 16
  }
})

Signin.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      afterSignup: PropTypes.bool
    })
  })
}

export default Signin
