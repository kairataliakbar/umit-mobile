import React, { useState, useEffect } from 'react'
import { View, Text, Alert, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import Container from '../atoms/Container'
import WheelFortune from '../organisms/WheelFortune'
import H3 from '../atoms/text/H3'

import Colors from '../../theme/colors'

const participants = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30'
]

const WheelFortuneTemplate = ({ bet }) => {
  const [timer, setTimer] = useState(5)

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000)
    } else {
      handleStartGame()
    }
  }, [timer])

  const wheelOptions = {
    rewards: participants,
    knobSize: 50,
    borderWidth: 5,
    borderColor: '#000',
    innerRadius: 50,
    duration: 4000,
    backgroundColor: 'transparent',
    textAngle: 'horizontal',
    getWinner: (value, index) => {
      this.setState({winnerValue: value, winnerIndex: index})
    },
    onRef: ref => (this.child = ref)
  }

  const getWinner = (values) => Alert.alert(`Победитель ${values}`)

  const handleStartGame = () => this.child._onPress()

  return (
    <Container customStyle={styles.screen}>
      <View style={styles.info}>
        <View style={styles.detailInfo}>
          <Text style={styles.text}>Ставка:</Text>
          <Text style={styles.text}>{bet} тг</Text>
        </View>
        <View style={styles.detailInfo}>
          <Text style={styles.text}>Ваш номер:</Text>
          <Text style={styles.text}>13</Text>
        </View>
      </View>
      <View>
        <H3>Игра начнется через {timer} сек</H3>
      </View>
      <WheelFortune wheelOptions={wheelOptions} getWinner={getWinner} />
    </Container>
  )
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center'
  },
  info: {
    marginVertical: 20,
    width: '80%',
    maxWidth: 400,
  },
  detailInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  text: {
    color: Colors.primary_font,
    fontSize: 20
  }
})

WheelFortuneTemplate.propTypes = {
  bet: PropTypes.number.isRequired
}

export default WheelFortuneTemplate
