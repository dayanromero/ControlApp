import {
    EDIT_USER,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAILURE,
    RESET_VALUES
} from '../constants';

import { updateUser } from '../../../config/api';

export const editUser = (id, data) => {
    return {
        type: EDIT_USER,
        payload: data

    };
};

export const editUserSuccess = (data) => {
    return {
        type: EDIT_USER_SUCCESS,
        payload: {
            data,
        },
    };
};

export const editUserFailure = (data) => {
    return { type: EDIT_USER_FAILURE };
};

export const resetValues = () => {
    return { type: RESET_VALUES};
};

export const editNewUser = (id, values) => {
    return (dispatch) => {
        dispatch(editUser(id, values));
        updateUser(id, values)
            .then((response) => {
                dispatch(editUserSuccess(response));
                if (!response) {
                    dispatch(editUserFailure());
                }
            })
            .catch((error) => {
                dispatch(editUserFailure(error))
            });
    };
};


