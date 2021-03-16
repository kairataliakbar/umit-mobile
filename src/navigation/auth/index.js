import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Signin from '../../screens/auth/Signin'
import Signup from '../../screens/auth/Signup'

import Colors from '../../theme/colors'

const Stack = createStackNavigator()

const AuthNavigation = () => {
  const navigationOptions = {
    headerStyle: {
      backgroundColor: Colors.primary_bg
    },
    headerTintColor: Colors.secondary_font,
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Signin" component={Signin} options={navigationOptions} />
      <Stack.Screen name="Signup" component={Signup} options={navigationOptions} />
    </Stack.Navigator>
  )
}

export default AuthNavigation
