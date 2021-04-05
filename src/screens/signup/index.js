import React, { useLayoutEffect } from 'react'
import { View, ScrollView, StyleSheet, Alert } from 'react-native'
import PropTypes from 'prop-types'
import axios from 'axios'

import Container from '../../components/atoms/Container'
import H1 from '../../components/atoms/text/H1'
import SignupForm from '../../components/organisms/forms/SignupForm'

const Signup = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: ''
    })
  }, [navigation])

  // eslint-disable-next-line no-unused-vars
  const handleSubmit = async ({ password_confirm, ...data }) => {
    try {
      await axios.post('http://kzbusinesstries.site/register.php', data)
      navigation.navigate('Signin', {
        screen: 'Signin',
        params: {
          email: data.email,
          password: data.password
        }
      })
    } catch (err) {
      Alert.alert('Ошибка', err.message, [{ text: 'Окей' }])
    }
  }

  return (
    <Container>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.screen}>
          <H1 propStyles={styles.title}>Регистрация</H1>
          <View style={styles.form}>
            <SignupForm onSubmit={handleSubmit} />
          </View>
        </View>
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
