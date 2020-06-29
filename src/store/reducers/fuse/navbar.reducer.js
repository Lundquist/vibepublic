import * as Actions from '../../actions/fuse/index';

const initialState = {
    foldedOpen: false,
    currentPanel: null,
    isNavbarOpen: false,
    headerStatsOpen: false,
    searchString: '',
    selectedCustomer: null,
    searchType: ''
};

const navbar = function (state = initialState, action) {
    switch (action.type) {
        case Actions.TOGGLE_SEARCH_PANEL: {
            if (action.payload !== '') {
                return {
                    ...state,
                    foldedOpen: !state.foldedOpen,
                    searchString: '',
                    selectedCustomer: null
                }
            }
        }
        case Actions.SEARCH_SIDEBAR:
            {
                return {
                    ...state,
                    foldedOpen: true,
                    searchString: action.payload,
                    searchType: action.searchType ? action.searchType : state.searchType,
                    currentPanel: 'SEARCH_PANEL'
                }

            }
        case Actions.TOGGLE_CUSTOMERS_PANEL: {
            if (action.payload !== null) {
                return {
                    ...state,
                    foldedOpen: true,
                    selectedCustomer: action.payload,
                    searchString: '',
                    currentPanel: 'CUSTOMER_PANEL'
                }
            }

            return {
                ...state,
                foldedOpen: false,
                searchString: '',
                selectedCustomer: null,
            }
        }

        case Actions.CLOSE_SIDE_PANEL: {
            return {
                ...state,
                foldedOpen: false,
                currentPanel: null
            }
        }

        case Actions.TOGGLE_BOOKING_PANEL: {
            return {
                ...state,
                foldedOpen: true,
                currentPanel: 'BOOKING_PANEL'

            }
        }

        case Actions.TOGGLE_BOOKING_SETTINGS: {
            return {
                ...state,
                foldedOpen: true,
                currentPanel: 'BOOKING_SETTINGS'
            }
        }

        case Actions.TOGGLE_BOOKING_CONTACT_SETTINGS: {
            return {
                ...state,
                foldedOpen: true,
                currentPanel: 'BOOKING_CONTACT'
            }
        }

        case Actions.TOGGLE_SETTINGS_PANEL: {
            return {
                ...state,
                foldedOpen: true,
                currentPanel: 'SETTINGS_PANEL'
            }
        }

        case Actions.TOGGLE_EMPLOYEE_PANEL: {
            console.log("SomethingSomthing darkSide " + state.currentPanel)
            return {
                ...state,
                foldedOpen: true,
                currentPanel: 'EMPLOYEE_PANEL'
            }
        }

        case Actions.TOGGLE_NAVBAR: {
            return {
                ...state,
                isNavbarOpen: !state.isNavbarOpen
            }
        }

        case Actions.TOGGLE_HEADER_STATS: {
            return {
                ...state,
                headerStatsOpen: !state.headerStatsOpen
            }
        }

        case Actions.TOGGLE_SERVICE_PANEL: {
            return {
                ...state,
                foldedOpen: true,
                currentPanel: 'SERVICE_PANEL'
            }
        }
        case Actions.TOGGLE_SUBSCRIPTION_SETTINGS: {
            return {
                ...state,
                foldedOpen: true,
                currentPanel: 'SUBSCRIPTION_PANEL'
            }
        }

        case Actions.TOGGLE_LOCATION_SETTINGS: {
            return {
                ...state,
                foldedOpen: true,
                currentPanel: 'LOCATION_PANEL'
            }
        }

        case Actions.TOGGLE_PAYMENT_SETTINGS: {
            return {
                ...state,
                foldedOpen: true,
                currentPanel: 'PAYMENT_PANEL'
            }
        }

        case Actions.TOGGLE_PLUGIN_SETTINGS: {
            return {
                ...state,
                foldedOpen: true,
                currentPanel: 'PLUGIN_PANEL'
            }
        }

        case Actions.TOGGLE_HOMEPAGE_SETTINGS: {
            return {
                ...state,
                foldedOpen: true,
                currentPanel: 'HOMEPAGE_PANEL'
            }
        }
        case Actions.TOGGLE_COMPANY_INFORMATION_PANEL: {
            return {
                ...state,
                foldedOpen: true,
                currentPanel: 'COMPANY_INFORMATION_PANEL'
            }
        }

        case Actions.TOGGLE_CATEGORY_PANEL: {
            return {
                ...state,
                foldedOpen: true,
                currentPanel: 'CATEGORY_PANEL'
            }
        }


        default: {
            return state;
        }
    }
};

export default navbar;
