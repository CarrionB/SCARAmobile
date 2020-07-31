const initState = {
  loggedIn: false,
  authError: false,
  errorMessage: ''
}

const authReducer = (state = initState, action) => {
  switch(action.type){
    case 'AUTH_SUCCESS':
      return {
        ...state,
        authError: false,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        authError: true,
        errorMessage: action.errorMessage
      };
    case 'LOGGED_IN':
      return {
        ...state,
        loggedIn: true,
        userInfo: action.userInfo
      };
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        loggedIn: false
      };
  }
  return state;
}

export default authReducer;