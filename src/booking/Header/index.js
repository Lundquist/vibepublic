import React from 'react';
import './style.scss';
import withReducer from '../../store/withReducer';
import reducer from '../../store/reducers';
import { useSelector } from 'react-redux';

function BookingInfo() {
    const { information } = useSelector(({ global }) => global.company);
    const backgroundImage = 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';

    return (
        <div id="headerContainer">
            <div className="headerImage" />
            <div className="__title">
                {information.name}
            </div>
        </div>
    )
}

export default withReducer('calendarApp', reducer)(BookingInfo);
