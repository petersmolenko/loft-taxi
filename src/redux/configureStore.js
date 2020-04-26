import { createStore, applyMiddleware, combineReducers } from 'redux';
import auth, {loginMiddleware, signupMiddleware} from './modules/auth'
import profile, {fetchProfileMiddleware} from './modules/profile'

const createStoreWithMiddleware = applyMiddleware( loginMiddleware, signupMiddleware, fetchProfileMiddleware)(createStore); 

const reducer = combineReducers({
  auth, profile
});

const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState);
export default configureStore;