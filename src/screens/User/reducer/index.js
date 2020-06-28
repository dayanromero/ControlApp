import { ACTIVITY, ACTIVITY_SUCCESS, ACTIVITY_FAILURE } from '../constants/index';

const initialState = {
    data: null,
    loading: false,
    error: false,
};

export default activityReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIVITY:
            return {
                ...state,
                data: null,
                loading: true,
            };
        case ACTIVITY_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false,
            };
        case ACTIVITY_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};
