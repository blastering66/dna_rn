import { StyleSheet } from 'react-native'
import { COLORS } from '../utils/values'
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container_bottom: {
    height: 40,
    backgroundColor: COLORS.colorAppTheme,
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    bottom: 0
  },
  container_bg_bottom: {
    height: 200,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 50
  },
  container_bg_top: {
    height: 100,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0
  },
  container_signup: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 30
  },
  logo_black: {
    width: 120,
    height: 60,
    alignSelf: 'center'
  }
})
