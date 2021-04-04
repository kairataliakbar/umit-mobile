import React, { useLayoutEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons'

import Container from '../../components/atoms/Container'
import H1 from '../../components/atoms/text/H1'
import SigninForm from '../../components/organisms/forms/SigninForm'

import Colors from '../../theme/colors'

const Signin = ({ navigation, route }) => {
  const email = route.params?.email
  const password = route.params?.password

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: ''
    })
  }, [navigation])

  const handleSubmit = (data) => {
    axios.post('http://kzbusinesstries.site/login.php', data)
      .then((res) => console.log(res, 'res'))
      .catch((err) => {
        Alert.alert('Ошибка', err.message, [{ text: 'Окей' }])
      })
  }

  return (
    <Container customStyle={styles.screen}>
      <H1 propStyles={styles.title}>Вход</H1>
        
      {email && password && (
        <View style={styles.alert}>
          <Ionicons name="alert-circle-outline" size={24} color={Colors.secondary_font} />
          <Text style={styles.alertLabel}>После регистрации обязательно нужно подтвердить почту</Text>
        </View>
      )}
      
      <View style={styles.form}>
        <SigninForm onSubmit={handleSubmit} defaultValues={{ email, password }} />
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
    flexDirection: 'row',
  },
  alertLabel: {
    marginLeft: 10,
    color: Colors.secondary_font
  }
})

Signin.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string
    })
  })
}

export default Signin
