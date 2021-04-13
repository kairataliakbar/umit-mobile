import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import PropTypes from 'prop-types'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

import DismissKeyboard from '../../components/atoms/DismissKeyboard'
import Container from '../../components/atoms/Container'
import H1 from '../../components/atoms/text/H1'
import LoginForm from '../../components/organisms/forms/LoginForm'

import Colors from '../../theme/colors'

const Login = ({ navigation, route }) => {
  const [isLoad, setIsLoad] = useState(false)

  useEffect(() => {
    if (route?.params?.afterSignup) {
      Alert.alert(
        'Внимание',
        'После регистрации, перед входом, обязательно нужно подтвердить почту',
        [{ text: 'Хорошо' }]
      )
    }
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: ''
    })
  }, [navigation])

  const handleSubmit = async (data) => {
    setIsLoad(true)
    try {
      const res = await axios.post('http://kzbusinesstries.site/login.php', data)
      await SecureStore.setItemAsync('token', res.data.message.token)
      setIsLoad(false)
      navigation.navigate('Home')
    } catch (err) {
      setIsLoad(false)
      Alert.alert('Ошибка', err.message, [{ text: 'Окей' }])
    }
  }

  const Wrapper = Platform.OS === 'android' ? View : KeyboardAvoidingView

  return (
    <Wrapper style={styles.wrapper} behavior="padding" keyboardVerticalOffset={10}>
      <DismissKeyboard>
        <Container customStyle={styles.screen}>
          <H1 propStyles={styles.title}>Вход</H1>
          <View style={styles.form}>
            <LoginForm isLoad={isLoad} onSubmit={handleSubmit} />
          </View>
        </Container>
      </DismissKeyboard>
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
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

Login.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func,
    navigate: PropTypes.func
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      afterSignup: PropTypes.bool
    })
  })
}

export default Login
