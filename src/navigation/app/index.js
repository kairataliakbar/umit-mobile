import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Home from './home'
import Profile from '../../screens/profile'

import Color from '../../theme/colors'

const Drawer = createDrawerNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
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
          name="Home"
          component={Home}
          options={{ drawerLabel: 'Главная' }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{ drawerLabel: 'Профиль' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
