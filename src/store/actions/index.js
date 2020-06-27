import { LOCATION, LOCATION_SUCCESS, LOCATION_FAILURE } from '../constants/index';

import { fetchLocation } from '../../config/api/index';

export const getLocation = () => {
    return {
        type: LOCATION,
    };
};

export const getLocationSuccess = (data) => {
    return {
        type: LOCATION_SUCCESS,
        payload: {
            data,
        },
    };
};

export const getLocationFailure = (data) => {
    return { type: LOCATION_FAILURE };
};

export const fetchDataLocations = () => {
    return (dispatch) => {
        dispatch(getLocation());
        fetchLocation()
            .then((response) => {
                dispatch(getLocationSuccess(response));
            })
            .catch((error) => dispatch(getLocationFailure(error)));
    };
};
