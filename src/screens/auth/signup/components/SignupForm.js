import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import PropTypes from 'prop-types'

import Input from '../../atoms/inputs/Input'
import Button from '../../atoms/buttons/Button'

import { EMAIL_PATTERN } from '../../../constants'

const SignupForm = ({ onSubmit, isLoad }) => {
  const { control, handleSubmit, errors, watch, setError, clearErrors, reset } = useForm()

  const passwordValue = watch('password')
  const passwordConfirmValue = watch('password_confirm')

  useEffect(() => {
    if (passwordValue && passwordConfirmValue) {
      if (passwordValue === passwordConfirmValue) {
        clearErrors('password_confirm')
      } else {
        setError('password_confirm', { type: 'manual' })
      }
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

  const formSubmit = async (data) => {
    await onSubmit(data)
    reset()
  }

  return (
    <>
      <Controller
        control={control}
        render={({ onChange, value }) => (
          <Input
            placeholder="Имя пользователя*"
            autoCapitalize="none"
            returnKeyType="next"
            value={value}
            onChangeText={(value) => onChange(value)}
            error={errors.username && 'Это обязательное поле'}
          />
        )}
        name="username"
        defaultValue=""
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ onChange, value }) => (
          <Input
            placeholder="Имя"
            returnKeyType="next"
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
            returnKeyType="next"
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
            returnKeyType="next"
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
            returnKeyType="send"
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
      <Button load={isLoad} onPress={handleSubmit(formSubmit)}>
        Зарегистрироваться
      </Button>
    </>
  )
}

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoad: PropTypes.bool
}

export default SignupForm
