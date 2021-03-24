import React, { useEffect, useLayoutEffect } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { useForm, Controller } from 'react-hook-form'

import Container from '../../components/Container'
import H1 from '../../components/Text/H1'
import Input from '../../components/inputs/Input'
import Button from '../../components/Button'

const Signup = ({ navigation }) => {
  const { control, handleSubmit, errors, watch, setError } = useForm()

  const passwordValue = watch('password')
  const passwordConfirmValue = watch('password_confirm')

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: ''
    })
  }, [navigation])

  useEffect(() => {
    if (passwordValue && (passwordValue !== passwordConfirmValue)) {
      setError('password_confirm', { type: 'manual' })
    }
  }, [passwordValue, passwordConfirmValue])

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
        return 'Длина должна быть больше 8'
      }
      return 'Это обязательное поле'
    }
    return null
  }

  const validPasswordConfirm = (error) => {
    if (error) {
      if (error.type === 'manual') {
        return 'Пароли разные'
      }
      return 'Это обязательное поле'
    }
    return null
  }

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.screen}>
        <H1 propStyles={styles.title}>Регистрация</H1>
          
        <View style={styles.actions}>
          <Controller
            control={control}
            render={({ onChange, value }) => (
              <Input
                placeholder="Имя пользователя*"
                autoCapitalize="none"
                value={value}
                onChangeText={(value) => onChange(value)}
                error={errors.name && 'Это обязательное поле'}
              />
            )}
            name="name"
            defaultValue=""
            rules={{ required: true }}
          />
          <Controller
            control={control}
            render={({ onChange, value }) => (
              <Input
                placeholder="Имя"
                value={value}
                onChangeText={(value) => onChange(value)}
              />
            )}
            name="first_name"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ onChange, value }) => (
              <Input
                placeholder="Фамилия"
                value={value}
                onChangeText={(value) => onChange(value)}
              />
            )}
            name="last_name"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({ onChange, value }) => (
              <Input
                placeholder="E-mail*"
                autoCapitalize="none"
                keyboardType="email-address"
                value={value}
                onChangeText={(value) => onChange(value)}
                error={validEmail(errors.email)}
              />
            )}
            name="email"
            defaultValue=""
            rules={{ required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ }}
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
            rules={{ required: true, minLength: 8 }}
          />
          <Controller
            control={control}
            render={({ onChange, value }) => (
              <Input
                placeholder="Повторите пароль*"
                password
                value={value}
                onChangeText={(value) => onChange(value)}
                error={validPasswordConfirm(errors.password_confirm)}
              />
            )}
            name="password_confirm"
            defaultValue=""
            rules={{ required: true }}
          />
          <Button onPress={handleSubmit(onSubmit)}>Зарегистрироваться</Button>
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
  actions: {
    maxWidth: 400,
    width: '80%'  
  }
})

Signup.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func
  })
}

export default Signup
