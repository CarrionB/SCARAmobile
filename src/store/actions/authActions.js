import { authErrors } from '../../res/constants';
import { getData } from './initActions';
import { getRequest } from './requestActions';

export const login = (credentials) => {
  return (dispatch, getState, {firebase}) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email.trim(),
      credentials.password)
      .then(() => 
        {   
          console.log('success')
        })
      .catch((err) => 
        {
          var errorMessage = '';
          if(err.message === authErrors.error0)
          {
            errorMessage = 'Email con formato invalido'
          }
          else if(err.message === authErrors.error1 ||
                  err.message === authErrors.error2)
          {
            errorMessage = 'Correo o contrasenia incorrectos'
          }
          else if(err.message === authErrors.error3)
          {
            errorMessage = 'No posee conexion a internet'
          }
          else
          {
            errorMessage = err.message
          }
          dispatch({type: 'AUTH_ERROR', errorMessage})
        })

    firebase.auth().onAuthStateChanged((user) => {
      if(user)
      {
        dispatch({type: 'AUTH_SUCCESS'});
      }
    });
  }
}

export const logout = () => {
  return (dispatch, getState, {firebase}) => {
    firebase.auth().signOut().then(()=>{
      dispatch({type: 'LOGOUT_SUCCESS'})
    })
  }
}

export const isLoggedIn = () => {
  return (dispatch, getState, {firebase}) => {
    // firebase.auth().onAuthStateChanged((user) => {
    //   if(user)
    //   {
    //     var userName = firebase.auth().currentUser.displayName;
    //     var userPhotoUrl = firebase.auth().currentUser.photoURL;

    //     var userInfo = {
    //       name: userName,
    //       photoUrl: userPhotoUrl
    //     }
    //     dispatch({type: 'LOGGED_IN', userInfo});
    //   }
    //   else
    //   {
    //     dispatch({type: 'LOGOUT_SUCCESS'})
    //   }
    // });

    var user = firebase.auth().currentUser;
    if(user)
    {
      getData();
      getRequest();

      var userName = firebase.auth().currentUser.displayName;
      var userPhotoUrl = firebase.auth().currentUser.photoURL;

      var userInfo = {
        name: userName,
        photoUrl: userPhotoUrl
      }
      dispatch({type: 'LOGGED_IN', userInfo});
    }
    else
    {
      dispatch({type: 'LOGOUT_SUCCESS'})
    }
  }
}