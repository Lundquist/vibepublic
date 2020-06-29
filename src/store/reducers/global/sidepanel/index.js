import {combineReducers} from 'redux';
import booking from './booking.reducer'

const sidePanelReducers = combineReducers({
    booking,

})

export default sidePanelReducers;
