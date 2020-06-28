import {
    CREATE_ZONE,
    CREATE_ZONE_SUCCESS,
    CREATE_ZONE_FAILURE,
    RESET_ZONE,
} from '../constants';

import { createZone} from '../../../config/api';

export const saveZone = (data) => {
    return {
        type: CREATE_ZONE,
        payload: {
            data
        }
    };
};

export const saveZoneSuccess = (data) => {
    return {
        type: CREATE_ZONE_SUCCESS,
        payload: {
            data,
        },
    };
};

export const saveZoneFailure = (data) => {
    return { type: CREATE_ZONE_FAILURE };
};

export const resetZoneValues = () => {
    return { type: RESET_ZONE};
};

export const saveNewZone = (data) => {
    return (dispatch) => {
        dispatch(saveZone(data));
        createZone(data)
            .then((response) => {
                dispatch(saveZoneSuccess(response));
                if (!response) {
                    dispatch(saveZoneFailure());
                }
            })
            .catch((error) => {
                dispatch(saveZoneFailure(error))
            });
    };
};