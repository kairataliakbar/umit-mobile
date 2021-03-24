import React from 'react'
import { StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'

import Container from '../../components/Container'
import H3 from '../../components/Text/H3'

import Colors from '../../theme/colors'

const Wait = ({ route }) => {
  const { bet } = route.params

  return (
    <Container customStyle={styles.screen}>
      <H3>Ожидание других участников</H3>
      <Text style={{ color: Colors.primary_font }}>{bet}</Text>
    </Container>
  )
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

Wait.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      bet: PropTypes.number
    })
  })
}

export default Wait
