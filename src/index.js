import React, { Component } from 'react'
import { AppState } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Permissions from 'react-native-permissions'
import { createRootNavigator } from './router'
import { store, persistor } from './utils/store'

class App extends Component {
  store = store
  static propTypes = {
    artikel: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      appState: AppState.currentState
    }
  }

  componentDidMount() {
  }

  render() {
    // sementara menunggu API to redux
    const state = store.getState()
    let isLoggedIn = false
    if (state.auth.authToken.authToken !== '') {
      isLoggedIn = true
    } else {
      isLoggedIn = false
      store.dispatch({ type: 'AUTHENTICATION_OUT' })
      persistor.purge()
    }
    const Layout = createRootNavigator(isLoggedIn)
    return <Layout />
  }
}

const mapStateToProps = state => ({
  artikel: state.artikel,
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
