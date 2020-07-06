import React, { useState, Fragment } from 'react';
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

    const { t } = props;

    const [selectedCategory, setSelectedCategory] = useState(0);
    const { services, categories } = useSelector(({ global }) => global.services);
    const { currentPage } = useSelector(({ global }) => global.booking);

    function toggleContainer(id) {
        if (selectedCategory !== id) {
            setSelectedCategory(id)
        } else {
            setSelectedCategory(0)
        }
    }

    const setService = (service) => {
        dispatch(Actions.setSelectedService(service.id))
        dispatch(getEmployeesForService(service.id))
        dispatch(Actions.goForward(currentPage))
    }

    const showInfo = (e, service) => {
        e.stopPropagation();
        console.log("hehehee " + service.description)
    }

    const renderUnassignedServices = () => {
        return (
            <div key={0} className={`categoryContainer __flex __sb ${0 === selectedCategory ? "selected" : ""}`} onClick={() => toggleContainer(0)}>
                <div>
                    {t("common.unassigned")}
                </div>
                <div>
                    <KeyboardArrowRightIcon />
                </div>
            </div>
        )
    }

    const renderCategories = (category) => {
        return (
            <div key={category.id} className={`categoryContainer __flex __sb ${category.id === selectedCategory ? "selected" : ""}`} onClick={() => toggleContainer(category.id)}>
                <div>
                    {category.name}
                </div>
                <div>
                    <KeyboardArrowRightIcon />
                </div>
            </div>
        )
    }

    const renderServices = (service) => {
        if (service.category == selectedCategory) {
            let $imagePreview = null;
            if (service.image) {
                console.log(service.image)
                var buffer = new Buffer(service.image);
                // $imagePreview = (<img className="userImage" src={buffer} />);
                $imagePreview = (<img className="userImage" src="https://ca.slack-edge.com/TSVP4QZM3-USJ915H35-6d0088e7a834-512" />)
            } else {
                $imagePreview = (<PhotoSizeSelectActual />);
            }

            return (
                <div className="__flex __service" onClick={() => setService(service)} key={service.id}>
                    <div className='__flex __f1'>
                        <div className='__image-preview'><div></div>{$imagePreview}</div>
                        <div className='__title __col'>
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
        <div className='__flex-strech __bookings-page'>
            <div className='__f1'>
                <h2>Category</h2>
                <div className="__card __f1">
                    {categories.map(renderCategories)}
                    {renderUnassignedServices()}
                </div>
            </div>
            <div className='__f1 __services'>
                <h2>Service</h2>
                <div className="__card">
                    {services.map(renderServices)}
                    {services.map(renderServices)}
                </div>
            </div>
        </div>
    )

}
export default withTranslation()(withReducer('calendarApp', reducer)(SelectService));
