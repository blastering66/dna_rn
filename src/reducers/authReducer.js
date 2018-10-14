const initialState = {
  authToken: '',
  user: {}
}

export default function dataUser(state = initialState, action) {
  switch (action.type) {
    case 'AUTHENTICATION_START':
      return {
        ...state,
        authToken: action.authToken
      }
    case 'AUTHENTICATION_USER':
    return {
      ...state,
      user: {
        ...state.user,
        name: action.user.data.name,
        nohp: action.user.data.nohp
      }
    }

    default:
      return state

  }
}
