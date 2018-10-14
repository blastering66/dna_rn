import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Platform,
  StyleSheet,
  Text,
  View, Image,
  ListView, RefreshControl, TouchableHighlight
} from 'react-native';
import { TabNavigator } from 'react-navigation'
import { fetcher, ENDPOINT } from '../utils/common'
import Loading from '../components/Loading'
import Ionicons from 'react-native-vector-icons/Ionicons'
import TopStories from './TopStories'
import LiveTV from './LiveTV'
import TVSeries from './TVSeries'
import Books from './Books'
import Profile from './Profile'
import style_icons from '../styles/icons'

import { isIphoneX, debounce } from '../utils/common'

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {
    loading: false
  }

  componentDidMount() {
  }

  render() {
    const { navigation } = this.props
    return (
      <MainTab navigation={navigation} />
    )
  }
}

const MainTab = TabNavigator({
  LiveTv: {
    screen: LiveTV,
    navigationOptions: {
      tabBarLabel: 'Live Tv',
      tabBarIcon: ({ focused, tintColor }) =>
      <Image resizeMode={'contain'} source={require('../../assets/icons/ico_live_tv.png')} style={style_icons.menu_bottom} />
    }
  },
  TVSeries: {
    screen: TVSeries,
    navigationOptions: {
      tabBarLabel: 'TV Series',
      tabBarIcon: ({ focused, tintColor }) =>
      <Image resizeMode={'contain'} source={require('../../assets/icons/ico_series_tv.png')} style={style_icons.menu_bottom} />
    },
    tabBarOnPress: ({ scene, jumpToIndex, previousScene }) => {
      const { route, index } = scene
      if (route.key === previousScene.key) {
        route.params.scrollToTop()
      }
      jumpToIndex(index)
    }
  },
  TopStories: {
    screen: TopStories,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ focused, tintColor }) =>
      <Image resizeMode={'contain'} source={require('../../assets/icons/ico_home.png')} style={style_icons.menu_bottom} />
    },
    tabBarOnPress: ({ scene, jumpToIndex, previousScene }) => {
      const { route, index } = scene
      if (route.key === previousScene.key) {
        route.params.scrollToTop()
      }
      jumpToIndex(index)
    }
  },
  Books: {
    screen: Books,
    navigationOptions: {
      tabBarLabel: 'Catch Up',
      tabBarIcon: ({ focused, tintColor }) =>
      <Image resizeMode={'contain'} source={require('../../assets/icons/ico_catchup.png')} style={style_icons.menu_bottom} />
    },
    tabBarOnPress: ({ scene, jumpToIndex, previousScene }) => {
      const { route, index } = scene
      if (route.key === previousScene.key) {
        route.params.scrollToTop()
      }
      jumpToIndex(index)
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'More',
      tabBarIcon: ({ focused, tintColor }) =>
      <Image resizeMode={'contain'} source={require('../../assets/icons/ico_menu_more.png')} style={style_icons.menu_bottom_more} />
    }
  }
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#dc1f1b',
    inactiveTintColor: '#a5a5a5',
    upperCaseLabel: false,
    showIcon: true,
    showLabel: true,
    style: {
      borderTopWidth: 1,
      borderTopColor: '#e6e7e9',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      maxHeight: 50,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: isIphoneX() ? -34 : 0
    },
    labelStyle: {
      fontSize: 8,
      fontFamily: 'AvenirNext-Regular',
      top: -10
    },
    indicatorStyle: {
      backgroundColor: 'transparent'
    },
    iconStyle: {
      width: 25,
      height: 25
    }
  },
  swipeEnabled: false,
  lazyLoad: true,
  initialRouteName: 'TopStories'
})

Home.router = MainTab.router

export default Home
