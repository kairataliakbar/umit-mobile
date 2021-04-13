/* eslint-disable react/display-name */
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import PropTypes from 'prop-types'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import Login from '../screens/auth/login'
import Signup from '../screens/auth/signup'
import Home from '../screens/home'
import Game from '../screens/game'

import CustomHeaderButton from '../components/atoms/buttons/CustomHeaderButton'
import Colors from '../theme/colors'

const Stack = createStackNavigator()

const AppNavigation = ({ token, onLogin, onLogout }) => {
  const navigationOptions = {
    headerTitle: '',
    headerBackTitle: 'Назад',
    headerTintColor: Colors.third_font,
    headerStyle: {
      backgroundColor: Colors.secondary_bg,
      shadowRadius: 0,
      shadowOffset: {
        height: 0
      }
    }
  }

  const homeNavigationOptions = {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Exit"
          iconName="exit-outline"
          onPress={() => onLogout()}
        />
      </HeaderButtons>
    )
  }

  const LoginComponent = (props) => <Login onLogin={onLogin} {...props} />

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                ...navigationOptions,
                ...homeNavigationOptions
              }}
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
              component={LoginComponent}
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
  token: PropTypes.string,
  onLogin: PropTypes.func,
  onLogout: PropTypes.func
}

export default AppNavigation
