import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import { fetcher, ENDPOINT } from '../utils/common'

class Splash extends Component {

  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    setTimeout(() => {
      console.log('Fetching Cache Data')
      this.props.navigation.navigate('Welcome')
    }, 3000)
  }

  render() {
    return (
      <View style={styles.container}>
        <Image resizeMode={'contain'} style={styles.container_logo} source={require('../../assets/icons/icon.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container_logo: {
    width: 150,
    height: 80,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Splash
