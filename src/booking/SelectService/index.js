import React, { useState, Fragment, useRef } from 'react';
import './style.scss';
import * as Actions from '../../store/actions';
import { getEmployeesForService } from '../../api'
import { useDispatch, useSelector } from 'react-redux';
import withReducer from '../../store/withReducer';
import reducer from '../../store/reducers';
import { withTranslation } from 'react-i18next';
import defaultImage from './assets/add-photo.svg'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import PhotoSizeSelectActual from '@material-ui/icons/PhotoSizeSelectActual'
import DialogBox from '../../ui/DialogBox/DialogBox';

function iconStyles() {
    return {
        infoIcon: {
            color: '#212121',
        },
    }
}


function SelectService(props) {
    const dispatch = useDispatch();
    const classes = makeStyles(iconStyles)();
    const servicesWrapper = useRef();
    const { t } = props;

    const [selectedCategory, setSelectedCategory] = useState(0);
    const { services, categories } = useSelector(({ global }) => global.services);
    const { currentPage } = useSelector(({ global }) => global.booking);

    function toggleContainer(id, e) {
        if (selectedCategory !== id) {
            setSelectedCategory(id)
        } else {
            setSelectedCategory(0)
        }
        e.target.scrollIntoView();
        servicesWrapper.current.scrollIntoView();
    }

    const setService = (service) => {
        dispatch(Actions.setSelectedService(service.id))
        dispatch(getEmployeesForService(service.id))
        dispatch(Actions.goForward(currentPage))
    }

    const [selectedInfo, setSelectedInfo] = useState(null);
    const showInfo = (e, service) => {
        e.stopPropagation();
        setSelectedInfo(service);
    }

    const renderUnassignedServices = () => {
        return (
            <div key={0} className={`categoryContainer __flex __sb ${0 === selectedCategory ? "selected" : ""}`} onClick={(e) => toggleContainer(0, e)}>
                {t("common.unassigned")}
                <KeyboardArrowRightIcon />
            </div>
        )
    }

    const renderCategories = (category) => {
        return (
            <div key={category.id} className={`categoryContainer __flex __sb ${category.id === selectedCategory ? "selected" : ""}`} onClick={(e) => toggleContainer(category.id, e)}>
                {category.name}
                <KeyboardArrowRightIcon />
            </div>
        )
    }

    const selectedService = (service) => {
        setService(service);
        const {pathname, search} = props.location;
        props.history.push({
            pathname: `${pathname}/service='${service.name.split(' ').join('-')}'/select-employee` ,
            search,
        })
        
    }
    const renderServices = (service) => {
        if (service.category == selectedCategory) {
            let $imagePreview = null;
            if (service.image) {
                var buffer = new Buffer(service.image);
                // $imagePreview = (<img className="userImage" src={buffer} />);
                $imagePreview = (<img className="userImage" src="https://ca.slack-edge.com/TSVP4QZM3-USJ915H35-6d0088e7a834-512" />)
            } else {
                $imagePreview = (<PhotoSizeSelectActual />);
            }

            return (
                <div className="__flex __service" onClick={(e) => selectedService(service)} key={service.id}>
                    <div className='__flex-strech __f1'>
                        <div className='__image-preview'><div></div>{$imagePreview}</div>
                        <div className='__title'>
                            {service.name}
                            <div className='__small'>
                                {service.time} min
                            </div>
                        </div>
                    </div>
                    <div className='__flex __footer'>
                        € {service.price}
                        {service.description !== null ? <InfoOutlinedIcon onClick={(e) => showInfo(e, service)} />
                            : <div className="__infoImage" />}
                    </div>
                </div>
            )
        }

    }

    //            

    return (
        <div className='__flex-strech __bookings-page' ref={servicesWrapper}>
            {selectedInfo && <PopUpInfo service={selectedInfo} close={() => setSelectedInfo(null)} click={(service) => setService(service)} />}
            <div className='__f1'>
                <h2>Category</h2>
                <div className="__card __f1 __categories-wrapper">
                    {categories.map(renderCategories)}
                    {renderUnassignedServices()}
                </div>
            </div>
            <div className='__f1 __services'>
                <h2>Service</h2>
                <div className="__card">
                    {services.map(renderServices)}
                </div>
            </div>
        </div>
    )

}

const PopUpInfo = ({ service, close, click }) => (
    <DialogBox className='__popup' title={service.name} close={close}>
        {service.description}
        <button className='__btn' onClick={() => click(service)}>Book</button>
    </DialogBox>
)

export default withTranslation()(withReducer('calendarApp', reducer)(SelectService));