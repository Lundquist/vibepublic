import * as Actions from '../../actions';
//import moment from 'moment'
//import i18n from 'i18n';

const initialState = {
    information: {
        id: 0,
        name: "",
        address: "",
        areacode: "",
        city: "",
        country: "",
        phone: "",
        website: "",
        email: "",
        description: "",
        openinghours: "",
        expires: ''
    },
    settings: {
        confirmationEmail: 0,
        pushNotification: 0,
        smsNotification: 0,
        warning: 0,
        extraCharge: 0,
        confirmBookings: 0,
        notifyEmployees: 0,
        companyLanguage: 'en',
        currency: 'euro',
        timezone: '+1',
        cancelationLimit: 0
    },
    services: [],
    customers: [],
    reservations: [],
    initialized: false,
    openinghours: [],
    closedDays: []
};

const companyReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SET_COMPANY:
            {
                return {
                    ...state,
                    information: action.payload,
                };
            }
        case Actions.INITIALIZE_COMPANY:
            {
                return {
                    ...state,
                    initialized: true,
                };
            }
        case Actions.SET_COMPANY_EXPIRES:
            {
                return {
                    ...state,
                    information: {
                        ...state.information,
                        expires: action.payload
                    }
                };
            }
        case Actions.GET_COMPANY_SETTINGS:
            {
                return {
                    ...state,
                    settings: action.payload,
                };
            }
        case Actions.UPDATE_COMPANY_SETTINGS:
            {
                return {
                    ...state,
                    settings: action.payload
                }
            }
        case Actions.ADD_RESERVATION: {
            action.payload.start = new Date(action.payload.start)
            action.payload.end = new Date(action.payload.end)
            return {
                ...state,
                reservations: [...state.reservations, action.payload]
            };
        }
        case Actions.SET_OPENING_HOURS: {
            return {
                ...state,
                openinghours: action.payload
            };
        }
        case Actions.SET_CLOSED_DAYS: {
            return {
                ...state,
                closedDays: action.payload
            };
        }
        case Actions.SET_RESERVATIONS:
            {
                const reservations = action.payload.map((event) => {
                    return (
                        {
                            ...event,
                            title: event.serviceName,
                            start: new Date(event.start),
                            end: new Date(event.end),
                            serviceName: event.serviceName
                        }
                    )
                });


                return {
                    ...state,
                    reservations: reservations
                };
            }
        default:
            {
                return state;
            }
    }
}

export default companyReducer;