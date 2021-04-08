/* eslint-disable react/display-name */
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../../screens/auth/login'
import Signup from '../../screens/auth/signup'

const Stack = createStackNavigator()

const SigninNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  )
}

export default SigninNavigation
