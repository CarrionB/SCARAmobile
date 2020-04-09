import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk'
import firebase from 'react-native-firebase';

export default store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument({firebase})));