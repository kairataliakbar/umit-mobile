import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'

import Container from '../atoms/Container'
import H3 from '../atoms/text/H3'

import Colors from '../../theme/colors'

const WheelFortuneTemplate = () => {
  return (
    <Container customStyle={styles.screen}>
      <H3 propStyles={styles.title}>Ожидание других игроков</H3>
      <ActivityIndicator size="large" color={Colors.primary_font} />
    </Container>
  )
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    width: '80%',
    maxWidth: 400,
    textAlign: 'center',
    marginBottom: 20
  }
})

export default WheelFortuneTemplate
