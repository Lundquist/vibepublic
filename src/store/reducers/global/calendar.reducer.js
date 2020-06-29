import * as Actions from '../../actions';

const initialState = {
    events: [],
    eventDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    },
};

const eventsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_EVENTS:
            {
                const events = action.payload.map((event) => (
                    (
                        {
                            ...event,
                            title: event.service.name,
                            start: new Date(event.start),
                            end: new Date(event.end),
                            service: event.service
                        }
                    )
                ));

                return {
                    ...state,
                    events
                };
            }
        case Actions.OPEN_NEW_EVENT_DIALOG:
            {
                return {
                    ...state,
                    eventDialog: {
                        type: 'new',
                        props: {
                            open: true
                        },
                        data: {
                            ...action.data
                        }
                    }
                };
            }
        case Actions.CLOSE_NEW_EVENT_DIALOG:
            {
                return {
                    ...state,
                    eventDialog: {
                        type: 'new',
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }
        case Actions.OPEN_EDIT_EVENT_DIALOG:
            {
                const customer = JSON.parse(action.data.customer)
                return {
                    ...state,
                    eventDialog: {
                        type: 'edit',
                        props: {
                            open: true
                        },
                        data: {
                            ...action.data,
                            title: JSON.parse(action.data.service),
                            start: new Date(action.data.start),
                            end: new Date(action.data.end),
                            customer: customer.name + " " + customer.phone
                        }
                    }
                };
            }
        case Actions.CLOSE_EDIT_EVENT_DIALOG:
            {
                return {
                    ...state,
                    eventDialog: {
                        type: 'edit',
                        props: {
                            open: false
                        },
                        data: null
                    }
                };
            }
        default:
            {
                return state;
            }
    }
};

export default eventsReducer;