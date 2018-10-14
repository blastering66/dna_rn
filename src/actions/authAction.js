export function authenticationStart(authToken) {
  return {
    type: 'AUTHENTICATION_START', authToken
  }
}

export function authenticationUser(user) {
  return {
    type: 'AUTHENTICATION_USER', user
  }
}

export function authenticationOut() {
  return {
    type: 'AUTHENTICATION_OUT'
  }
}

export function setToken(authToken) {
  return (dispatch) => {
    dispatch(authenticationStart(authToken))
  }
}

export function setUser(userData) {
  return (dispatch) => {
    dispatch(authenticationUser(userData))
  }
}

export function outAuth(userData) {
  return (dispatch) => {
    dispatch(authenticationOut())
  }
}
