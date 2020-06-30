import React, { useState } from 'react';
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
            <div key={0} className={0 === selectedCategory ? "categoryContainer selected" : "categoryContainer"} onClick={() => toggleContainer(0)}>
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
            <div key={category.id} className={category.id === selectedCategory ? "categoryContainer selected" : "categoryContainer"} onClick={() => toggleContainer(category.id)}>
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
                var buffer = new Buffer(service.image);
                $imagePreview = (<img className="userImage" src={buffer} />);
            } else {
                $imagePreview = (<img className="userImage" src={defaultImage} />);
            }

            return (
                <div id="serviceDivContainer" key={service.id}>
                    <div className="serviceDiv" onClick={() => setService(service)}>
                        <div id="serviceImage">
                            {$imagePreview}
                        </div>
                        <div id="infoDiv">
                            <div id="nameDiv">
                                {service.name}
                                <div id="timeDiv">
                                    {service.time} min
                            </div>
                            </div>
                            <div id="priceDiv">
                                € {service.price}
                            </div>
                            {service.description !== null ? <div id="infoImage" onClick={(e) => showInfo(e, service)}>
                                <InfoOutlinedIcon className={classes.infoIcon} />
                            </div> : <div id="infoImage" />}
                        </div>

                    </div>

                </div>
            )
        }

    }

    //            

    return (
        <div id="selectServiceContainer">
            <div className="selectCategory">
                <div className="serviceHeader">Category</div>
                <div className="container">
                    {categories.map(renderCategories)}
                    {renderUnassignedServices()}
                </div>
            </div>
            <div className="servicesContainer">
                <div className="serviceHeader">Service</div>
                <div className="container">
                    {services.map(renderServices)}
                </div>
            </div>

        </div>
    )

}
export default withTranslation()(withReducer('calendarApp', reducer)(SelectService));
