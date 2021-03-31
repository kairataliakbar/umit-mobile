import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'

import H3 from '../atoms/text/H3'

import Colors from '../../theme/colors'

const WheelFortuneTemplate = () => {
  return (
    <>
      <H3 propStyles={styles.title}>Ожидание других игроков</H3>
      <ActivityIndicator size="large" color={Colors.primary_font} />
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    width: '80%',
    maxWidth: 400,
    textAlign: 'center',
    marginBottom: 20
  }
})

export default WheelFortuneTemplate
