import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import Container from '../../components/Container'
import H1 from '../../components/Text/H1'
import Input from '../../components/inputs/Input'

const Signin = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: ''
    })
  }, [navigation])

  return (
    <Container customStyle={styles.screen}>
      <H1 propStyles={styles.title}>Вход</H1>
        
      <View style={styles.actions}>
        <Input
          placeholder="Почта"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Input
          placeholder="Пароль"
          secureTextEntry
        />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginBottom: 30
  },
  actions: {
    maxWidth: 400,
    width: '80%'  
  }
})

Signin.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func
  })
}

export default Signin
