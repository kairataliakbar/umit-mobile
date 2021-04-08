import React from 'react'
import { StyleSheet, Text } from 'react-native'

import Container from '../../components/atoms/Container'

import Colors from '../../theme/colors'

const Profile = () => {
  return (
    <Container customStyle={styles.screen}>
      <Text>Profile</Text>
    </Container>
  )
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: Colors.third_font
  }
})

export default Profile
