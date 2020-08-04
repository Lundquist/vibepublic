import React, { useState, useEffect, useRef } from 'react';
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
    const { services, categories } = useSelector(({ global }) => global.services);
    const { currentPage } = useSelector(({ global }) => global.booking);
    const [selectedCategory, setSelectedCategory] = useState(categories.length > 0 ? categories[0].id : 0);
    
    function toggleContainer(id, e) {
        setSelectedCategory(id)
/*
        if (selectedCategory !== id) {
            setSelectedCategory(id)
        } else {
            setSelectedCategory(1)
        }*/
        e.target.scrollIntoView();
        servicesWrapper.current.scrollIntoView();
    }
    useEffect(() => {
        setSelectedCategory(categories.length > 0 ? categories[0].id : 0)
    }, [categories]);

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
            pathname: `${pathname}service='${service.name.split(' ').join('-')}'/select-employee` ,
            search,
        })

        
    }

    const PopUpInfo = ({ service, close, click }) => (
        <DialogBox className='__popup' title={service.name} close={close}>
            {service.description}
            <button className='__btn' onClick={(e) => selectedService(service)}>Book</button>
        </DialogBox>
    )
    const renderServices = (service) => {
        if (service.category == selectedCategory) {
            let $imagePreview = (<img className="serviceImage" src={'https://vibeserviceimage.s3.eu-west-3.amazonaws.com/' + service.image} onError={(e) => addDefaultSrc(e)} />);
            const addDefaultSrc = (ev) => {
                ev.target.src = "https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
            }
        
            return (
                <div className="__flex __service" onClick={(e) => selectedService(service)} key={service.id}>
                    <div className='__flex-strech __f1'>
                        <div className='__image-preview'id={service.image === null ? "noImage" : "image"}>{$imagePreview}</div>
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
                <h2>{t('category')}</h2>
                <div className="__card2 __f1 __categories-wrapper">
                {categories.map(renderCategories)}  
                </div>
            </div>
            <div className='__f1 __services'>
                <h2>{t('service')}</h2>
                <div className="__card2">
                    {services.map(renderServices)}
                </div>
            </div>
        </div>
    )

}



export default withTranslation()(withReducer('calendarApp', reducer)(SelectService));