import authReducer from './authReducer'
import requestReducer from './requestReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    req: requestReducer
})

export default rootReducer;