import React, { useState, useLayoutEffect } from 'react'
import { View, ScrollView, StyleSheet, Alert } from 'react-native'
import PropTypes from 'prop-types'
import axios from 'axios'

import Container from '../../components/atoms/Container'
import H1 from '../../components/atoms/text/H1'
import SignupForm from '../../components/organisms/forms/SignupForm'

const Signup = ({ navigation }) => {
  const [isLoad, setIsLoad] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: ''
    })
  }, [navigation])

  // eslint-disable-next-line no-unused-vars
  const handleSubmit = async ({ password_confirm, ...data }) => {
    setIsLoad(true)
    try {
      await axios.post('http://kzbusinesstries.site/register.php', data)
      setIsLoad(false)
      navigation.navigate('Signin', {
        screen: 'Signin',
        params: {
          afterSignup: true
        }
      })
    } catch (err) {
      setIsLoad(false)
      Alert.alert('Ошибка', err.message, [{ text: 'Окей' }])
    }
  }

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.screen}>
        <H1 propStyles={styles.title}>Регистрация</H1>
        <View style={styles.form}>
          <SignupForm onSubmit={handleSubmit} isLoad={isLoad} />
        </View>
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
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
    setOptions: PropTypes.func,
    navigate: PropTypes.func
  })
}

export default Signup
