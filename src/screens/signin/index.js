import React, { useLayoutEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import Container from '../../components/atoms/Container'
import H1 from '../../components/atoms/text/H1'
import SigninForm from '../../components/organisms/forms/SigninForm'

const Signin = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: ''
    })
  }, [navigation])

  const handleSubmit = (data) => {
    console.log(data)
  }

  return (
    <Container customStyle={styles.screen}>
      <H1 propStyles={styles.title}>Вход</H1>
        
      <View style={styles.form}>
        <SigninForm onSubmit={handleSubmit} />
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
  form: {
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
