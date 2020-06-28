import { SEARCH, SEARCH_SUCCESS, SEARCH_FAILURE, SET_ERROR_FALSE } from '../constants';

const initialState = {
    data: null,
    loading: false,
    error: false,
    registro: false
};

export default searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH:
            return {
                ...state,
                data: null,
                loading: true,
            };
        case SEARCH_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false,
            };
        case SEARCH_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case SET_ERROR_FALSE:
            return {
                ...state,
                error: false
            }
        default:
            return state;
    }
};
