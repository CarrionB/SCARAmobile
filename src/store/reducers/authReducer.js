import { 
    Alert  
} from 'react-native';

const initState = {
    loggedIn: null,
    authError: null
}
const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'AUTH_SUCCESS':
            console.log('Usuario ingresado');
            // alert("Solicitud creada");
            return {
                ...state,
                loggedIn: true,
            };
        case 'AUTH_ERROR':
            Alert.alert(
                "Aviso",
                action.errorMessage,
                [
                    { 
                        text: "OK"
                    }
                ],
                { cancelable: false }
            );
            return {
                ...state,
                authError: true
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

        case 'USER_INFO_RETRIEVED':
            console.log(action.userInfo)
            return {
                ...state,
                userInfo: action.userInfo
            };
    }
    return state;
}

export default authReducer;