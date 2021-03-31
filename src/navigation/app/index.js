/* eslint-disable react/display-name */
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import PropTypes from 'prop-types'

import Home from '../../screens/home'
import Game from '../../screens/game'

import CustomHeaderButton from '../../components/atoms/buttons/CustomHeaderButton'

import Colors from '../../theme/colors'

const Stack = createStackNavigator()

const AppNavigation = ({ navigation }) => {
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
    },
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={navigationOptions} />
      <Stack.Screen name="Game" component={Game} options={navigationOptions} />
    </Stack.Navigator>
  )
}

AppNavigation.propTypes = {
  navigation: PropTypes.shape({
    toggleDrawer: PropTypes.func.isRequired
  }).isRequired
}

export default AppNavigation
