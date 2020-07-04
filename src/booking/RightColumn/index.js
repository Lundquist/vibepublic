import React from 'react';
import { useSelector } from 'react-redux';
import withReducer from '../../store/withReducer';
import reducer from '../../store/reducers';
import moment from 'moment'
import { Map, Marker } from 'google-maps-react';
import './style.scss';

function RightColumn() {
    const { selectedTime } = useSelector(({ global }) => global.booking);
    const { selectedEmployee } = useSelector(({ global }) => global.employees);
    const { selectedService } = useSelector(({ global }) => global.services);
    const { information } = useSelector(({ global }) => global.company);
    console.log(selectedEmployee);
    console.log(selectedService);
    return (
        <div className='__summery'>
            <h2>Summery</h2>
            <div className="__card2">
                <div className='__service__details'>
                    {selectedService.id !== 0 ? (
                        <div>
                            <h3>{selectedService.name}</h3>
                            <div className='__time'>{selectedService.time} minutes</div>
                            {selectedEmployee.firstName !== "" && <div><img src="https://ca.slack-edge.com/TSVP4QZM3-USJ915H35-6d0088e7a834-512" alt={selectedEmployee.firstName} /> {selectedEmployee.firstName} {selectedEmployee.lastName}</div>}
                        </div>
                    ) :
                        "No service selected yet"
                    }
                    <h3 className='__date'>{moment(selectedTime) <= moment() ? null : moment(selectedTime).format('dddd, DD MMMM HH:mm')}</h3>
                </div>
                <b className="__flex __sb">
                    <div>
                        Price:
                        </div>
                    <div>
                        € {selectedService.id !== 0 ? selectedService.price : 0}
                    </div>
                </b>
                <button className='__btn'>Book now</button>
            </div>
            
            <div className="__card2 __contact__information">
                <h3>{information.name}</h3>
                <div>
                    <div>{information.address}</div>
                    <div>{information.phone}</div>
                    <div>{information.email}</div>
                </div>
            </div>
        </div>
    )

}
export default withReducer('calendarApp', reducer)(RightColumn);
