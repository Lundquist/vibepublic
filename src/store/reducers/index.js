import {combineReducers} from 'redux';
import fuse from './fuse';
import quickPanel from 'app/fuse-layouts/shared-components/quickPanel/store/reducers';
import global from './global'
import auth from './user';

const createReducer = (asyncReducers) =>
    combineReducers({
        auth,
        fuse,
        quickPanel,
        global,
        ...asyncReducers
    });

export default createReducer;
