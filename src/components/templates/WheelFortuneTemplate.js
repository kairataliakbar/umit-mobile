import React from 'react'
import { Text, Button } from 'react-native'
import PropTypes from 'prop-types'

import WheelFortune from '../organisms/WheelFortune'

const participants = [
  '%10',
  '%20',
  '%30',
  '%40',
  '%50',
  '%60',
  '%70',
  '%90',
  'FREE'
]

const WheelFortuneTemplate = ({ bet }) => {
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

  const getWinner = (values) => console.log(values, 'get winner')

  return (
    <>
      <Text style={{ color: 'white' }}>Игра началась</Text>
      <Text style={{ color: 'white' }}>{bet}</Text>
      <WheelFortune wheelOptions={wheelOptions} getWinner={getWinner} />
      <Button
        title="Press me"
        onPress={() => {
          this.child._onPress()
        }}
      />
    </>
  )
}

WheelFortuneTemplate.propTypes = {
  bet: PropTypes.number.isRequired
}

export default WheelFortuneTemplate
