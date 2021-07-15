import React, { useState, useRef } from 'react'
import { Animated, View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../../theme/colors'

const Input = ({ value, onChangeText, password, error, ...rest }) => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const animation = useRef(new Animated.Value(0)).current

  const toggleShowPassword = () => setIsShowPassword(!isShowPassword)

  const clearInput = () => onChangeText('')

  const onFocusAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false
    }).start()
  }

  const onBlurAnimation = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start()
  }

  const inputInterpolation =  animation.interpolate({
    inputRange: [0, 1],
    outputRange:[Colors.white , Colors.gold]
  })

  return (
    <View style={styles.inputContainer}>
      <Animated.View style={[styles.input, { borderColor: error ? Colors.error : inputInterpolation }]}>
        <TextInput
          value={value}
          style={styles.textInput}
          secureTextEntry={password && !isShowPassword}
          onFocus={() => onFocusAnimation()}
          onBlur={() => onBlurAnimation()}
          onChangeText={onChangeText}
          {...rest}
        />
        {password && (
          <TouchableOpacity onPress={toggleShowPassword}>
            {isShowPassword ? (
              <Ionicons name="eye" size={24} color={Colors.black} />
            ) : (
              <Ionicons name="eye-off" size={24} color={Colors.black} />
            )}
          </TouchableOpacity>
        )}
        {!!value && (
          <TouchableOpacity style={styles.inputAction} onPress={clearInput}>
            <Ionicons name="close-circle" size={22} color={Colors.black} />
          </TouchableOpacity>
        )}
      </Animated.View>
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
    backgroundColor: Colors.white,
    borderWidth: 3,
    borderRadius: 3,
    borderColor: Colors.white
  },
  textInput: {
    flex: 1,
    color: Colors.black,
    fontSize: 20
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
