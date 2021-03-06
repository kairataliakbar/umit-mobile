import React, { useState, useContext } from 'react'
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import PropTypes from 'prop-types'
import axios from 'axios'

import DismissKeyboard from '../../../components/DismissKeyboard'
import Container from '../../../components/Container'
import H1 from '../../../components/text/H1'
import LoginForm from './components/LoginForm'

import Colors from '../../../theme/colors'
import AuthContext from '../../../theme/AuthContext'

const Login = ({ navigation }) => {
  const { onLogin } = useContext(AuthContext)

  const [isLoad, setIsLoad] = useState(false)

  const handleSubmit = async (data) => {
    setIsLoad(true)
    try {
      const res = await axios.post('/login.php', data)
      await onLogin(res.data.message.token, res.data.message.user_id)
      setIsLoad(false)
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
            <LoginForm
              isLoad={isLoad}
              onSubmit={handleSubmit}
              navigation={navigation}
            />
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
    color: Colors.white,
    fontSize: 16
  }
})

Login.propTypes = {
  navigation: PropTypes.object,
}

export default Login
