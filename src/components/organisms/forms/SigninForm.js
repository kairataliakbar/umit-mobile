import React from 'react'
import PropTypes from 'prop-types'
import { useForm, Controller } from 'react-hook-form'

import Input from '../../atoms/inputs/Input'
import Button from '../../atoms/buttons/Button'

import { EMAIL_PATTERN } from '../../../constants'

const SigninForm = ({ onSubmit, defaultValues }) => {
  const { control, handleSubmit, errors } = useForm({ defaultValues })

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
    <>
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
    </>
  )
}

SigninForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.object
}

export default SigninForm
