import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text, ScrollView,
  View, Image, Dimensions, TextInput, TouchableWithoutFeedback,
  ListView, RefreshControl, TouchableHighlight, TouchableOpacity
} from 'react-native';
import { fetcher, ENDPOINT } from '../utils/common'
import Loading from '../components/Loading'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ActionBar from '../components/ActionBar'
import style_text from '../styles/text'
import { COLORS } from '../utils/values'
import { SERIES_RECOM, SERIES_FAV,SERIES_ORIGINAL, SERIES_ORIGINALOTHER,  SERIES_YOUTUBE, SERIES_YOUTUBE_OTHER } from '../utils/data_dummy_2'
const { width } = Dimensions.get('window')

const dsRecom = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsFav = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsOriginal = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsOriginalOther = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsTuber = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsTuberOther = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class TVSeries extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    loadingRecom: false,
    refreshing: false,
    hasMore: true,
    query: '',
    dataSourceRecomen: dsRecom.cloneWithRows([]),
    dataSourceFav: dsFav.cloneWithRows([]),
    dataSourceOriginal: dsOriginal.cloneWithRows([]),
    dataSourceOriginalOther: dsOriginalOther.cloneWithRows([]),
    dataSourceTuber: dsTuber.cloneWithRows([]),
    dataSourceTuberOther: dsTuberOther.cloneWithRows([]),
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    this.setState({
      dataSourceRecomen: dsRecom.cloneWithRows(SERIES_RECOM),
      dataSourceFav: dsFav.cloneWithRows(SERIES_FAV),
      dataSourceOriginal: dsOriginal.cloneWithRows(SERIES_ORIGINAL),
      dataSourceOriginalOther: dsOriginalOther.cloneWithRows(SERIES_ORIGINALOTHER),
      dataSourceTuber: dsTuber.cloneWithRows(SERIES_YOUTUBE),
      dataSourceTuberOther: dsTuberOther.cloneWithRows(SERIES_YOUTUBE_OTHER),
    })
  }

  renderRowSquareOneFull(item, rowID) {
    if (rowID === '0') {
      return(
        <View style={{ flex: 1, flexDirection: 'column', margin: 10, width: 100, height: 120 }} />
      )
    }
    return(
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Watch', { }) }>
        <View style={{ flex: 1, flexDirection: 'column', margin: 5 }}>
          <Image resizeMode={'cover'} source={item.uri} style={{ width: 220, height: 120 }} />
          <Text numberOfLines={1} style={[ style_text.title_list, { color: 'black', padding: 5, backgroundColor: 'white', width: 220 }]}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderRowChannel3(item, rowID) {
    return(
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Watch', { }) }>
        <View style={{ flex: 1, flexDirection: 'column', margin: 5, elevation: 2, backgroundColor: 'white' }}>
          <Image resizeMode={'cover'} source={item.uri} style={{ width: 100, height: 130  }} />
          <Text numberOfLines={1} style={[ style_text.title_list, { color: 'black', padding: 5, backgroundColor: 'white', width: 100 }]}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const state = this.state
    return (
      <View style={styles.root}>
        <View style={[styles.slider, { position: 'absolute', left: 0, top: 50, right: 0 }]}>
          <Image resizeMode={'cover'} source={require('../../assets/images/img_series_flash.jpg')} style={{ width: width, height: 300  }} />
          <LinearGradient colors={[ 'transparent', 'transparent', '#20265c']} style={styles.gradient_highlight}/>
        </View>
        <ActionBar style={{ height: 50}} />
        <ScrollView style={{ flex: 1, paddingTop: 200 }}>
          <View style={{ flex: 1, flexDirection: 'column'}}>
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'transparent' }}>
              <Text style={[style_text.title_list, { padding: 10, width: 500 }]}>RECOMMENDED FOR YOU</Text>
              { state.loadingRecom ? (
                <View style={styles.progress_container}>
                  <View style={styles.progress}>
                    <ActivityIndicator color={'#dc1f1b'} size={'small'} />
                  </View>
                </View>
              ) : (
                <ListView
                  style={styles.list_channel_3}
                  z-index={2}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  enableEmptySections={true}
                  dataSource={this.state.dataSourceRecomen}
                  renderRow={(event, sectionID, rowID) => this.renderRowChannel3(event, rowID)}
                  removeClippedSubviews={false}
                />
              )}
            </View>

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'transparent' }}>
              <Text style={[style_text.title_list, { padding: 10, width: 500, color: 'gray' }]}>TV SERIES FAVORITES THIS WEEK</Text>
              { state.loadingRecom ? (
                <View style={styles.progress_container}>
                  <View style={styles.progress}>
                    <ActivityIndicator color={'#dc1f1b'} size={'small'} />
                  </View>
                </View>
              ) : (
                <ListView
                  style={styles.list_channel_3}
                  z-index={2}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  enableEmptySections={true}
                  dataSource={this.state.dataSourceFav}
                  renderRow={(event, sectionID, rowID) => this.renderRowChannel3(event, rowID)}
                  removeClippedSubviews={false}
                />
              )}
            </View>

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'transparent' }}>
              <View style={[styles.triangleCorner, { borderTopColor: 'red' }]}></View>
              <Text style={[style_text.title_list, { padding: 10, width: 500 }]}>LITE TV ORIGINAL</Text>
              <Image resizeMode={'contain'} source={require('../../assets/images/logo_white.png')} style={{ width: 80, height: 40, position: 'absolute', left: 30, top: 100  }} />
              { state.loadingRecom ? (
                <View style={styles.progress_container}>
                  <View style={styles.progress}>
                    <ActivityIndicator color={'#dc1f1b'} size={'small'} />
                  </View>
                </View>
              ) : (
                <ListView
                  style={styles.list_channel_3}
                  z-index={2}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  enableEmptySections={true}
                  dataSource={this.state.dataSourceOriginal}
                  renderRow={(event, sectionID, rowID) => this.renderRowSquareOneFull(event, rowID)}
                  removeClippedSubviews={false}
                />
              )}
            </View>

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'transparent' }}>
              <Text style={[style_text.title_list, { padding: 10, width: 500 }]}>OTHER LITE TV ORIGINAL</Text>
              { state.loadingRecom ? (
                <View style={styles.progress_container}>
                  <View style={styles.progress}>
                    <ActivityIndicator color={'#dc1f1b'} size={'small'} />
                  </View>
                </View>
              ) : (
                <ListView
                  style={styles.list_channel_3}
                  z-index={2}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  enableEmptySections={true}
                  dataSource={this.state.dataSourceOriginalOther}
                  renderRow={(event, sectionID, rowID) => this.renderRowChannel3(event, rowID)}
                  removeClippedSubviews={false}
                />
              )}
            </View>

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'transparent' }}>
              <View style={[styles.triangleCorner, { borderTopColor: '#854442' }]}></View>
              <Text style={[style_text.title_list, { padding: 10, width: 500 }]}>LITE TUBER</Text>
              <Image resizeMode={'contain'} source={require('../../assets/images/logo_white.png')} style={{ width: 80, height: 40, position: 'absolute', left: 30, top: 100  }} />
              { state.loadingRecom ? (
                <View style={styles.progress_container}>
                  <View style={styles.progress}>
                    <ActivityIndicator color={'#dc1f1b'} size={'small'} />
                  </View>
                </View>
              ) : (
                <ListView
                  style={styles.list_channel_3}
                  z-index={2}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  enableEmptySections={true}
                  dataSource={this.state.dataSourceTuber}
                  renderRow={(event, sectionID, rowID) => this.renderRowSquareOneFull(event, rowID)}
                  removeClippedSubviews={false}
                />
              )}
            </View>

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'transparent' }}>
              <Text style={[style_text.title_list, { padding: 10, width: 500 }]}>OTHER LITE TUBER</Text>
              { state.loadingRecom ? (
                <View style={styles.progress_container}>
                  <View style={styles.progress}>
                    <ActivityIndicator color={'#dc1f1b'} size={'small'} />
                  </View>
                </View>
              ) : (
                <ListView
                  style={styles.list_channel_3}
                  z-index={2}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  enableEmptySections={true}
                  dataSource={this.state.dataSourceTuberOther}
                  renderRow={(event, sectionID, rowID) => this.renderRowChannel3(event, rowID)}
                  removeClippedSubviews={false}
                />
              )}
            </View>

            <View style={{ height: 200, backgroundColor: 'transparent' }} />

          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 50,
    backgroundColor: '#dddddd'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20, fontWeight: 'bold', fontFamily: 'AvenirNext-Regular', padding: 20
  },
  subtitle: {
    fontSize: 15, fontWeight: 'bold', fontFamily: 'AvenirNext-Regular', padding: 20
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  list: {
    flex: 1, height: 200
  },
  article_title_container: {
    position: 'absolute', bottom: 20
  },
  article_title: {
    backgroundColor: 'transparent', color: 'white', fontSize: 14, fontFamily: 'AvenirNext-Regular', paddingLeft: 10, paddingRight: 20
  },
  progress_container: {
    flex: 1, width: 200, height: 200, alignSelf: 'center'
  },
  progress: {
    position: 'absolute',
    left: 75,
    top: 75,
    width: 50,
    height: 50
  },
  gradient_container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: 'transparent',
    position: 'absolute',
    width: width,
    height: 200
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  gradient_highlight: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 600
  },
  title_highlight: {
    color: 'white', fontSize: 20, padding: 10
  },
  list_channel_3: {
    flex: 1, height: 180, paddingLeft: 0
  },
  triangleCorner: {
    position: 'absolute',
    top:0,
    left:0,
    width: width,
    height: 120,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 200,
    borderTopWidth: 440,
    borderRightColor: 'transparent'
  },
});

export default TVSeries
