import {
  CREATE_ESTABLISHMENT,
  CREATE_ESTABLISHMENT_SUCCESS,
  CREATE_ESTABLISHMENT_FAILURE,
  CLEAR_ESTABLISHMENT,
} from '../constants';

import {createZone} from '../../../config/api';
import {createUser} from '../../../config/auth';

export const saveEstablishment = (data) => {
  return {
    type: CREATE_ESTABLISHMENT,
    payload: {
      data,
    },
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

export const saveEstablishmentFailure = () => {
  return {type: CREATE_ESTABLISHMENT_FAILURE};
};

export const resetEstablishmentValues = () => {
  return {type: CLEAR_ESTABLISHMENT};
};

export const saveNewEstablishment = (data) => {
  const {
    email,
    name,
    password,
    establishment,
    type,
    coordinates,
    address,
    city,
    state,
  } = data;
  const newData = {
    name: establishment,
    type,
    coordinates,
    address,
    city,
    state,
  };
  return async (dispatch) => {
    dispatch(saveEstablishment(data));
    try {
      const Auth0Response = await createUser(email, name, password);
      const {Id: auth_id} = Auth0Response;
      const dataToSave = await createZone({...newData, auth_id});
      dispatch(saveEstablishmentSuccess(dataToSave));
    } catch (error) {
      dispatch(saveEstablishmentFailure(error));
    }
  };
};
