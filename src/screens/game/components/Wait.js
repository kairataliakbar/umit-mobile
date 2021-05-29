import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'

import Container from '../../../components/Container'
import H3 from '../../../components/text/H3'

import Colors from '../../../theme/colors'

const Wait = () => {
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
    justifyContent: 'center',
    width: '80%',
    maxWidth: 400
  },
  title: {
    textAlign: 'center',
    marginBottom: 30
  }
})

export default Wait
