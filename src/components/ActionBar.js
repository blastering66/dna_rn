import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity, Dimensions, StyleSheet, View, Image } from 'react-native'
const { width } = Dimensions.get('window')
import { COLORS } from '../utils/values'
import Ionicons from 'react-native-vector-icons/Ionicons'
import style_text from '../styles/text'
import style_compound from '../styles/compound'

class ActionBar extends React.Component {
  static propTypes = {
    style: PropTypes.object
  }

  render() {
    // const { style } = this.props
    return (
      <View
        {...this.props}
        style={[styles.container, this.props.style]}>

        <Image resizeMode={'contain'} style={{ position: 'absolute', left: 10, top: 5, width: 80, height: 20, margin: 10 }} source={require('../../assets/images/logo_white.png')} />

        <View style={{ position: 'absolute', right: 10, top: 0, flexDirection: 'row' }}>
          <Ionicons name="md-notifications" style={style_compound.inputbox_img} size={25} color={"white"} />
          <Ionicons name="md-search" style={style_compound.inputbox_img} size={25} color={"white"} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: COLORS.actionBarColor
  }
})

export default ActionBar
