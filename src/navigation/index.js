/* eslint-disable react/display-name */
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import PropTypes from 'prop-types'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import Login from '../screens/auth/login'
import Signup from '../screens/auth/signup'
import Home from '../screens/home'
import Game from '../screens/game'

import CustomHeaderButton from '../components/buttons/CustomHeaderButton'
import Colors from '../theme/colors'
import AuthContext from '../theme/AuthContext'

const Stack = createStackNavigator()

const AppNavigation = ({ token }) => {
  const { onLogout } = useContext(AuthContext)

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
