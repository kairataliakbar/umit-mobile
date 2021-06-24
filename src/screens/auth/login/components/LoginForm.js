import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { useForm, Controller } from 'react-hook-form'

import Input from '../../../../components/inputs/Input'
import Button from '../../../../components/buttons/Button'

import { EMAIL_PATTERN } from '../../../../constants'

const LoginForm = ({ onSubmit, isLoad, navigation }) => {
  const { control, handleSubmit, errors, reset } = useForm()

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

  const onFormSubmit = async (data) => {
    await onSubmit(data)
    reset()
  }

  const onToRegister = () => navigation.navigate('Signup')

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        render={({ onChange, value }) => (
          <Input
            placeholder="Почта*"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
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
            returnKeyType="send"
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
      <Button load={isLoad} onPress={handleSubmit(onFormSubmit)}>Войти</Button>
      <Button type="link" onPress={onToRegister}>Зарегистрироваться</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    alignItems: 'center'
  }
})

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoad: PropTypes.bool,
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  })
}

export default LoginForm
