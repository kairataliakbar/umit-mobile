import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import PropTypes from 'prop-types'

import Colors from '../../../theme/colors'

const CustomHeaderButton = (props) => {
  const { color = Colors.third_font, size = 24, ...rest } = props
  return (
    <HeaderButton
      IconComponent={Ionicons}
      iconSize={size}
      color={color}
      {...rest}
    />
  )
}

CustomHeaderButton.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number
}

export default CustomHeaderButton
