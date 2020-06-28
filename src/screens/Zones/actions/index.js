import {
    FETCH_ZONE,
    FETCH_ZONE_SUCCESS,
    FETCH_ZONE_FAILURE,
    RESET_FETCH_ZONE,
    DELETE_ZONE,
    DELETE_ZONE_SUCCESS,
    DELETE_ZONE_FAILURE,
    DELETE_ZONE_DATA
 } from '../constants';

import { getZones, deleteZones } from '../../../config/api';

export const fecthZone = (data) => {
    return {
        type: FETCH_ZONE,
        payload: {
            data
        }
    };
};

export const fecthZoneSuccess = (data) => {
    return {
        type: FETCH_ZONE_SUCCESS,
        payload: {
            data,
        },
    };
};

export const fecthZoneFailure = (data) => {
    return { type: FETCH_ZONE_FAILURE };
};

export const reseFecthZoneValues = () => {
    return { type: RESET_FETCH_ZONE};
};

export const fetchZones = (data) => {
    return (dispatch) => {
        dispatch(fecthZone(data));
        getZones(data)
            .then((response) => {
                dispatch(fecthZoneSuccess(response));
                if (!response) {
                    dispatch(fecthZoneFailure());
                }
            })
            .catch((error) => {
                dispatch(fecthZoneFailure(error))
            });
    };
};

export const deleteZone = (id) => {
    return {
        type: DELETE_ZONE,
        payload: {
            id
        }
    };
};

export const deleteZoneSuccess = (data) => {
    return {
        type: DELETE_ZONE_SUCCESS,
        payload: {
            data,
        },
    };
};

export const deleteZoneFailure = (data) => {
    return { type: DELETE_ZONE_FAILURE };
};

export const deleteZoneData = () => {
    return { type: DELETE_ZONE_DATA };
};

export const deleteZonesLocation = (id) => {
    return (dispatch) => {
        dispatch(deleteZone(id));
        deleteZones(id)
            .then((response) => {
                dispatch(deleteZoneSuccess(response));
                if (!response) {
                    dispatch(deleteZoneFailure());
                }
            })
            .catch((error) => {
                dispatch(deleteZoneFailure(error))
            });
    };
};