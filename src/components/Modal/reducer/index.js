import {
    CREATE_ACTIVITY,
    CREATE_ACTIVITY_SUCCESS,
    CREATE_ACTIVITY_FAILURE,
    RESET_ACTIVITY
} from '../constants';

const initialState = {
    data: null,
    loading: false,
    error: false,
};

export default createActivityReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ACTIVITY:
            return {
                ...state,
                data: null,
                loading: true,
            };
        case CREATE_ACTIVITY_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false,
            };
        case CREATE_ACTIVITY_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case RESET_ACTIVITY:
            return {
                ...state,
                data: null
            }
        default:
            return state;
    }
};
