import React, { Component } from 'react'
import { Dimensions, Platform, StyleSheet, Text, View, Image, Share, Alert, ToastAndroid, ActivityIndicator, WebView, RefreshControl, TouchableWithoutFeedback, StatusBar, TouchableOpacity, TouchableHighlight, ListView } from 'react-native'
import { connect } from 'react-redux'
import { fetcher, ENDPOINT } from '../utils/common'
import Loading from '../components/Loading'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Video from 'react-native-video'
import Orientation from 'react-native-orientation'
import style_icons from '../styles/icons'
import style_text from '../styles/text'
import { COLORS } from '../utils/values'
import { CHANNEL_LIVETV_ALL } from '../utils/data_dummy_2'
import { URL_TV } from '../utils/url_videos'
const { width, height } = Dimensions.get('window')
import Img from '../utils/img/index'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class Detail extends Component {

  static navigationOptions = {
    header: null
  }

  state = {
    article: {},
    url: URL_TV[3].sources[0],
    dataSource: ds.cloneWithRows([]),
    index: 1,
    loading: true,
    buffering: false,
    refreshing: false,
    hasMore: true,
    pauseStatus: false,
    showOverlay: false,
    isFullscreen: false,
    webUrl: '',
    type: ''
  }

  componentDidMount() {
    Orientation.lockToPortrait()
  }

  componentWillMount() {
    const params = this.props.navigation.state.params
    console.log('params', params)
    this.setState({
      dataSource: ds.cloneWithRows(params.data)
    })
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

  setFullscreen() {
    this.setState({ isFullscreen: !this.state.isFullscreen }, () => {
      if (this.state.isFullscreen) {
        Orientation.lockToLandscape()
      } else {
        Orientation.lockToPortrait()
      }
    })
  }

  hideOverlay() {
    this.setState({ showOverlay: false })
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

  changeChannel(url) {
    if (url === '') {
      this.setState({ url: URL_TV[3].sources[0] }, () => console.log('url', this.state.url))
    } else {
      this.setState({ url: URL_TV[4].sources[0] }, () => console.log('url', this.state.url))
    }
  }

  renderRowList(item, rowID) {
    let uri2 = null
    console.log('uri ', item.uri)
    switch (item.uri) {
      case 11: uri2 = Img.local.thumbnail_1; break;
      case 12: uri2 = Img.local.thumbnail_2; break;
      case 13: uri2 = Img.local.thumbnail_3; break;
      case 14: uri2 = Img.local.thumbnail_4; break;
      case 21: uri2 = Img.reality.thumbnail_1; break;
      case 22: uri2 = Img.reality.thumbnail_2; break;
      case 23: uri2 = Img.reality.thumbnail_3; break;
      case 24: uri2 = Img.reality.thumbnail_4; break;
      case 31: uri2 = Img.sport.thumbnail_1; break;
      case 32: uri2 = Img.sport.thumbnail_2; break;
      case 33: uri2 = Img.sport.thumbnail_3; break;
      case 34: uri2 = Img.sport.thumbnail_4; break;
      case 41: uri2 = Img.entertainment.thumbnail_1; break;
      case 42: uri2 = Img.entertainment.thumbnail_2; break;
      case 43: uri2 = Img.entertainment.thumbnail_3; break;
      case 44: uri2 = Img.entertainment.thumbnail_4; break;
      case 51: uri2 = Img.kids.thumbnail_1; break;
      case 52: uri2 = Img.kids.thumbnail_2; break;
      case 53: uri2 = Img.kids.thumbnail_3; break;
      case 54: uri2 = Img.kids.thumbnail_5; break;
      default: uri2 = Img.local.thumbnail_1
    }
    return (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableWithoutFeedback onPress={() => {
          if (rowID % 2 == 0) {
            const result = rowID % 2
            console.log('rowID % 2', result)
            this.changeChannel('')
          } else {
            const result = rowID % 2
            console.log('rowID % 2 b', result)
            this.changeChannel('asd')
          }

        } }>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', margin: 5, backgroundColor: 'white', borderBottomColor: '#dddddd', borderBottomWidth: 1, paddingBottom: 5 }}>
            <Image resizeMode={'cover'} source={uri2} style={{ width: 50, height: 50 }} />
            <Text numberOfLines={1} style={[ style_text.title_list, { flex: 1, color: 'black', paddingLeft: 10 }]}>{item.title}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
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
            source={{ uri: this.state.url }}
            paused={state.pauseStatus}
            controls={true}
            ref={(ref) => {
             this.player = ref
            }}
             onBuffer={self.onBuffer}
             onError={self.videoError}
             style={state.isFullscreen ? styles.backgroundVideoFullscreen : styles.backgroundVideo} />
         </TouchableWithoutFeedback>

         { !state.isFullscreen ? (
           <View style={{ flexDirection: 'column' }}>
             <View style={{ backgroundColor: 'rgba(221, 221, 221, 0.6)', padding: 10 }}>
              <Text style={[style_text.title_list, { color: 'black' }]} >CHANNELS</Text>
             </View>
             <ListView
               style={[styles.list_channel_3, { }]}
               z-index={2}
               enableEmptySections={true}
               dataSource={this.state.dataSource}
               renderRow={(event, sectionID, rowID) => this.renderRowList(event, rowID)}
               removeClippedSubviews={false}
             />
           </View>
         ) : null }

         { state.showOverlay ? (
           <TouchableWithoutFeedback onPress={() => this.setState({ showOverlay: false })}>
             <View style={state.isFullscreen ? styles.overlayFullscreen : styles.overlay}>
                <TouchableWithoutFeedback onPress={() => self.setState({ showOverlay: false }, () => console.log('showOverlay', state.showOverlay))}>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => self.setState({ pauseStatus: !state.pauseStatus }, () => {
                      self.hideOverlay()
                      console.log('hideOverlay')
                    })}>
                      <Image resizeMode={'contain'} source={state.pauseStatus ? require('../../assets/icons/ico_pause.png') : require('../../assets/icons/ico_play.png')} style={style_icons.menu_overlay_middle_small} />
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableOpacity style={{ position: 'absolute', bottom: 10, right: 0 }}
                onPress={() => {
                  self.setFullscreen()
                }}>
                  <Ionicons name="md-qr-scanner" color={'white'} size={30} style={style_icons.menu_overlay_fullscreen} />
                </TouchableOpacity>

                <TouchableOpacity style={{ position: 'absolute', top: 10, left: 20 }}
                onPress={() => {
                  this.props.navigation.goBack(null)
                }}>
                  <Ionicons name="ios-arrow-back" color={'white'} size={35} style={style_icons.menu_overlay_fullscreen} />
                </TouchableOpacity>
             </View>
           </TouchableWithoutFeedback>
         ) : null }

         { this.state.buffering ? (
           <View style={styles.overlay}>
              <TouchableWithoutFeedback onPress={() => self.setState({ showOverlay: false }, () => console.log('showOverlay', state.showOverlay))}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <Image resizeMode={'contain'} source={require('../../assets/icons/loader_circle.gif')} style={style_icons.menu_overlay_middle_small} />
                </View>
              </TouchableWithoutFeedback>
           </View>
         ) : null }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  backgroundVideo: {
    backgroundColor: 'black',
    height: 200
  },
  backgroundVideoFullscreen: {
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  overlay: { alignItems: 'center', position: 'absolute', top: 0, right: 0, left: 0, bottom: height - 200, backgroundColor: 'rgba(137, 127, 128, 0.6)' },
  overlayFullscreen: { alignItems: 'center', position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, backgroundColor: 'rgba(137, 127, 128, 0.6)' },
});

export default Detail
const connectedSuperMan = connect(state => ({ title: state.article.title }))(Detail)
