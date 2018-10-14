import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity, Dimensions, StyleSheet, View } from 'react-native'
const { width } = Dimensions.get('window')
import { COLORS } from '../utils/values'
import style_text from '../styles/text'

class Bar extends React.Component {
  static propTypes = {
    style: PropTypes.object
  }

  render() {
    return (
      <View
        {...this.props.style}
        style={{ width: 35, height: 5, backgroundColor: '#ddd', alignSelf: 'center', borderRadius: 15 }} />
    )
  }
}

export default Bar
