const initState = {
  loggedIn: false,
  authError: false,
  errorMessage: ''
}

const authReducer = (state = initState, action) => {
  console.log(action)
  switch(action.type){
    case 'AUTH_SUCCESS':
      console.log('Usuario ingresado');
      return {
        ...state,
        authError: false,
      };
    case 'AUTH_ERROR':
      console.log('error')
      console.log(action.errorMessage)
      return {
        ...state,
        authError: true,
        errorMessage: action.errorMessage
      };
    case 'LOGGED_IN':
      console.log('isloggedin')
      return {
        ...state,
        loggedIn: true,
        userInfo: action.userInfo
      };
    case 'LOGOUT_SUCCESS':
      console.log('lout')
      return {
        ...state,
        loggedIn: false
      };
  }
  return state;
}

export default authReducer;