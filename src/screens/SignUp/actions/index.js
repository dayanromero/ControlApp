import {
    CREATE_ESTABLISHMENT,
    CREATE_ESTABLISHMENT_SUCCESS,
    CREATE_ESTABLISHMENT_FAILURE,
    CLEAR_ESTABLISHMENT,
} from '../constants';

import { createEstablishment } from '../../../config/api';

export const saveEstablishment = (data) => {
    return {
        type: CREATE_ESTABLISHMENT,
        payload: {
            data
        }
    };
};

export const saveEstablishmentSuccess = (data) => {
    return {
        type: CREATE_ESTABLISHMENT_SUCCESS,
        payload: {
            data,
        },
    };
};

export const saveEstablishmentFailure = (data) => {
    return { type: CREATE_ESTABLISHMENT_FAILURE };
};

export const resetEstablishmentValues = () => {
    return { type: CLEAR_ESTABLISHMENT };
};

export const saveNewEstablishment = (data) => {
    return (dispatch) => {
        dispatch(saveEstablishment(data));
        createEstablishment(data)
            .then((response) => {
                dispatch(saveEstablishmentSuccess(response));
                if (!response) {
                    dispatch(saveEstablishmentFailure());
                }
            })
            .catch((error) => {
                dispatch(saveEstablishmentFailure(error))
            });
    };
};