import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/home'
import Game from '../screens/game'

import Signin from '../screens/auth/Signin'
import Signup from '../screens/auth/Signup'

const Stack = createStackNavigator()

const Navigation = () => {
  const isUserSignin = true

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isUserSignin ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Game" component={Game} />
          </>
        ) : (
          <>
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
