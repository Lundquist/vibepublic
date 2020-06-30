import React from 'react';
import { useSelector } from 'react-redux';
import withReducer from '../../store/withReducer';
import reducer from '../../store/reducers';
import moment from 'moment'
import { Map, Marker } from 'google-maps-react'

import './style.scss';

function RightColumn() {
    const { selectedTime } = useSelector(({ global }) => global.booking);
    const { selectedEmployee } = useSelector(({ global }) => global.employees);
    const { selectedService } = useSelector(({ global }) => global.services);
    const { information } = useSelector(({ global }) => global.company);

    return (
        <div id="rightColumnContainer">
            <div id="serviceHeader">Summary</div>
            <div className="rightSection" id="bookingInformation">
                <div id="top">
                    <div className="infoRow" id="nameContainer">{selectedService.id !== 0 ? selectedService.name : "No service selected yet"}</div>
                    <div className="infoRow">{selectedEmployee.firstName} {selectedEmployee.lastName}</div>
                    <div className="infoRow">{moment(selectedTime) <= moment() ? null : moment(selectedTime).format('YYYY-MM-DD HH:mm')}</div>
                </div>
                <div id="bottom">
                    <div className="infoRow" id="priceRow">
                        <div>
                            Price:
                        </div>
                        <div>
                            € {selectedService.id !== 0 ? selectedService.price : 0}
                        </div>
                    </div>
                </div>
            </div>

            <div className="rightSection" id="companyInformation">
                <div className="infoRow" id="nameContainer">{information.name}</div>
                <div id="locationInformation">
                    <div className="infoRow">{information.address}</div>
                    <div className="infoRow">{information.phone}</div>
                    <div className="infoRow">{information.email}</div>
                </div>
            </div>
        </div>
    )

}
export default withReducer('calendarApp', reducer)(RightColumn);
