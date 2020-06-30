import {combineReducers} from 'redux';
import global from './global'
import booking from './global/sidepanel/'
const createReducer = (asyncReducers) =>
    combineReducers({
        global,
        booking
    });

export default createReducer;
