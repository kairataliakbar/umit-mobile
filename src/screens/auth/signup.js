import React, { useState } from 'react'
import { View, ScrollView, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import PropTypes from 'prop-types'
import axios from 'axios'

import DismissKeyboard from '../../components/atoms/DismissKeyboard'
import Container from '../../components/atoms/Container'
import H1 from '../../components/atoms/text/H1'
import SignupForm from '../../components/organisms/forms/SignupForm'

const Signup = ({ navigation }) => {
  const [isLoad, setIsLoad] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const handleSubmit = async ({ password_confirm, ...data }) => {
    setIsLoad(true)
    try {
      await axios.post('http://kzbusinesstries.site/register.php', data)
      setIsLoad(false)
      navigation.navigate('Login', { afterSignup: true })
    } catch (err) {
      setIsLoad(false)
      Alert.alert('Ошибка', err.message, [{ text: 'Окей' }])
    }
  }

  const Wrapper = Platform.OS === 'android' ? View : KeyboardAvoidingView

  return (
    <Wrapper style={styles.wrapper} behavior="padding" keyboardVerticalOffset={140}>
      <DismissKeyboard>
        <Container>
          <ScrollView contentContainerStyle={styles.screen}>
            <H1 propStyles={styles.title}>Регистрация</H1>
            <View style={styles.form}>
              <SignupForm onSubmit={handleSubmit} isLoad={isLoad} />
            </View>
          </ScrollView>
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
    paddingVertical: 40
  },
  title: {
    marginBottom: 30
  },
  form: {
    maxWidth: 400,
    width: '80%'
  }
})

Signup.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  })
}

export default Signup
