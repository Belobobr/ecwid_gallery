import {combineReducers} from 'redux'
import navigation from './navigation'
import gallery from './gallery';

const rootReducer = combineReducers({
    navigation,
    gallery,
});

export default rootReducer