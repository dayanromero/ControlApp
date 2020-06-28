import { SEARCH, SEARCH_SUCCESS, SEARCH_FAILURE, SET_ERROR_FALSE } from '../constants';

import { fetchUser } from '../../../config/api';

export const searchData = () => {
    return {
        type: SEARCH,
    };
};

export const searchDataSuccess = (data) => {
    return {
        type: SEARCH_SUCCESS,
        payload: {
            data,
        },
    };
};

export const searchDataFailure = (data) => {
    return { type: SEARCH_FAILURE };
};

export const setErrorFalse = () => {
    return { type: SET_ERROR_FALSE};
};

export const fetchData = (id) => {
    return (dispatch) => {
        dispatch(searchData());
        fetchUser(id)
            .then((response) => {
                dispatch(searchDataSuccess(response));
                if(!response) {
                    dispatch(searchDataFailure());
                }
            })
            .catch((error) => dispatch(searchDataFailure(error)));
    };
};
