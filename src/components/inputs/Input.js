import React, { useState } from 'react'
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../../theme/colors'

const Input = ({ value, onChangeText, password, error, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isShowPassword, setIsShowPassword] = useState(false)

  const toggleShowPassword = () => setIsShowPassword(!isShowPassword)

  const clearInput = () => onChangeText('')

  return (
    <View style={styles.inputContainer}>
      <View style={[styles.input, isFocused && styles.inputFocused]}>
        <TextInput
          value={value}
          style={styles.textInput}
          secureTextEntry={password && !isShowPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={onChangeText}
          {...rest}
        />
        {password && (
          <TouchableOpacity onPress={toggleShowPassword}>
            {isShowPassword ? (
              <Ionicons name="eye" size={24} color={Colors.secondary_font} />
            ) : (
              <Ionicons name="eye-off" size={24} color={Colors.secondary_font} />
            )}
          </TouchableOpacity>
        )}
        {!!value && (
          <TouchableOpacity style={styles.inputAction} onPress={clearInput}>
            <Ionicons name="close-circle" size={22} color={Colors.secondary_font} />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 30,
    position: 'relative'
  },
  input: {
    width: '100%',
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: Colors.third_bg,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: Colors.third_font
  },
  textInput: {
    flex: 1,
    color: Colors.secondary_font,
    fontSize: 20
  },
  inputFocused: {
    borderColor: Colors.primary_font
  },
  inputAction: {
    marginLeft: 10
  },
  error: {
    position: 'absolute',
    top: 51,
    left: 0,
    color: Colors.error,
    fontSize: 14
  }
})

Input.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  password: PropTypes.bool,
  error: PropTypes.string
}

export default Input
