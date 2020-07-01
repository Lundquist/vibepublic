import React from 'react';
import './style.scss';
import withReducer from '../../store/withReducer';
import reducer from '../../store/reducers';
import { useSelector } from 'react-redux';

function BookingInfo() {
    const { information } = useSelector(({ global }) => global.company);
    const backgroundImage = 'https://imageproxy.b17g.services/convert.jpeg?imformat=generic&quality=80&resize=375x204&shape=trimcut&source=https%3A%2F%2Fwww.fotbollskanalen.se%2FImageHandler.axd%3FimageFormat%3Doriginal%26guid%3Dd9507e5e-18d6-45f8-8932-81ddd1647384&retina=true';

    return (
        <div id="headerContainer">
            <div className="headerImage" style={{ backgroundImage: `url(${backgroundImage})` }} />
            <div id="headerTextContainer">
                {information.name}
            </div>
        </div>
    )
}

export default withReducer('calendarApp', reducer)(BookingInfo);
