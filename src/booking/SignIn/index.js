import React from 'react';
import { useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from 'app/store/reducers';

import './style.scss';

function BookingInfo() {
    const  { information }  = useSelector(({global}) => global.company);

    return (
        <div >
            <div>Logga In</div>
        </div>

    )

}
export default withReducer('calendarApp', reducer)(BookingInfo);
