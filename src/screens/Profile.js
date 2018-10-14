import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Platform,
  StyleSheet,
  Text,
  View, Image,
  ListView, RefreshControl, TouchableOpacity
} from 'react-native';
import { fetcher, ENDPOINT } from '../utils/common'
import Loading from '../components/Loading'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { outAuth, setToken } from '../actions/authAction'
import { persistor } from '../utils/store'
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class Profile extends Component {
  static propTypes = {
    auth: PropTypes.object,
    setToken: PropTypes.func,
    outAuth: PropTypes.func
  }

  static navigationOptions = ({navigation}) => ({
    title: 'More',
    headerBackTitle: null,
    headerRight: null,
    headerStyle: {
      backgroundColor: 'white'
    },
    headerTitleStyle: { fontSize: 16 },
    headerBackTitleStyle: { color: '#000000' },
    headerTintColor: '#000000',
    headerMode: 'screen',
    gesturesEnabled: true
  })


  state = {
    loading: false,
    refreshing: false
  }

  componentDidMount() {
    console.log('auth', this.props.auth.user.name)
    console.log('persistor', persistor)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container_header}>
          <TouchableOpacity onPress={() => {
            const token = {
              authToken: ''
            }
            this.props.setToken(token)
            persistor.purge()
          } }>
            <Text style={styles.name}>Logout</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  container_header: {
    height: 200,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  name: {
    backgroundColor: 'transparent', color: 'black', fontSize: 18, fontWeight: 'bold', fontFamily: 'AvenirNext-Regular', paddingLeft: 10, paddingRight: 20
  },
  email: {
    backgroundColor: 'transparent', color: 'black', fontSize: 14, fontFamily: 'AvenirNext-Regular', paddingLeft: 10, paddingRight: 20
  },
});

mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

mapDispatchToProps = dispatch => {
  return {
    outAuth: () => dispatch(outAuth()),
    setToken: (authToken) => dispatch(setToken(authToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
