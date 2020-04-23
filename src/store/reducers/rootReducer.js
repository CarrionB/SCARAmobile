import authReducer from './authReducer'
import initReducer from './initReducer'
import recordReducer from './recordReducer';
import requestReducer from './requestReducer'
import scheduleReducer from './scheduleReducer';
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    init: initReducer,
    rec: recordReducer,
    req: requestReducer,
    sched: scheduleReducer
})

export default rootReducer;