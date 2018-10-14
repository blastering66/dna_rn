import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text, TouchableWithoutFeedback, TouchableOpacity,
  View, Dimensions, Image, ScrollView, ListView, RefreshControl, TouchableHighlight, ActivityIndicator
} from 'react-native';
import { fetcher, ENDPOINT } from '../utils/common'
import Loading from '../components/Loading'
import ActionBar from '../components/ActionBar'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
import Swiper from 'react-native-swiper'
import style_text from '../styles/text'
import { COLORS } from '../utils/values'
import { CONTINUE_TV, RECOMMENDED, POPULAR, FAVORITE, ADD_CHANNEL, SPORTS, KIDS, LOCAL, REALITY, ADD_SERIES, ORIGINAL_SERIES, YOUTUBE } from '../utils/data_dummy'

const { width } = Dimensions.get('window')
const dsContinue = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsRecom = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsPopular = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsFav = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsAddChannel = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsSports = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsKids = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsLocal = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsReality = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsAddSeries = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsOriginal = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsYoutube = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class TopStories extends Component {

  static navigationOptions = {
    header: null
  }

  state = {
    sortNewest: false,
    sortClicked: false,
    loadingTop: false,
    loadingWorld: false,
    loadingSports: false,
    loadingTech: false,
    loadingHealth: false,
    loadingMovies: false,
    refreshing: false,
    hasMore: true,
    dataSourceContinue: dsContinue.cloneWithRows([]),
    dataSourceRecomen: dsRecom.cloneWithRows([]),
    dataSourcePopular: dsPopular.cloneWithRows([]),
    dataSourceFav: dsFav.cloneWithRows([]),
    dataSourceAddChannel: dsAddChannel.cloneWithRows([]),
    dataSourceSports: dsSports.cloneWithRows([]),
    dataSourceKids: dsKids.cloneWithRows([]),
    dataSourceLocal: dsLocal.cloneWithRows([]),
    dataSourceReality: dsReality.cloneWithRows([]),
    dataSourceAddSeries: dsAddSeries.cloneWithRows([]),
    dataSourceOriginal: dsOriginal.cloneWithRows([]),
    dataSourceYoutube: dsYoutube.cloneWithRows([]),
    index_highlight: 0
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    this.setState({
      dataSourceContinue: dsContinue.cloneWithRows(CONTINUE_TV),
      dataSourceRecomen: dsRecom.cloneWithRows(RECOMMENDED),
      dataSourcePopular: dsPopular.cloneWithRows(POPULAR),
      dataSourceFav: dsFav.cloneWithRows(FAVORITE),
      dataSourceAddChannel: dsAddChannel.cloneWithRows(ADD_CHANNEL),
      dataSourceSports: dsSports.cloneWithRows(SPORTS),
      dataSourceKids: dsAddChannel.cloneWithRows(KIDS),
      dataSourceLocal: dsLocal.cloneWithRows(LOCAL),
      dataSourceReality: dsReality.cloneWithRows(REALITY),
      dataSourceAddSeries: dsAddSeries.cloneWithRows(ADD_SERIES),
      dataSourceOriginal: dsAddSeries.cloneWithRows(ORIGINAL_SERIES),
      dataSourceYoutube: dsYoutube.cloneWithRows(YOUTUBE),
    })
  }

  renderRowList(item, rowID) {
    let mediaUrl = ''
    try {
      mediaUrl = article.multimedia[3].url
    } catch (err) {
      // console.log('no media', article)
    }
    const now = moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')
    const articleDate = moment(article.published_date).format('MMMM Do YYYY, h:mm:ss a')
    // console.log('now', now)
    // console.log('articleDate', articleDate)
    // console.log('duration', moment(articleDate, 'MMMM Do YYYY, h:mm:ss a').startOf('hour').fromNow())

    return(
      <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Watch', { }) }>
        <View style={{ flex: 1, height: 200, width: 300,  flexDirection: 'row', margin: 10 }}>
          { mediaUrl !== '' ? (
            <Image resizeMode={'cover'} source={{ uri: mediaUrl !== '' ? article.multimedia[3].url : '' }} style={{ flex: 1 }} />
          ) : null }


          <LinearGradient colors={[ 'transparent', 'transparent', '#000000']} style={styles.gradient_container}>
          <View style={styles.article_title_container}>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text multiline={true} numberOfLines={2} style={styles.article_title}>{article.title}</Text>
              <Text multiline={true} numberOfLines={2} style={styles.article_date}>{moment(articleDate, 'MMMM Do YYYY, h:mm:ss a').startOf('hour').fromNow()}</Text>
            </View>
          </View>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderRowSquareOne(item, rowID) {
    return(
      <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Watch', { }) }>
        <View style={{ flex: 1, flexDirection: 'column', margin: 5 }}>
          <View style={{ width: 120, height: 80, alignItems: 'center', backgroundColor: item.backgroundColor  }}>
            <Image resizeMode={'contain'} source={item.uri} style={{ width: 75, height: 75 }} />
          </View>
          <Text numberOfLines={1} style={[ style_text.title_list, { color: 'black', padding: 5, backgroundColor: 'white' }]}>{item.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderRowSquareOneFull(item, rowID) {
    if (rowID === '0') {
      return(
        <View style={{ flex: 1, flexDirection: 'column', margin: 5, width: 120, height: 80 }} />
      )
    }
    return(
      <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Watch', {}) }>
        <View style={{ flex: 1, flexDirection: 'column', margin: 5 }}>
          <Image resizeMode={'cover'} source={item.uri} style={{ width: 120, height: 80 }} />
          <Text numberOfLines={1} style={[ style_text.title_list, { color: 'black', padding: 5, backgroundColor: 'white' }]}>{item.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderRowChannel(item, rowID) {
    return(
      <View style={{ alignItems: 'center', height: 100, width: 150, margin: 5 }}>
        <Image resizeMode={'contain'} source={item.uri} style={{ width: 150, height: 100  }} />
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(102, 102, 102, 0.6)' }} />
        <Text style={[ style_text.title_list, { position: 'absolute', top: 40, left: 10, right: 0, textAlign: 'center' }]}>{item.title}</Text>
      </View>
    )
  }

  renderRowChannelFull(item, rowID) {
    return(
      <View style={{ alignItems: 'center', height: 100, width: 150, margin: 5 }}>
        <Image resizeMode={'cover'} source={item.uri} style={{ width: 150, height: 100  }} />
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(102, 102, 102, 0.6)' }} />
        <Text style={[ style_text.title_list, { position: 'absolute', top: 40, left: 10, right: 0, textAlign: 'center' }]}>{item.title}</Text>
      </View>
    )
  }

  renderRowChannel2(item, rowID) {
    return(
      <View style={{ alignItems: 'center', height: 100, width: 100, margin: 5 }}>
        <Image resizeMode={'cover'} source={require('../../assets/images/img_banner_arrow.png')} style={{ width: 100, height: 100  }} />
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(102, 102, 102, 0.4)' }} />
        <Text style={[ style_text.title_list, { position: 'absolute', top: 40, left: 0, right: 0, textAlign: 'center' }]}>DRAMA</Text>
      </View>
    )
  }

  renderRowChannel3(item, rowID) {
    if (rowID === '0') {
      return(
        <View style={{ flex: 1, flexDirection: 'column', margin: 5, elevation: 2, width: 100, height: 130 }} />
      )
    }
    return(
      <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Watch', {}) }>
        <View style={{ flex: 1, flexDirection: 'column', margin: 5, elevation: 2 }}>
          <Image resizeMode={'cover'} source={item.uri} style={{ width: 100, height: 130  }} />
          <Text numberOfLines={1} style={[ style_text.title_list, { color: 'black', padding: 5, backgroundColor: 'white', width: 100 }]}>{item.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderRowChannel3Empty(item, rowID) {
    return(
      <View style={{ flex: 1, flexDirection: 'column', margin: 10, elevation: 2, width: 100, height: 130 }} />
    )
  }

  render() {
    const state = this.state
    return (
      <View style={styles.root}>
        <ActionBar style={{ height: 50 }} />
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Swiper style={{ height: 500 }}
              index={this.state.index_highlight}
              loop={false}
              showsPagination={true}
              activeDotColor={'red'}
              dotColor={'white'}
              paginationStyle={{ alignItems: 'flex-start', paddingRight: width / 2 + width / 4 }}
              onIndexChanged={(index) => {
              console.log('test')
            }}>
              <View style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Watch', { })}>
                  <View style={styles.slider}>
                    <Image resizeMode={'cover'} source={require('../../assets/images/img_banner_arrow.png')} style={{ width: width, height: 500  }} />
                    <LinearGradient colors={[ 'transparent', 'transparent', '#20265c']} style={styles.gradient_highlight}/>
                    <View style={styles.label_highlight}>
                      <Text style={[style_text.title, styles.title_highlight]}>Watch now Arrow New Season</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>

              <View style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Watch', { })}>
                  <View style={styles.slider}>
                    <Image resizeMode={'cover'} source={require('../../assets/images/img_banner_got.jpg')} style={{ width: width, height: 500  }} />
                    <LinearGradient colors={[ 'transparent', 'transparent', '#20265c']} style={styles.gradient_highlight}/>
                    <View style={styles.label_highlight}>
                      <Text style={[style_text.title, styles.title_highlight]}>Watch now Game of Throne New Season 4</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>

                <View style={{ flex: 1 }}>
                  <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Watch', { })}>
                    <View style={styles.slider}>
                      <Image resizeMode={'cover'} source={require('../../assets/images/img_banner_flash.png')} style={{ width: width, height: 500  }} />
                      <LinearGradient colors={[ 'transparent', 'transparent', '#20265c']} style={styles.gradient_highlight}/>
                      <View style={styles.label_highlight}>
                        <Text style={[style_text.title, styles.title_highlight]}>Watch now Flash New Season</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>

              <View style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Watch', { })}>
                  <View style={styles.slider}>
                    <Image resizeMode={'cover'} source={require('../../assets/images/img_banner_runningman.jpg')} style={{ width: width, height: 500  }} />
                    <LinearGradient colors={[ 'transparent', 'transparent', '#20265c']} style={styles.gradient_highlight}/>
                    <View style={styles.label_highlight}>
                      <Text style={[style_text.title, styles.title_highlight]}>Watch now Runningman New Episode Weekly</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>

              <View style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Watch', { })}>
                  <View style={styles.slider}>
                    <Image resizeMode={'cover'} source={require('../../assets/images/img_banner_miss.png')} style={{ width: width, height: 500  }} />
                    <LinearGradient colors={[ 'transparent', 'transparent', '#20265c']} style={styles.gradient_highlight}/>
                    <View style={styles.label_highlight}>
                      <Text style={[style_text.title, styles.title_highlight]}>Watch now new episode Miss Humming</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </Swiper>

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'red' }}>
              <Text style={[style_text.title_list, { padding: 10, width: 500 }]}>CONTINUE TV WATCHING</Text>
              { state.loadingTop ? (
                <View style={styles.progress_container}>
                  <View style={styles.progress}>
                    <ActivityIndicator color={'#dc1f1b'} size={'small'} />
                  </View>
                </View>
              ) : (
                <ListView
                  style={styles.list}
                  z-index={2}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  enableEmptySections={true}
                  dataSource={this.state.dataSourceContinue}
                  renderRow={(event, sectionID, rowID) => this.renderRowSquareOne(event, rowID)}
                  removeClippedSubviews={false}
                />
              )}
            </View>

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: COLORS.colorBackground }}>
              <Text style={[style_text.title_list, { padding: 10, color: 'black', width: 500 }]}>RECOMMENDED FOR YOU</Text>
              { state.loadingTop ? (
                <View style={styles.progress_container}>
                  <View style={styles.progress}>
                    <ActivityIndicator color={'#dc1f1b'} size={'small'} />
                  </View>
                </View>
              ) : (
                <ListView
                  style={styles.list}
                  z-index={2}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  enableEmptySections={true}
                  dataSource={this.state.dataSourceRecomen}
                  renderRow={(event, sectionID, rowID) => this.renderRowSquareOne(event, rowID)}
                  removeClippedSubviews={false}
                />
              )}
            </View>

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: COLORS.colorBackground }}>
              <Text style={[style_text.title_list, { padding: 10, color: 'black', width: 500 }]}>MOST POPULAR TV</Text>
              { state.loadingTop ? (
                <View style={styles.progress_container}>
                  <View style={styles.progress}>
                    <ActivityIndicator color={'#dc1f1b'} size={'small'} />
                  </View>
                </View>
              ) : (
                <ListView
                  style={styles.list}
                  z-index={2}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  enableEmptySections={true}
                  dataSource={this.state.dataSourcePopular}
                  renderRow={(event, sectionID, rowID) => this.renderRowSquareOne(event, rowID)}
                  removeClippedSubviews={false}
                />
              )}
            </View>

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: COLORS.colorBackground }}>
              <Text style={[style_text.title_list, { padding: 10, color: 'black', width: 500 }]}>TV FAVORITE THIS WEEK</Text>
              { state.loadingTop ? (
                <View style={styles.progress_container}>
                  <View style={styles.progress}>
                    <ActivityIndicator color={'#dc1f1b'} size={'small'} />
                  </View>
                </View>
              ) : (
                <ListView
                  style={styles.list}
                  z-index={2}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  enableEmptySections={true}
                  dataSource={this.state.dataSourceFav}
                  renderRow={(event, sectionID, rowID) => this.renderRowSquareOne(event, rowID)}
                  removeClippedSubviews={false}
                />
              )}
            </View>

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: COLORS.colorBackground }}>
              <Text style={[style_text.title_list, { padding: 10, color: 'black', width: 500 }]}>ADD CHANNELS TV </Text>
              { state.loadingTop ? (
                <View style={styles.progress_container}>
                  <View style={styles.progress}>
                    <ActivityIndicator color={'#dc1f1b'} size={'small'} />
                  </View>
                </View>
              ) : (
                <ListView
                  style={styles.list_channel}
                  z-index={2}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  enableEmptySections={true}
                  dataSource={this.state.dataSourceAddChannel}
                  renderRow={(event, sectionID, rowID) => this.renderRowChannel(event, rowID)}
                  removeClippedSubviews={false}
                />
              )}
            </View>

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: COLORS.colorBackground, paddingTop: 10 }}>
              <Text style={[style_text.title_list, { padding: 10, color: 'black', width: 500 }]}>SPORT TV </Text>
              <View style={{ flex:1, flexDirection: 'row' }}>
                <View style={[styles.triangleCorner, { borderTopColor: 'purple' }]}></View>
                <Image resizeMode={'contain'} source={require('../../assets/images/logo_bein.png')} style={{ width: 80, height: 40, position: 'absolute', left: 30, top: 40  }} />
                { state.loadingTop ? (
                  <View style={styles.progress_container}>
                    <View style={styles.progress}>
                      <ActivityIndicator color={'#dc1f1b'} size={'small'} />
                    </View>
                  </View>
                ) : (
                  <ListView
                    style={styles.list_channel_2}
                    z-index={2}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    enableEmptySections={true}
                    dataSource={this.state.dataSourceSports}
                    renderRow={(event, sectionID, rowID) => this.renderRowSquareOneFull(event, rowID)}
                    removeClippedSubviews={false}
                  />
                )}
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: COLORS.colorBackground }}>
              <Text style={[style_text.title_list, { padding: 10, color: 'black', width: 500 }]}>KIDS TV </Text>
              <View style={{ flex:1, flexDirection: 'row' }}>
                <View style={[styles.triangleCorner, { borderTopColor: '#7bb3ff' }]}></View>
                <Image resizeMode={'contain'} source={require('../../assets/images/logo_cn.png')} style={{ width: 80, height: 40, position: 'absolute', left: 30, top: 40 }} />
                { state.loadingTop ? (
                  <View style={styles.progress_container}>
                    <View style={styles.progress}>
                      <ActivityIndicator color={'#dc1f1b'} size={'small'} />
                    </View>
                  </View>
                ) : (
                  <ListView
                    style={styles.list_channel_2}
                    z-index={2}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    enableEmptySections={true}
                    dataSource={this.state.dataSourceKids}
                    renderRow={(event, sectionID, rowID) => this.renderRowSquareOneFull(event, rowID)}
                    removeClippedSubviews={false}
                  />
                )}
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: COLORS.colorBackground }}>
              <Text style={[style_text.title_list, { padding: 10, color: 'black', width: 500 }]}>LOCAL TV </Text>
              <View style={{ flex:1, flexDirection: 'row' }}>
                <View style={[styles.triangleCorner, { borderTopColor: 'white' }]}></View>
                <Image resizeMode={'contain'} source={require('../../assets/images/logo_sctv.png')} style={{ width: 80, height: 40, position: 'absolute', left: 30, top: 40  }} />
                { state.loadingTop ? (
                  <View style={styles.progress_container}>
                    <View style={styles.progress}>
                      <ActivityIndicator color={'#dc1f1b'} size={'small'} />
                    </View>
                  </View>
                ) : (
                  <ListView
                    style={styles.list_channel_2}
                    z-index={2}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    enableEmptySections={true}
                    dataSource={this.state.dataSourceLocal}
                    renderRow={(event, sectionID, rowID) => this.renderRowSquareOneFull(event, rowID)}
                    removeClippedSubviews={false}
                  />
                )}
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: COLORS.colorBackground }}>
              <Text style={[style_text.title_list, { padding: 10, color: 'black', width: 500 }]}>REALITY TV </Text>
              <View style={{ flex:1, flexDirection: 'row' }}>
                <View style={styles.triangleCorner}></View>
                <Image resizeMode={'contain'} source={require('../../assets/images/logo_sctv.png')} style={{ width: 80, height: 40, position: 'absolute', left: 30, top: 40  }} />
                { state.loadingTop ? (
                  <View style={styles.progress_container}>
                    <View style={styles.progress}>
                      <ActivityIndicator color={'#dc1f1b'} size={'small'} />
                    </View>
                  </View>
                ) : (
                  <ListView
                    style={styles.list_channel_2}
                    z-index={2}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    enableEmptySections={true}
                    dataSource={this.state.dataSourceReality}
                    renderRow={(event, sectionID, rowID) => this.renderRowSquareOneFull(event, rowID)}
                    removeClippedSubviews={false}
                  />
                )}
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: COLORS.colorBackground }}>
              <Text style={[style_text.title_list, { padding: 10, color: 'black', width: 500 }]}>ADD TV SERIES</Text>
              { state.loadingTop ? (
                <View style={styles.progress_container}>
                  <View style={styles.progress}>
                    <ActivityIndicator color={'#dc1f1b'} size={'small'} />
                  </View>
                </View>
              ) : (
                <ListView
                  style={styles.list_channel}
                  z-index={2}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  enableEmptySections={true}
                  dataSource={this.state.dataSourceAddSeries}
                  renderRow={(event, sectionID, rowID) => this.renderRowChannelFull(event, rowID)}
                  removeClippedSubviews={false}
                />
              )}
            </View>

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: COLORS.colorBackground, paddingBottom: 20 }}>
              <Text style={[style_text.title_list, { padding: 10, color: 'black', width: 500 }]}>LIVE TV ORIGINAL SERIES</Text>
              <View style={{ flex:1, flexDirection: 'row' }}>
                <View style={[styles.triangleCornerLong, { borderTopColor: 'red' }]}></View>
                <Image resizeMode={'contain'} source={require('../../assets/images/logo_white.png')} style={{ width: 80, height: 40, position: 'absolute', left: 30, top: 40  }} />
                { state.loadingTop ? (
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
                    removeClippedSubviews={false}
                    dataSource={this.state.dataSourceOriginal}
                    renderRow={(event, sectionID, rowID) => this.renderRowChannel3(event, rowID)}
                    removeClippedSubviews={false}
                  />
                )}
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: COLORS.colorBackground }}>
              <Text style={[style_text.title_list, { padding: 10, color: 'black', width: 500 }]}>LIVE SHOW TV </Text>
              <View style={{ flex:1, flexDirection: 'row' }}>
                <View style={[styles.triangleCornerLong, { borderTopColor: '#854442' }]}></View>
                <Image resizeMode={'contain'} source={require('../../assets/images/logo_white.png')} style={{ width: 80, height: 40, position: 'absolute', left: 30, top: 40  }} />
                { state.loadingTop ? (
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
                    dataSource={this.state.dataSourceYoutube}
                    renderRow={(event, sectionID, rowID) => this.renderRowChannel3(event, rowID)}
                    removeClippedSubviews={false}
                  />
                )}
              </View>
            </View>
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
    backgroundColor: COLORS.colorBackground,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 70
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
    flex: 1, height: 150, paddingVertical: 0, paddingHorizontal: 10
  },
  list_channel: {
    flex: 1, height: 100, paddingVertical: 0, paddingHorizontal: 10
  },
  list_channel_2: {
    flex: 1, height: 150
  },
  list_channel_3: {
    flex: 1, height: 180, paddingLeft: 0
  },
  item_title_container: {
    position: 'absolute', bottom: 20
  },
  item_title: {
    backgroundColor: 'transparent', color: 'white', fontSize: 14, fontFamily: 'AvenirNext-Regular', paddingLeft: 10, paddingRight: 20
  },
  item_date: {
    backgroundColor: 'transparent', color: 'white', fontSize: 12, fontFamily: 'AvenirNext-Regular', paddingLeft: 10, paddingRight: 20
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
    width: 300,
    height: 200
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
  label_highlight: {
    position: 'absolute', bottom: 60, left: 0, right: 0
  },
  title_highlight: {
    color: 'white', fontSize: 20, padding: 10
  },
  triangleCorner: {
    position: 'absolute',
    top:0,
    left:0,
    width: 170,
    height: 120,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 50,
    borderTopWidth: 130,
    borderRightColor: 'transparent'
  },
  triangleCornerLong: {
    position: 'absolute',
    top:0,
    left:0,
    width: 170,
    height: 180,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 50,
    borderTopWidth: 180,
    borderRightColor: 'transparent'
  }
});

export default TopStories
