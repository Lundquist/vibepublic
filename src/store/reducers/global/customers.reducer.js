import * as Actions from '../../actions';

const initialState = {
    customers: [],
    selectedTags:[],
    selectedCustomer: ''
};

const customersReducer = function (state = initialState, action) {
    const { type, payload, id } = action;

    switch (type) {
        case Actions.GET_CUSTOMERS:
            {
                return {
                    ...state,
                    customers: action.payload
                };
            }
        case Actions.GET_CUSTOMER_RESERVATIONS: {
            return {
                ...state,
                reservations: payload.Rows
            }
        }
        case Actions.UPDATE_TAGS: {
            let tempState = state;

            tempState.customers.map((v, k) => {
                if(v.userId === id){
                    v.tag = payload.Rows.tags
                }
            })
            return {
                ...state,
                tempState
            }

        }
        case Actions.SELECT_TAGS: {
            return {
                ...state,
                tags: payload
            }
        }
        case Actions.SET_CUSTOMER: {
            return{
                ...state,
                selectedCustomer: action.payload

            }
        }
        default: {
            return state;
        }
    }
};

export default customersReducer;
