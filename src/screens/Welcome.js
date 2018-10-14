import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Platform, Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { fetcher, API, ENDPOINT } from '../utils/common'
import Ionicons from 'react-native-vector-icons/Ionicons'
import style_text from '../styles/text'
import style_compound from '../styles/compound'
import { COLORS } from '../utils/values'
import styles from '../styles/general'
import Button from '../components/Button'
import Bar from '../components/Bar'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { setToken, setUser } from '../actions/authAction'
import { connect } from 'react-redux'
import axios from 'axios'
const { width } = Dimensions.get('window')

const Satellite = axios.create({
  baseURL: API.URL,
  timeout: 10000,
  headers: {
    Accept: API.ACCEPT,
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
})

class Welcome extends Component {
  static propTypes = {
    setToken: PropTypes.func,
    setUser: PropTypes.func
  }

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)

    this.state = {
      showSignupView: false,
      showSigninView: false,
      signup_nama_placeholder: 'Nama Lengkap',
      signup_email_placeholder: 'Email',
      signup_address_placeholder: 'Alamat',
      signup_no_tlp_placeholder: 'No Handphone',
      signup_no_home_placeholder: 'No Telepon rumah',
      signup_password_placeholder: 'Password Baru',

      signup_nama: '',
      signup_email: '',
      signup_password: '',
      signup_address: '',
      signup_no_tlp: '',
      signup_no_home: '',

      signin_no_tlp_placeholder: 'No Handphone',
      signin_email_placeholder: 'Email',
      signin_password_placeholder: 'Password',

      signin_no_tlp: '',
      signin_email: '',
      signin_password: '',
      keyboardShow: false
    }
  }

  componentDidMount() {
    console.log('current auth', this.props.auth)
  }

  signup(nama, email, alamat, no_tlp, no_home, pass) {
    // Satellite.post(ENDPOINT.MEMBER, {
    //   method: 'register',
    //   name: nama,
    //   email: email,
    //   address: alamat,
    //   handphone: no_tlp,
    //   homephone: no_home,
    //   password: pass
    // }).then((response) => {
    //   console.log('response', response)
    // }).catch((error) => {
    //   console.log('error', error)
    // })
    Satellite.post(ENDPOINT.MEMBER, {
      method: 'register',
      name: 'USer 1',
      email: 'user1@gmail.com',
      address: 'alamat',
      handphone: '081287437849',
      homephone: '02100001',
      password: 'Password001'
    }).then((response) => {
      console.log('response', response)
      if (response.status == 200) {
        console.log('Success')
      }
    }).catch((error) => {
      console.log('error', error)
    })
  }

  signin() {
    Satellite.post(ENDPOINT.MEMBER, {
      method: 'login',
      email: 'u',
      password: 'Password001'
    }).then((response) => {
      console.log('response', response)
      console.log('message', response.message)
      if (response.status == 200) {
        console.log('Success')
      }
    }).catch((error) => {
      console.log('error', error)
    })
  }

  updateAuth() {
    console.log('API', API.URL + ENDPOINT.MEMBER)
    console.log('state', this.state)
    const state = this.state
    this.signup(state.signup_nama, state.signup_email, state.signup_address, state.signup_no_tlp, state.signup_no_home, state.signup_password)
    // const token = {
    //   authToken: 'SIGNEDIN'
    // }
    // const newUser = {
    //   data: {
    //     name: 'Ridho',
    //     nohp: '081287437849'
    //   }
    // }
    // this.props.setToken(token)
    // this.props.setUser(newUser)
    // console.log('update auth', this.props.auth)
  }

  render() {
    const self = this
    const state = this.state
    const renderButtonSignUp = (
      <View>
        <Button onPress={() => this.updateAuth()} style={{ marginTop: 40 }} title={'SIGN UP'} />
        <TouchableWithoutFeedback onPress={() => self.setState({ showSigninView: true, showSignupView: false })}>
          <Text style={[style_text.title, { color: 'black', fontSize: 10, textAlign: 'center', padding: 10 }]}>Already have an account ?
            <Text style={[style_text.bold, { color: 'red' }]}> Sign In</Text>
          </Text>
        </TouchableWithoutFeedback>
      </View>
    )
    return (
      <View style={[styles.container, { flexDirection: 'column' }]}>

        { !state.showSignupView && !state.showSigninView ? (
          <View style={{ paddingTop: 200, flex: 1, flexDirection: 'column', alignItems: 'center' }}>
            <Image resizeMode={'contain'} style={styles.logo_black} source={require('../../assets/icons/icon.png')} />
            <Text style={[style_text.logo_1, { paddingHorizontal: 50, textAlign: 'center' }]}>DAFTARKAN MEREK DAGANG ANDA</Text>
            <Text style={style_text.logo_2}>Bersama kami proses lebih mudah dan cepat</Text>
          </View>

        ) : null }

        { state.showSignupView ? (
          <View style={styles.container_signup}>
              {/** <View style={{ paddingBottom: 50, flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                <Image resizeMode={'contain'} style={styles.logo_black} source={require('../../assets/icons/icon.png')} />
                <Text style={[style_text.logo_1, { paddingHorizontal: 50, textAlign: 'center' }]}>DAFTARKAN MEREK DAGANG ANDA</Text>
                <Text style={style_text.logo_2}>Bersama kami proses lebih mudah dan cepat</Text>
              </View> **/}
              <TouchableOpacity style={{ width: 100, height: 20, alignSelf: 'center' }} onPress={() => self.setState({ showSignupView: false })}>
                <Bar/>
              </TouchableOpacity>
              <View style={style_compound.inputbox}>
                <Ionicons name="md-person" style={style_compound.inputbox_img} size={25} color={"gray"} />
                <TextInput
                  onFocus={(focus) => self.setState({ keyboardShow: !focus })}
                  underlineColorAndroid={'transparent'}
                  placeholder={state.signup_nama_placeholder}
                  placeholderStyle={style_text.register}
                  placeholderTextColor="gray"
                  style={[style_compound.inputbox_text, { height: 30 }]}
                  multiline={false}
                  numberOfLines ={1}
                  value={state.signup_nama}
                  onChangeText={(value) => this.setState({ signup_nama: value })}
                />
              </View>

              <View style={style_compound.inputbox}>
                <Ionicons name="md-mail" style={style_compound.inputbox_img} size={25} color={"gray"} />
                <TextInput
                  onFocus={(focus) => self.setState({ keyboardShow: false })}
                  underlineColorAndroid={'transparent'}
                  placeholder={state.signin_email_placeholder}
                  placeholderStyle={style_text.register}
                  placeholderTextColor="gray"
                  style={[style_compound.inputbox_text, { height: 30 }]}
                  multiline={false}
                  numberOfLines ={1}
                  keyboardType={'email-address'}
                  value={state.signup_email}
                  onChangeText={(value) => this.setState({ signup_email: value })}
                />
              </View>

              <View style={style_compound.inputbox}>
                <Ionicons name="md-home" style={style_compound.inputbox_img} size={25} color={"gray"} />
                <TextInput
                  onFocus={(focus) => self.setState({ keyboardShow: false })}
                  underlineColorAndroid={'transparent'}
                  placeholder={state.signup_address_placeholder}
                  placeholderStyle={style_text.register}
                  placeholderTextColor="gray"
                  style={[style_compound.inputbox_text, { height: 30 }]}
                  multiline={false}
                  numberOfLines ={1}
                  value={state.signup_address}
                  onChangeText={(value) => this.setState({ signup_address: value })}
                />
              </View>

              <View style={style_compound.inputbox}>
                <Ionicons name="md-call" style={style_compound.inputbox_img} size={25} color={"gray"} />
                <TextInput
                  onFocus={(focus) => self.setState({ keyboardShow: false })}
                  underlineColorAndroid={'transparent'}
                  placeholder={state.signup_no_tlp_placeholder}
                  placeholderStyle={style_text.register}
                  placeholderTextColor="gray"
                  style={[style_compound.inputbox_text, { height: 30 }]}
                  multiline={false}
                  numberOfLines ={1}
                  keyboardType={'phone-pad'}
                  value={state.signup_no_tlp}
                  onChangeText={(value) => this.setState({ signup_no_tlp: value })}
                />
              </View>

              <View style={style_compound.inputbox}>
                <Ionicons name="md-call" style={style_compound.inputbox_img} size={25} color={"gray"} />
                <TextInput
                  onFocus={(focus) => self.setState({ keyboardShow: false })}
                  underlineColorAndroid={'transparent'}
                  placeholder={state.signup_no_home_placeholder}
                  placeholderStyle={style_text.register}
                  placeholderTextColor="gray"
                  style={[style_compound.inputbox_text, { height: 30 }]}
                  multiline={false}
                  numberOfLines ={1}
                  keyboardType={'phone-pad'}
                  value={state.signup_no_home}
                  onChangeText={(value) => this.setState({ signup_no_home: value })}
                />
              </View>

              <View style={style_compound.inputbox}>
                <Ionicons name="md-lock" style={style_compound.inputbox_img} size={25} color={"gray"} />
                <TextInput
                  underlineColorAndroid={'transparent'}
                  placeholder={state.signup_password_placeholder}
                  placeholderStyle={style_text.register}
                  placeholderTextColor="gray"
                  style={[style_compound.inputbox_text, { height: 30 }]}
                  multiline={false}
                  numberOfLines ={1}
                  secureTextEntry={true}
                  value={state.signup_password}
                  onChangeText={(value) => this.setState({ signup_password: value })}
                />
              </View>
            { state.keyboardShow ? null : renderButtonSignUp }
          </View>
        ) : null }

        { state.showSigninView ? (
            <View style={styles.container_signup}>
              <View style={{ paddingBottom: 100, flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                <Image resizeMode={'contain'} style={styles.logo_black} source={require('../../assets/icons/icon.png')} />
                <Text style={[style_text.logo_1, { paddingHorizontal: 50, textAlign: 'center' }]}>DAFTARKAN MEREK DAGANG ANDA</Text>
                <Text style={style_text.logo_2}>Bersama kami proses lebih mudah dan cepat</Text>
              </View>
              <TouchableOpacity style={{ width: 100, height: 20, alignSelf: 'center' }} onPress={() => self.setState({ showSigninView: false })}>
                <Bar/>
              </TouchableOpacity>
              <View style={style_compound.inputbox}>
                <Ionicons name="md-call" style={style_compound.inputbox_img} size={25} color={"gray"} />
                <TextInput
                  underlineColorAndroid={'transparent'}
                  placeholder={state.signup_email_placeholder}
                  placeholderStyle={style_text.register}
                  placeholderTextColor="gray"
                  style={[style_compound.inputbox_text, { height: 30 }]}
                  multiline={false}
                  numberOfLines ={1}
                  keyboardType={'numeric'}
                  value={state.signup_email}
                  onChangeText={(value) => this.setState({ signup_email: value })}
                />
              </View>

              <View style={style_compound.inputbox}>
                <Ionicons name="md-lock" style={style_compound.inputbox_img} size={25} color={"gray"} />
                <TextInput
                  underlineColorAndroid={'transparent'}
                  placeholder={state.signin_password_placeholder}
                  placeholderStyle={style_text.register}
                  placeholderTextColor="gray"
                  style={[style_compound.inputbox_text, { height: 30 }]}
                  multiline={false}
                  numberOfLines ={1}
                  secureTextEntry={true}
                  value={state.signup_password}
                  onChangeText={(value) => this.setState({ signup_password: value })}
                />
              </View>

              <View style={[styles.container, { flex: 1, flexDirection: 'row', paddingTop: 20 }]}>

                <View style={{ flex: 1, marginRight: 80 }}>
                  <Button onPress={() => this.signin()} style={{ marginRight: 30, height: 40 }} title={'SIGN IN'} />
                </View>

              </View>

              <TouchableWithoutFeedback onPress={() => self.setState({ showSigninView: true, showSignupView: false })}>
                <Text style={[style_text.title, { color: 'black', fontSize: 10, padding: 10 }]}>Forgot password ?
                  <Text style={[style_text.bold, { color: 'red' }]}> Reset</Text>
                </Text>
              </TouchableWithoutFeedback>
            </View>
        ) : null }

        { !state.showSignupView && !state.showSigninView ? (
          <View style={styles.container_bottom}>
            <TouchableOpacity style={{ position: 'absolute', left: 20, bottom: 10 }} onPress={() => this.setState({ showSignupView: true })}>
              <Text style={style_text.button}>SIGN UP</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ position: 'absolute', right: 20, bottom: 10 }}  onPress={() => this.setState({ showSigninView: true })}>
              <Text style={style_text.button}>SIGN IN</Text>
            </TouchableOpacity>
          </View>
        ) : null }
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setToken: (authToken) => dispatch(setToken(authToken)),
    setUser: (userData) => dispatch(setUser(userData))
  }
  // return {
  //   setUser: userData => {
  //     dispatch(setUser(userData))
  //   }
  // }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
