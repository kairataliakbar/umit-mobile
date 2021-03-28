/* eslint-disable react/display-name */
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import PropTypes from 'prop-types'

import Signup from '../../screens/signup'

import CustomHeaderButton from '../../components/CustomHeaderButton'

import Colors from '../../theme/colors'

const Stack = createStackNavigator()

const SignupNavigation = ({ navigation }) => {
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
      <Stack.Screen name="Signup" component={Signup} options={navigationOptions} />
    </Stack.Navigator>
  )
}

SignupNavigation.propTypes = {
  navigation: PropTypes.shape({
    toggleDrawer: PropTypes.func.isRequired
  }).isRequired
}

export default SignupNavigation