import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Image, Share, Alert, ToastAndroid, ActivityIndicator, WebView, RefreshControl, TouchableWithoutFeedback, StatusBar, TouchableOpacity, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { fetcher, ENDPOINT } from '../utils/common'
import Loading from '../components/Loading'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Video from 'react-native-video'
import Orientation from 'react-native-orientation'
import style_icons from '../styles/icons'

class Watch extends Component {

  static navigationOptions = {
    header: null
  }

  state = {
    article: {},
    index: 1,
    loading: true,
    buffering: true,
    refreshing: false,
    hasMore: true,
    pauseStatus: false,
    showOverlay: false,
    webUrl: '',
    type: ''
  }


  componentDidMount() {
    Orientation.lockToLandscape()
    // this.setState({ webUrl: "http://tvku.live:8888/live/9o9D2yrxKB/PHzaXo9PrG/99.ts", type : '' })

    // const randomUrlIndex = Math.floor(Math.random() * 100)
    // console.log('randomUrlIndex', randomUrlIndex)
    // // webUrl = "http://iptv.pnormalindo.tk/e007/celestial"
    // console.log('randomUrlIndex % 2', randomUrlIndex % 2)
    // if (randomUrlIndex % 2 === 1) {
    //   this.setState({ webUrl: "http://tvku.live:8888/live/9o9D2yrxKB/PHzaXo9PrG/99.ts", type : '' })
    // } else {
    //   // this.setState({ webUrl: "http://unggulmetalindo.com/resources/video/mission.mp4", type : '' })
    //   this.setState({ webUrl: "http://tvku.live:8888/live/9o9D2yrxKB/PHzaXo9PrG/99.ts", type : '' })
    // }

  }

  componentWillUnmount() {
    Orientation.lockToPortrait()
  }

  _onLoadEnd() {
    this.setState({ loading: false });
  }

  renderLoading() {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center' }}>
        <View style={{ alignSelf: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
          <ActivityIndicator color={'gray'} size={'small'} />
        </View>
      </View>
    )
  }

  hideOverlay() {
    console.log('hide overlay started')
    // setTimeout(() => this.setState({ showOverlay: false }), 3000)
  }

  onBuffer = (response) => {
    console.log('Buffering', response)
    this.setState({ buffering: response.isBuffering })
  }

  videoError = (response) => {
    console.log('Video Error', response)
    console.log('url', this.state.webUrl)
    console.log('type', this.state.type)
    Alert.alert(response.error.errorString)
  }

  render() {
    const self = this
    const state = this.state

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <TouchableWithoutFeedback style={styles.backgroundVideo} onPress={() => self.setState({ showOverlay: true }, () => console.log(state.showOverlay))}>
          <Video
            posters={'https://baconmockup.com/300/200/'}
            paused={state.pauseStatus}
            controls={true}
            source={{ uri: "http://tvku.live:8888/live/9o9D2yrxKB/PHzaXo9PrG/99.ts" }}
            ref={(ref) => {
             this.player = ref
            }}
             onBuffer={self.onBuffer}
             onError={self.videoError}
             style={styles.backgroundVideo} />
         </TouchableWithoutFeedback>

         { state.showOverlay ? (
           <View style={styles.overlay}>
              <TouchableWithoutFeedback onPress={() => self.setState({ showOverlay: false }, () => console.log('showOverlay', state.showOverlay))}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <Image resizeMode={'contain'} source={require('../../assets/icons/ico_backward.png')} style={style_icons.menu_overlay_backward} />
                  <TouchableOpacity onPress={() => self.setState({ pauseStatus: !state.pauseStatus }, () => self.hideOverlay())}>
                    <Image resizeMode={'contain'} source={state.pauseStatus ? require('../../assets/icons/ico_pause.png') : require('../../assets/icons/ico_play.png')} style={style_icons.menu_overlay_middle} />
                  </TouchableOpacity>
                  <Image resizeMode={'contain'} source={require('../../assets/icons/ico_forward.png')} style={style_icons.menu_overlay_forward} />
                </View>
              </TouchableWithoutFeedback>

           </View>
         ) : null }

         { state.buffering ? (
           <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center' }}>
             <View style={{ alignSelf: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
               <ActivityIndicator color={'gray'} size={'small'} />
             </View>
           </View>
         ) : null }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  backgroundVideo: {
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: { position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, backgroundColor: 'rgba(137, 127, 128, 0.6)' },

});

export default Watch
const connectedSuperMan = connect(state => ({ title: state.article.title }))(Watch)
