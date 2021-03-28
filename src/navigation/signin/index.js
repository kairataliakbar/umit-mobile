/* eslint-disable react/display-name */
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import PropTypes from 'prop-types'

import Signin from '../../screens/signin'

import CustomHeaderButton from '../../components/CustomHeaderButton'

import Colors from '../../theme/colors'

const Stack = createStackNavigator()

const SigninNavigation = ({ navigation }) => {
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
      <Stack.Screen name="Signin" component={Signin} options={navigationOptions} />
    </Stack.Navigator>
  )
}

SigninNavigation.propTypes = {
  navigation: PropTypes.shape({
    toggleDrawer: PropTypes.func.isRequired
  }).isRequired
}

export default SigninNavigation