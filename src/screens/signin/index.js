import React, { useLayoutEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { useForm, Controller } from 'react-hook-form'

import Container from '../../components/Container'
import H1 from '../../components/Text/H1'
import Input from '../../components/inputs/Input'
import Button from '../../components/Button'

import { EMAIL_PATTERN } from '../../constants'

const Signin = ({ navigation }) => {
  const { control, handleSubmit, errors } = useForm()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: ''
    })
  }, [navigation])

  const onSubmit = (data) => {
    console.log(data)
  }

  const validEmail = (error) => {
    if (error) {
      if (error.type === 'pattern') {
        return 'Email введен некорректно'
      }
      return 'Это обязательное поле'
    }
    return null
  }

  const validPassword = (error) => {
    if (error) {
      if (error.type === 'minLength') {
        return 'Длина должна быть больше 6'
      }
      return 'Это обязательное поле'
    }
    return null
  }

  return (
    <Container customStyle={styles.screen}>
      <H1 propStyles={styles.title}>Вход</H1>
        
      <View style={styles.actions}>
        <Controller
          control={control}
          render={({ onChange, value }) => (
            <Input
              placeholder="Почта*"
              autoCapitalize="none"
              keyboardType="email-address"
              value={value}
              onChangeText={(value) => onChange(value)}
              error={validEmail(errors.email)}
            />
          )}
          name="email"
          defaultValue=""
          rules={{ required: true, pattern: EMAIL_PATTERN }}
        />
        <Controller
          control={control}
          render={({ onChange, value }) => (
            <Input
              placeholder="Пароль*"
              password
              value={value}
              onChangeText={(value) => onChange(value)}
              error={validPassword(errors.password)}
            />
          )}
          name="password"
          defaultValue=""
          rules={{ required: true, minLength: 6 }}
        />
        <Button onPress={handleSubmit(onSubmit)}>Войти</Button>
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
  actions: {
    maxWidth: 400,
    width: '80%'  
  }
})

Signin.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func
  })
}

export default Signin
