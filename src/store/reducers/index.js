import {combineReducers} from 'redux';
import booking from './booking.reducer'

const globalReducers = combineReducers({
    company,
    calendar,
    services,
    employees,
    sidepanel,
    customers,
    venue,
    booking
});

export default globalReducers;
