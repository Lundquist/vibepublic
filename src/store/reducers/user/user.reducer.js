import * as Actions from '../../actions';

const initialState = {
    role: [],//guest
    data: {
        'displayName': '',
        'photoURL'   : 'assets/images/avatars/Velazquez.jpg',
        'email'      : '',
        shortcuts    : [
            'calendar',
            'mail',
            'contacts',
            'todo'
        ]
    },
    companies: []
};

const user = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SET_USER_DATA:
        {
            return {
                ...state,
                ...action.payload
            };
        }
        case Actions.GET_USER_COMPANIES:
            {
                return {
                    ...state,
                    companies: action.payload
                    
                };
            }
        case Actions.REMOVE_USER_DATA:
        {
            return {
                ...state
            };
        }
        case Actions.USER_LOGGED_OUT:
        {
            return initialState;
        }
        default:
        {
            return state
        }
    }
};

export default user;
