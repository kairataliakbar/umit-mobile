import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import PropTypes from 'prop-types'

import Login from '../screens/auth/login'
import Signup from '../screens/auth/signup'
import Home from '../screens/home'
import Game from '../screens/game'

import Colors from '../theme/colors'

const Stack = createStackNavigator()

const AppNavigation = ({ token }) => {
  const navigationOptions = {
    headerStyle: {
      backgroundColor: Colors.secondary_bg,
      shadowRadius: 0,
      shadowOffset: {
        height: 0
      }
    },
    headerTintColor: Colors.third_font,
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={navigationOptions}
            />
            <Stack.Screen
              name="Game"
              component={Game}
              options={navigationOptions}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={navigationOptions}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={navigationOptions}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

AppNavigation.propTypes = {
  token: PropTypes.string
}

export default AppNavigation
