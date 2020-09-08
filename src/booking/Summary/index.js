import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import withReducer from '../../store/withReducer';
import reducer from '../../store/reducers';
import moment from 'moment'
import { Map, Marker } from 'google-maps-react';
import './style.scss';
import { withTranslation } from 'react-i18next';
import profileImage from '../SelectEmployee/assets/profile.png'


function Summary(props) {
    const { t } = props;
    const { selectedTime, currentPage } = useSelector(({ global }) => global.booking);
    const { selectedEmployee } = useSelector(({ global }) => global.employees);
    const { selectedService } = useSelector(({ global }) => global.services);
    const { information } = useSelector(({ global }) => global.company);

    const getEndingTime = () => {
        let minutes = +moment(selectedTime).format('mm') + +selectedService.time;
        let hours = +moment(selectedTime).format('HH');

        if (minutes > 60) {
            minutes = minutes - 60;
            hours++;
        }

        hours.toString().length < 2 && (hours = `0${hours}`);
        minutes.toString().length < 2 && (minutes = `0${minutes}`);

        return (
            <div id="showSelectedTimeContainer">
                <div id="showSelectedTimeContainerDate">
                    {moment(selectedTime).format('dddd, DD MMMM HH:mm')}
                </div>
                <div id="showSelectedTimeContainerTime">
                    {hours} - {minutes}
                </div>
            </div>
        )
    }
    let $imagePreview = (<img className="userImage" src={'https://vibeemployeeimage.s3.eu-west-3.amazonaws.com/' + selectedEmployee.userImage} onError={(e) => addDefaultSrc(e)} />);
    const addDefaultSrc = (ev) => {
        ev.target.src = profileImage
    }

    return (
        <div className='__summery'>
            <h2> {t("summary")}</h2>
            <div className="__card2">
                <div id="companyInfomation">
                    <h3>{information.name}</h3>
                    <div id="companyDetails">
                        <div>{information.address}</div>
                        <div>{information.phone}</div>
                        <div>{information.email}</div>
                    </div>
                </div>
                <div className='__service__details'>
                    {selectedService.id !== 0 ? (
                        <div>
                            <h4>{selectedService.name}</h4>
                            <div className='__time'>{selectedService.time} minutes</div>
                            {selectedEmployee.firstname !== "" && <div className='__flex'>{$imagePreview} {selectedEmployee.firstname} {selectedEmployee.lastname}</div>}
                        </div>
                    ) :
                        t('noService')
                    }
                    {moment(selectedTime) >= moment() && <h3 className='__date'>{getEndingTime()}</h3>}
                </div>
                <b className="__flex __sb">
                    
                    Precio:<div>{selectedService.id !== 0 ? selectedService.price : 0} €</div>
                </b>
                {moment(selectedTime) >= moment() && currentPage < 2 && <button className='__btn'>Reservar ahora</button>}
            </div>
        </div>
    )

}
export default withTranslation()(withReducer('calendarApp', reducer)(Summary));