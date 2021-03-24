import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Signin from './signin'
import Signup from './signup'
import App from './app'

import Color from '../theme/colors'

const Drawer = createDrawerNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="App"
        drawerPosition="right"
        drawerStyle={{
          backgroundColor: Color.secondary_bg
        }}
        drawerContentOptions={{
          inactiveTintColor: Color.primary_font,
          activeTintColor: Color.primary_font
        }}
      >
        <Drawer.Screen
          name="App"
          component={App}
          options={{ drawerLabel: 'Главная' }}
        />
        <Drawer.Screen
          name="Signin"
          component={Signin}
          options={{ drawerLabel: 'Вход' }}
        />
        <Drawer.Screen
          name="Signup"
          component={Signup}
          options={{ drawerLabel: 'Регистрация' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
