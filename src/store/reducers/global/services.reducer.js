import * as Actions from 'app/store/actions';

const initialState = {
    employees: [],
    selectedService: { id: 0 },
    services: [],
    categories: [],
    selectedCategory: {id: 0}
}

const servicesReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.EMPLOYEES_FOR_SERVICE:
            {
                return {
                    ...state,
                    employees: action.payload
                };
            }
        case Actions.SET_SELECTED_SERVICE:
            {
                const selectedService = action.payload !== 'new' && action.payload !== 0 ? state.services.find((service) => service.id === action.payload) : {id:0};
                return {
                    ...state,
                    selectedService: selectedService
                };
            }
        case Actions.GET_SERVICES: {
            return {
                ...state,
                services: action.payload
            };
        }
        case Actions.GET_CATEGORIES: {
            return {
                ...state,
                categories: action.payload
            };
        }
        case Actions.ADD_SERVICE: {
            const serviceList = state.services.concat({
                ...action.payload
            });
            return {
                ...state,
                services: serviceList
            };
        }
        case Actions.SAVE_SERVICE: {
            state.services.find((service) =>{ if(service.id === action.payload.id){
                service.name = action.payload.name;
                service.price = action.payload.price;
                service.time = action.payload.time
                service.category = action.payload.category
                service.description = action.payload.description
            }})
            return {
                ...state,
            };
        }

        case Actions.REMOVE_SERVICE: {
            const serviceId = action.payload;
            const serviceList = state.services.filter((service) => service.id !== serviceId);

            return {
                ...state,
                services: serviceList
            };
        }

        case Actions.SET_SELECTED_CATEGORY: {
            let filteredCategory = state.categories.find((category) => category.id === action.payload);
            if(filteredCategory === undefined){
                filteredCategory = {
                    id: 0
                }
            }
            return {
                ...state,
                selectedCategory: filteredCategory
            };
        }
        
        default:
            {
                return state;
            }
    }
};

export default servicesReducer;