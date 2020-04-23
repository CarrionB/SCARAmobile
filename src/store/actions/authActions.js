export const login = (credentials) => {
    return (dispatch, getState, {firebase})=>{
        firebase.auth().signInWithEmailAndPassword(
            credentials.email.trim(),
            credentials.password)
            .then(() => 
                {   
                    dispatch({type: 'AUTH_SUCCESS'});
                })
            .catch((err) => 
                {
                    var errorMessage = '';
                    if(err.message === 'The email address is badly formatted.'){
                        errorMessage = 'Email con formato invalido'
                    }else if(err.message === 'The password is invalid or the user does not have a password.'||
                             err.message === 'There is no user record corresponding to this identifier. The user may have been deleted.'){
                        errorMessage = 'Correo o contrasenia incorrectos'
                    }else if(err.message === 'An internal error has occurred. [ 7: ]'){
                        errorMessage = 'No posee conexion a internet'
                    }else{
                        errorMessage = err.message
                    }
                    dispatch({type: 'AUTH_ERROR', errorMessage})
                })
    }
}

export const logout = () => {
    return (dispatch, getState, {firebase})=>{
        firebase.auth().signOut().then(()=>{
            dispatch({type: 'LOGOUT_SUCCESS'})
        })
    }
}

export const isLoggedIn = () => {
    return (dispatch, getState, {firebase})=>{
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                var userName = firebase.auth().currentUser.displayName;
                var userPhotoUrl = firebase.auth().currentUser.photoURL;

                var userInfo = {
                    name: userName,
                    photoUrl: userPhotoUrl
                }
                dispatch({type: 'LOGGED_IN', userInfo});
            }
            else{
                dispatch({type: 'LOGOUT_SUCCESS'})
            }
        });
    }
}

export const getUserInfo = () => {
    return (dispatch, getState, {firebase})=>{
        const userName = firebase.auth().currentUser.displayName;
        const userPhotoUrl = firebase.auth().currentUser.photoURL;
        console.log(userName,userPhotoUrl)
        const userInfo = {
            name: userName,
            photoUrl: userPhotoUrl
        }
        dispatch({type: 'USER_INFO_RETRIEVED', userInfo})
    }
}