import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity, Dimensions, StyleSheet, View } from 'react-native'
const { width } = Dimensions.get('window')
import { COLORS } from '../utils/values'
import style_text from '../styles/text'

class Button extends React.Component {
  static propTypes = {
    pressed: PropTypes.bool,
    style: PropTypes.object
  }

  render() {
    const { title, pressed } = this.props
    return (
      <TouchableOpacity
        {...this.props}
        >
        <View
          {...this.props}
          style={[styles.container, this.props.style]}>
          <Text style={[style_text.title, { padding: 10 }]}>
          {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.button
  }
})

export default Button
