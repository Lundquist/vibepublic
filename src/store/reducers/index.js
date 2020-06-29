import {combineReducers} from 'redux';
import global from './global'

const createReducer = (asyncReducers) =>
    combineReducers({
        global,
        ...asyncReducers
    });

export default createReducer;
