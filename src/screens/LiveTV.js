import React, { Component } from 'react';
import {
  Platform, Modal,
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
import { LIVE_TV, SERIES_RECOM, SERIES_FAV,SERIES_ORIGINAL, SERIES_ORIGINALOTHER,  SERIES_YOUTUBE, SERIES_YOUTUBE_OTHER } from '../utils/data_dummy_2'
import { LOCAL, SPORTS, REALITY, ORIGINAL_SERIES, KIDS } from '../utils/data_dummy'
import { LIVE_TV_LOCAL, LIVE_TV_REALITY, LIVE_TV_ENTERTAINMENT, LIVE_TV_SPORT, LIVE_TV_KIDS } from '../utils/data_dummy_3'
const { width } = Dimensions.get('window')
import Img from '../utils/img/index'
const dsRecom = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsLocal = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsReality = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsSport = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsEntertainment = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsKids = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsMusic = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsRomance = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
let myChunk = []
let myChunkLOCAL = []
let myChunkREALITY = []
let myChunkSPORTS = []
let myChunkORIGINAL_SERIES = []
let myChunkORIGINAL_KIDS = []
let myChunkORIGINAL_MUSIC = []
let myChunkORIGINAL_ROMANCE = []
const temporaryArray = []
const temporaryArrayLOCAL = []
const temporaryArrayREALITY = []
const temporaryArraySPORTS = []
const temporaryArrayORIGINAL_SERIES = []
const temporaryArrayORIGINAL_KIDS = []
const temporaryArrayMUSIC = []
const temporaryArrayROMANCE = []

class LiveTV extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    modalFilter: false,
    selectedCategory: 'Local',
    loadingRecom: false,
    refreshing: false,
    hasMore: true,
    query: '',
    dataSourceRecomen: dsRecom.cloneWithRows([]),
    dataSourceLocal: dsLocal.cloneWithRows([]),
    dataSourceReality: dsReality.cloneWithRows([]),
    dataSourceSport: dsSport.cloneWithRows([]),
    dataSourceEntertainment: dsEntertainment.cloneWithRows([]),
    dataSourceKids: dsKids.cloneWithRows([]),
    dataSourceMusic: dsMusic.cloneWithRows([]),
    dataSourceRomance: dsRomance.cloneWithRows([]),
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    const newArrs = LIVE_TV_LOCAL

    let i = 0
    const arrayLength = newArrs.length
    for (i; i < arrayLength; i += 2) {
      myChunk = newArrs.slice(i, i + 2)
      temporaryArray.push(myChunk)
    }
    this.setState({
      dataSourceRecomen: dsRecom.cloneWithRows(temporaryArray),
      selectedDS: dsRecom.cloneWithRows(temporaryArray)
    })

    const newArrsLOCAL = LIVE_TV_LOCAL
    let j= 0
    const arrayLengthLOCAL = newArrsLOCAL.length
    for (j; j < arrayLengthLOCAL; j += 2) {
      myChunkLOCAL = newArrsLOCAL.slice(j, j + 2)
      temporaryArrayLOCAL.push(myChunkLOCAL)
    }

    const newArrsREALITY = LIVE_TV_REALITY
    let k = 0
    const arrayLengthREALITY = newArrsREALITY.length
    for (k; k < arrayLengthREALITY; k += 2) {
      myChunkREALITY = newArrsREALITY.slice(k, k + 2)
      temporaryArrayREALITY.push(myChunkREALITY)
    }

    const newArrsSPORTS = LIVE_TV_SPORT
    let l = 0
    const arrayLengthSPORTS = newArrsSPORTS.length
    for (l; l < arrayLengthSPORTS; l += 2) {
      myChunkSPORTS = newArrsSPORTS.slice(l, l + 2)
      temporaryArraySPORTS.push(myChunkSPORTS)
    }

    const newArrsORIGINAL_SERIES = LIVE_TV_ENTERTAINMENT
    let m = 0
    const arrayLengthORIGINAL_SERIES = newArrsORIGINAL_SERIES.length
    for (m; m < arrayLengthORIGINAL_SERIES; m += 2) {
      myChunkORIGINAL_SERIES = newArrsORIGINAL_SERIES.slice(m, m + 2)
      temporaryArrayORIGINAL_SERIES.push(myChunkORIGINAL_SERIES)
    }

    const newArrsKIDS = LIVE_TV_KIDS
    let n = 0
    const arrayLengthORIGINAL_KIDS = newArrsKIDS.length
    for (n; n < arrayLengthORIGINAL_KIDS; n += 2) {
      myChunkORIGINAL_KIDS = newArrsKIDS.slice(n, n + 2)
      temporaryArrayORIGINAL_KIDS.push(myChunkORIGINAL_KIDS)
    }

    const newArrsMusic = LIVE_TV_REALITY
    let o = 0
    const arrayLengthMUSIC = newArrsMusic.length
    for (o; o < arrayLengthMUSIC; o += 2) {
      myChunkORIGINAL_MUSIC = newArrsMusic.slice(o, o + 2)
      temporaryArrayMUSIC.push(myChunkORIGINAL_MUSIC)
    }

    const newArrsRomance = LIVE_TV_ENTERTAINMENT
    let p = 0
    const arrayLengthROMANCE = newArrsRomance.length
    for (p; p < arrayLengthROMANCE; p += 2) {
      myChunkORIGINAL_ROMANCE = newArrsRomance.slice(p, p + 2)
      temporaryArrayROMANCE.push(myChunkORIGINAL_ROMANCE)
    }
  }

  renderRowSquareOneFull(item, rowID) {
    if (rowID === '0') {
      return(
        <View style={{ flex: 1, flexDirection: 'column', margin: 10, width: 100, height: 120 }} />
      )
    }
    return(
      <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Detail', { dataSource: this.state.dataSourceRecomen, test: 'ridho' }) }>
        <View style={{ flex: 1, flexDirection: 'column', margin: 5 }}>
          <Image resizeMode={'cover'} source={item.uri} style={{ width: 220, height: 120 }} />
          <Text numberOfLines={1} style={[ style_text.title_list, { color: 'black', padding: 5, backgroundColor: 'white', width: 220 }]}>{item.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderRowChannel3(item, rowID) {
    console.log('item', item)
    return(
      <TouchableOpacity onPress={() => console.log('rowID', rowID) }>
        <View style={{ flex: 1, flexDirection: 'column', margin: 5, elevation: 2, backgroundColor: 'white' }}>
          <Image resizeMode={'cover'} source={item.uri} style={{ width: 100, height: 130  }} />
          <Text numberOfLines={1} style={[ style_text.title_list, { color: 'black', padding: 5, backgroundColor: 'white', width: 100 }]}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  selectFilter(category) {
    if (category === 'Local') {
      this.setState({
        dataSourceRecomen: dsRecom.cloneWithRows(temporaryArrayLOCAL),
      })
    } else if (category === 'Reality Show') {
      this.setState({
        dataSourceRecomen: dsRecom.cloneWithRows(temporaryArrayREALITY),
      })
    } else if (category === 'Sport') {
      this.setState({
        dataSourceRecomen: dsRecom.cloneWithRows(temporaryArraySPORTS),
      })
    } else if (category === 'Entertainment') {
      this.setState({
        dataSourceRecomen: dsRecom.cloneWithRows(temporaryArrayORIGINAL_SERIES),
      })
    } else if (category === 'Kids') {
      this.setState({
        dataSourceRecomen: dsRecom.cloneWithRows(temporaryArrayORIGINAL_KIDS),
      })
    } else if (category === 'Music') {
      this.setState({
        dataSourceRecomen: dsRecom.cloneWithRows(temporaryArrayMUSIC),
      })
    } else {
      this.setState({
        dataSourceRecomen: dsRecom.cloneWithRows(temporaryArrayROMANCE),
      })
    }
    this.setState({ modalFilter: false, selectedCategory: category })
  }

  renderRowList(item, rowID) {
    let barWidth1 = width / 2
    let barWidth2 = width / 2
    barWidth1 = (barWidth1 * item[0].progress) / 100
    barWidth2 = (barWidth2 * item[1].progress) / 100
    let uri1 = null
    let uri2 = null
    switch (item[0].uri) {
      case 11: uri1 = Img.local.thumbnail_1; break;
      case 12: uri1 = Img.local.thumbnail_2; break;
      case 13: uri1 = Img.local.thumbnail_3; break;
      case 14: uri1 = Img.local.thumbnail_4; break;
      case 21: uri1 = Img.reality.thumbnail_1; break;
      case 22: uri1 = Img.reality.thumbnail_2; break;
      case 23: uri1 = Img.reality.thumbnail_3; break;
      case 24: uri1 = Img.reality.thumbnail_4; break;
      case 31: uri1 = Img.sport.thumbnail_1; break;
      case 32: uri1 = Img.sport.thumbnail_2; break;
      case 33: uri1 = Img.sport.thumbnail_3; break;
      case 34: uri1 = Img.sport.thumbnail_4; break;
      case 41: uri1 = Img.entertainment.thumbnail_1; break;
      case 42: uri1 = Img.entertainment.thumbnail_2; break;
      case 43: uri1 = Img.entertainment.thumbnail_3; break;
      case 44: uri1 = Img.entertainment.thumbnail_4; break;
      case 51: uri1 = Img.kids.thumbnail_1; break;
      case 52: uri1 = Img.kids.thumbnail_2; break;
      case 53: uri1 = Img.kids.thumbnail_3; break;
      case 54: uri1 = Img.kids.thumbnail_5; break;
      default: uri1 = Img.local.thumbnail_1
    }

    switch (item[1].uri) {
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
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', height: 200 }}>
        <TouchableOpacity onPress={() => {
          let arraySelected = null
          if (this.state.selectedCategory === 'Local') {
            arraySelected = LIVE_TV_LOCAL
          } else if (this.state.selectedCategory === 'Reality Show') {
            arraySelected = LIVE_TV_REALITY
          } else if (this.state.selectedCategory === 'Sport') {
            arraySelected = LIVE_TV_SPORT
          } else if (this.state.selectedCategory === 'Entertainment') {
            arraySelected = LIVE_TV_ENTERTAINMENT
          } else if (this.state.selectedCategory === 'Kids') {
            arraySelected = LIVE_TV_KIDS
          } else if (this.state.selectedCategory === 'Music') {
            arraySelected = LIVE_TV_ENTERTAINMENT
          } else {
            arraySelected = LIVE_TV_LOCAL
          }
          this.props.navigation.navigate('Detail', { data: arraySelected })
        } }>
          <View style={{ flex: 1, flexDirection: 'column', margin: 5, elevation: 2, backgroundColor: 'yellow', width: width / 2, alignItems: 'center' }}>
            <Image resizeMode={'cover'} source={uri1} style={{ width: width / 2 - 20, height: 120  }} />
            <View style={{ width: width / 2, position: 'absolute', left: 0, right: 0, bottom: 30, backgroundColor: 'purple' }}>
              <View style={{ height: 40, width: barWidth1, position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: COLORS.colorYellowDark }} />
              <Text numberOfLines={1} style={[ style_text.title_list, { color: 'white', paddingHorizontal: 5, paddingVertical: 10,width: width / 2 - 20 }]}><Text style={{ color: 'red' }}>Live : </Text>{item[0].title}</Text>
            </View>
            <View style={{ height: 30, flex: 1, flexDirection: 'row', width: width / 2, position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: 'white', alignItems: 'center' }}>
              <Ionicons name="ios-time" size={10} color={COLORS.colorYellow} style={{ paddingLeft: 10 }} />
              <Text numberOfLines={1} style={[ style_text.title_list, { fontSize: 8, color: 'black', padding: 5, width: 50 }]}>{item[0].start}</Text>
              <Ionicons name="ios-time" size={10} color={COLORS.colorRed} style={{ paddingLeft: 10 }} />
              <Text numberOfLines={1} style={[ style_text.title_list, { fontSize: 8,color: 'black', padding: 5 }]}>{item[0].end}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          let arraySelected = null
          if (this.state.selectedCategory === 'Local') {
            arraySelected = LIVE_TV_LOCAL
          } else if (this.state.selectedCategory === 'Reality Show') {
            arraySelected = LIVE_TV_REALITY
          } else if (this.state.selectedCategory === 'Sport') {
            arraySelected = LIVE_TV_SPORT
          } else if (this.state.selectedCategory === 'Entertainment') {
            arraySelected = LIVE_TV_ENTERTAINMENT
          } else if (this.state.selectedCategory === 'Kids') {
            arraySelected = LIVE_TV_KIDS
          } else if (this.state.selectedCategory === 'Music') {
            arraySelected = LIVE_TV_ENTERTAINMENT
          } else {
            arraySelected = LIVE_TV_LOCAL
          }
          this.props.navigation.navigate('Detail', { data: arraySelected })
        } }>
          <View style={{ flex: 1, flexDirection: 'column', margin: 5, elevation: 2, backgroundColor: 'white', width: width / 2 }}>
            <Image resizeMode={'cover'} source={uri2} style={{ width: width / 2 - 20, height: 120  }} />
            <View style={{ width: width / 2, position: 'absolute', left: 0, right: 0, bottom: 30, backgroundColor: 'purple' }}>
              <View style={{ height: 40, width: barWidth1, position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#dbc408' }} />
              <Text numberOfLines={1} style={[ style_text.title_list, { color: 'white', paddingHorizontal: 5, paddingVertical: 10, width: width / 2 - 20 }]}><Text style={{ color: 'red' }}>Live : </Text>{item[1].title}</Text>
            </View>
            <View style={{ height: 30, flex: 1, flexDirection: 'row', width: width / 2, position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: 'white', alignItems: 'center' }}>
            <Ionicons name="ios-time" size={10} color={COLORS.colorYellow} style={{ paddingLeft: 10 }} />
            <Text numberOfLines={1} style={[ style_text.title_list, { fontSize: 8, color: 'black', padding: 5, width: 50 }]}>{item[0].start}</Text>
            <Ionicons name="ios-time" size={10} color={COLORS.colorRed} style={{ paddingLeft: 10 }} />
            <Text numberOfLines={1} style={[ style_text.title_list, { fontSize: 8,color: 'black', padding: 5 }]}>{item[0].end}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const state = this.state
    let uriBanner = null
    if (state.selectedCategory === 'Local') {
      uriBanner = require('../../assets/images/livetv_lokal.png')
    } else if (state.selectedCategory === 'Reality Show') {
      uriBanner = require('../../assets/images/livetv_reality.png')
    } else if (state.selectedCategory === 'Sport') {
      uriBanner = require('../../assets/images/livetv_sports.png')
    } else if (state.selectedCategory === 'Entertainment') {
      uriBanner = require('../../assets/images/livetv_ent.png')
    } else if (state.selectedCategory === 'Kids') {
      uriBanner = require('../../assets/images/livetv_kids.png')
    } else if (state.selectedCategory === 'Music') {
      uriBanner = require('../../assets/images/livetv_music.png')
    } else {
      uriBanner = require('../../assets/images/livetv_romance.png')
    }
    return (
      <View style={styles.root}>
        <View style={[styles.slider, { position: 'absolute', left: 0, top: 50, right: 0 }]}>
          <Image resizeMode={'cover'} source={uriBanner} style={{ width: width, height: 300  }} />
          <LinearGradient colors={[ 'transparent', 'transparent', '#20265c']} style={styles.gradient_highlight}/>
        </View>

        <ActionBar style={{ height: 50}} />
        <ScrollView style={{ flex: 1, paddingTop: 150 }}>
          <View style={{ flex: 1, flexDirection: 'column'}}>
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'transparent' }}>
              <Text style={[style_text.title_list, { fontSize: 25, padding: 10, width: 500 }]}>{this.state.selectedCategory}</Text>
              <Text style={[style_text.title_list, { padding: 10, width: 500 }]}>RECOMMENDED FOR YOU</Text>
              { state.loadingRecom ? (
                <View style={styles.progress_container}>
                  <View style={styles.progress}>
                    <ActivityIndicator color={'#dc1f1b'} size={'small'} />
                  </View>
                </View>
              ) : (
                <ListView
                  style={[styles.list_channel_3, { height: 400 }]}
                  z-index={2}
                  enableEmptySections={true}
                  dataSource={this.state.dataSourceRecomen}
                  renderRow={(event, sectionID, rowID) => this.renderRowList(event, rowID)}
                  removeClippedSubviews={false}
                />
              )}
            </View>


            <View style={{ height: 200, backgroundColor: 'transparent' }} />

          </View>
        </ScrollView>

        <View style={[styles.slider, { position: 'absolute', left: 10, bottom: 70, right: 0, flexDirection: 'row' }]}>
          <TouchableOpacity onPress={() => this.setState({ modalFilter: true })}>
            <View style={{ backgroundColor: 'red', borderRadius: 20, width: 40, height: 40 }}>
              <Image resizeMode={'contain'} source={require('../../assets/images/menu_icons.png')} style={{ width: 15, height: 15, alignSelf: 'center', marginTop: 10  }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('press')}>
            <View style={{ backgroundColor: 'red', borderRadius: 20, width: 40, height: 40, marginLeft: 10 }}>
              <Image resizeMode={'contain'} source={require('../../assets/images/menu_remote.png')} style={{ width: 20, height: 20, alignSelf: 'center', marginTop: 10  }} />
            </View>
          </TouchableOpacity>
        </View>

        <Modal onRequestClose={() => console.log('close')} animationType={'fade'} transparent={true} visible={this.state.modalFilter}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
           }}>
             <View style={{
               flexDirection: 'column',
               justifyContent: 'center',
               alignSelf: 'center',
               backgroundColor: 'white',
               borderWidth: 1,
               borderColor: '#dddddd',
               height: (7 * 40) + 50
              }}>

              <View style={{ flex: 1, flexDirection: 'row', height: 50, alignSelf: 'center', padding: 10 }}>
                <Image resizeMode={'contain'} source={require('../../assets/images/menu_icons_gray.png')} style={{ width: 20, height: 20  }} />
                <Text style={{
                  paddingLeft: 10,
                  fontSize: 16,
                  fontFamily: 'Montserrat-SemiBold'}}>Categories</Text>
              </View>
              <TouchableOpacity onPress={() => this.selectFilter('Local')}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: width - 50, borderBottomWidth: 1, borderBottomColor: '#dddddd', marginHorizontal: 10, borderTopWidth: 1, borderTopColor: '#dddddd' }}>
                  <Text style={{
                    paddingRight: 20,
                    margin: 10,
                    fontSize: 14,
                    fontFamily: 'Montserrat-Light' }}>Local</Text>
                    <View style={{ backgroundColor: 'transparent', position: 'absolute', top: 10, right: 10, flexDirection: 'row' }}>
                      <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Light', marginRight: 5 }}>50</Text>
                      <Image resizeMode={'cover'} source={require('../../assets/icons/ico_channel.png')} style={{ width: 20, height: 20  }} />
                    </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.selectFilter('Reality Show')}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: width - 50, borderBottomWidth: 1, borderBottomColor: '#dddddd', marginHorizontal: 10 }}>
                  <Text style={{
                    paddingRight: 20,
                    margin: 10,
                    fontSize: 14,
                    fontFamily: 'Montserrat-Light' }}>Reality Show</Text>
                    <View style={{ backgroundColor: 'transparent', position: 'absolute', top: 10, right: 10, flexDirection: 'row' }}>
                      <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Light', marginRight: 5 }}>150</Text>
                      <Image resizeMode={'cover'} source={require('../../assets/icons/ico_channel.png')} style={{ width: 20, height: 20  }} />
                    </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.selectFilter('Sport')}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: width - 50, borderBottomWidth: 1, borderBottomColor: '#dddddd', marginHorizontal: 10 }}>
                  <Text style={{
                    paddingRight: 20,
                    margin: 10,
                    fontSize: 14,
                    fontFamily: 'Montserrat-Light' }}>Sport</Text>
                    <View style={{ backgroundColor: 'transparent', position: 'absolute', top: 10, right: 10, flexDirection: 'row' }}>
                      <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Light', marginRight: 5 }}>1.000</Text>
                      <Image resizeMode={'cover'} source={require('../../assets/icons/ico_channel.png')} style={{ width: 20, height: 20  }} />
                    </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.selectFilter('Entertainment')}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: width - 50, borderBottomWidth: 1, borderBottomColor: '#dddddd', marginHorizontal: 10 }}>
                  <Text style={{
                    paddingRight: 20,
                    margin: 10,
                    fontSize: 14,
                    fontFamily: 'Montserrat-Light' }}>Entertainment</Text>
                    <View style={{ backgroundColor: 'transparent', position: 'absolute', top: 10, right: 10, flexDirection: 'row' }}>
                      <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Light', marginRight: 5 }}>250</Text>
                      <Image resizeMode={'cover'} source={require('../../assets/icons/ico_channel.png')} style={{ width: 20, height: 20  }} />
                    </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.selectFilter('Kids')}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: width - 50, borderBottomWidth: 1, borderBottomColor: '#dddddd', marginHorizontal: 10 }}>
                  <Text style={{
                    paddingRight: 20,
                    margin: 10,
                    fontSize: 14,
                    fontFamily: 'Montserrat-Light' }}>Kids</Text>
                    <View style={{ backgroundColor: 'transparent', position: 'absolute', top: 10, right: 10, flexDirection: 'row' }}>
                      <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Light', marginRight: 5 }}>300</Text>
                      <Image resizeMode={'cover'} source={require('../../assets/icons/ico_channel.png')} style={{ width: 20, height: 20  }} />
                    </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.selectFilter('Music')}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: width - 50, borderBottomWidth: 1, borderBottomColor: '#dddddd', marginHorizontal: 10 }}>
                  <Text style={{
                    paddingRight: 20,
                    margin: 10,
                    fontSize: 14,
                    fontFamily: 'Montserrat-Light' }}>Music</Text>
                    <View style={{ backgroundColor: 'transparent', position: 'absolute', top: 10, right: 10, flexDirection: 'row' }}>
                      <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Light', marginRight: 5 }}>1.400</Text>
                      <Image resizeMode={'cover'} source={require('../../assets/icons/ico_channel.png')} style={{ width: 20, height: 20  }} />
                    </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.selectFilter('Romance')}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: width - 50, borderBottomWidth: 1, borderBottomColor: '#dddddd', marginHorizontal: 10 }}>
                  <Text style={{
                    paddingRight: 20,
                    margin: 10,
                    fontSize: 14,
                    fontFamily: 'Montserrat-Light' }}>Romance</Text>
                    <View style={{ backgroundColor: 'transparent', position: 'absolute', top: 10, right: 10, flexDirection: 'row' }}>
                      <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Light', marginRight: 5 }}>450</Text>
                      <Image resizeMode={'cover'} source={require('../../assets/icons/ico_channel.png')} style={{ width: 20, height: 20  }} />
                    </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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

export default LiveTV
