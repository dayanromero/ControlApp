import {
    GET_STATISTICS,
    GET_STATISTICS_SUCCESS,
    GET_STATISTICS_FAILURE
} from '../constants';

const initialState = {
    data: null,
    loading: false,
    error: false,
};

export default getStatisticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STATISTICS:
            return {
                ...state,
                data: null,
                loading: true,
            };
        case GET_STATISTICS_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false,
            };
        case GET_STATISTICS_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};
