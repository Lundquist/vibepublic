export const TOGGLE_HEADER_STATS = '[NAVBAR] TOGGLE_HEADER_STATS';
export const TOGGLE_NAVBAR = '[NAVBAR] TOGGLE_NAVBAR';
export const SEARCH_SIDEBAR = '[NAVBAR] SEARCH_SIDEBAR';

export const CLOSE_SIDE_PANEL = '[SIDEPANEL] CLOSE SIDE PANEL';
export const TOGGLE_SEARCH_PANEL = '[SIDEPANEL] TOGGLE SERACH PANEL';
export const TOGGLE_BOOKING_PANEL = '[SIDEPANEL] TOGGLE BOOKING PANEL';
export const TOGGLE_SETTINGS_PANEL = '[SIDEPANEL] TOGGLE SETTINGS PANEL';
export const TOGGLE_CUSTOMERS_PANEL = '[SIDEPANEL] TOGGLE CUSTOMERS PANEL';
export const TOGGLE_EDIT_EMPLOYEE_PANEL = '[SIDEPANEL] TOGGLE NEW EMPLOYEE PANEL';
export const TOGGLE_EMPLOYEE_PANEL = '[SIDEPANEL] TOGGLE EMPLOYEE PANEL';
export const TOGGLE_SERVICE_PANEL = '[SIDEPANEL] TOGGLE SERVICES PANEL';
export const TOGGLE_COMPANY_INFORMATION_PANEL = '[SIDEPANEL] TOGGLE COMPANY INFORMATION PANEL';

export const TOGGLE_LOCATION_SETTINGS = '[SIDEPANEL] TOGGLE_LOCATION_SETTINGS';
export const TOGGLE_BOOKING_SETTINGS = '[SIDEPANEL] TOGGLE_BOOKING_SETTINGS';
export const TOGGLE_BOOKING_CONTACT_SETTINGS = '[SIDEPANEL] TOGGLE_BOOKING_CONTACT_SETTINGS';
export const TOGGLE_PAYMENT_SETTINGS = '[SIDEPANEL] TOGGLE_PAYMENT_SETTINGS';
export const TOGGLE_PLUGIN_SETTINGS = '[SIDEPANEL] TOGGLE_PLUGIN_SETTINGS';
export const TOGGLE_SUBSCRIPTION_SETTINGS = '[SIDEPANEL] TOGGLE_SUBSCRIPTION_SETTINGS';
export const TOGGLE_HOMEPAGE_SETTINGS = '[SIDEPANEL] TOGGLE_HOMEPAGE_SETTINGS';
export const TOGGLE_CATEGORY_PANEL = '[SIDEPANEL] TOGGLE_CATEGORY_PANEL';

export function search(data, searchType)
{
    return {
        type: SEARCH_SIDEBAR,
        payload: data,
        searchType: searchType

    }
}

export function showCustomer(data){
    return {
        type: TOGGLE_CUSTOMERS_PANEL,
        payload: data,
    }
}

export function toggleBookingPanel(data){
    return{
        type: TOGGLE_BOOKING_PANEL,
        payload: data
    }
}

export function toggleServicePanel(){return {type: TOGGLE_SERVICE_PANEL}};

export const toggleCategoryPanel = () => ({ type: TOGGLE_CATEGORY_PANEL });

export const toggleCompanyInformation = () => ({ type: TOGGLE_COMPANY_INFORMATION_PANEL });

export const closeSidePanel = () => ({ type: CLOSE_SIDE_PANEL });

export const toggleSettingsPanel = () => ({ type: TOGGLE_SETTINGS_PANEL });

export const toggleSearchPanel = () => ({ type: TOGGLE_SEARCH_PANEL });

export const toggleNavbar = () => ({ type: TOGGLE_NAVBAR });

export const toggleHeaderStats = () => ({ type: TOGGLE_HEADER_STATS });

export const toggleEmployeePanel = () => ({ type: TOGGLE_EMPLOYEE_PANEL });

export const toggleLocationSettings = () => ({ type: TOGGLE_LOCATION_SETTINGS });

export const toggleBookingSettings = () => ({ type: TOGGLE_BOOKING_SETTINGS });

export const toggleBookingContactSettings = () => ({ type: TOGGLE_BOOKING_CONTACT_SETTINGS });

export const togglePaymentSettings = () =>({type: TOGGLE_PAYMENT_SETTINGS});

export const togglePluginSettings = () =>({type: TOGGLE_PLUGIN_SETTINGS});

export const toggleSubscriptionSettings = () =>({type: TOGGLE_SUBSCRIPTION_SETTINGS});

export const toggleHomePageSettings = () =>({type: TOGGLE_HOMEPAGE_SETTINGS});



