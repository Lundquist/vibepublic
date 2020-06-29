import {combineReducers} from 'redux';
import company from './company.reducer';
import calendar from './calendar.reducer';
import services from './services.reducer'
import employees from './employees.reducer'
import sidepanel from './sidepanel'
import customers from './customers.reducer'
import venue from './venue.reducer'
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
