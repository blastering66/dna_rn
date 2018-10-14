import { StyleSheet, Dimensions } from 'react-native'

const SCREENWIDTH = (Dimensions.get('window').width)
const SCREENHEIGHT = (Dimensions.get('window').height)

export default StyleSheet.create({
  menu_bottom: {
    flex: 1, width: 30, height: 30
  },
  menu_bottom_more: {
    flex: 1, width: 30, height: 30, margin: 5
  },
  // menu_overlay_backward: {
  //   flex: 1, width: 80, height: 80, position: 'absolute', left: 50, top: (SCREENWIDTH / 2) - 50
  // },
  // menu_overlay_forward: {
  //   flex: 1, width: 80, height: 80, position: 'absolute', right: 50, top: (SCREENWIDTH / 2) - 50
  // },
  // menu_overlay_middle: {
  //   flex: 1, width: 80, height: 80, alignSelf: 'center'
  // },
  menu_overlay_backward: {
    flex: 1, width: 80, height: 80
  },
  menu_overlay_forward: {
    flex: 1, width: 80, height: 80
  },
  menu_overlay_middle: {
    flex: 1, width: 80, height: 80
  },
  menu_overlay_middle_small: {
    flex: 1, width: 40, height: 40
  },
  menu_overlay_fullscreen: {
    width: 40, height: 40
  },
  menu_overlay_middle_big: {
    flex: 1, width: 80, height: 80
  },
})
