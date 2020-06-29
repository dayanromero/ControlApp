import {
  CREATE_ESTABLISHMENT,
  CREATE_ESTABLISHMENT_SUCCESS,
  CREATE_ESTABLISHMENT_FAILURE,
  CLEAR_ESTABLISHMENT,
} from '../constants';

import {createEstablishment} from '../../../config/api';
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
  const { email, name, password } = data;
  return (dispatch) => {
    dispatch(saveEstablishment(data));
    createUser(email, name, password)
      .then((response) => {
          console.log('response: ', {...data, ...response})
        // createEstablishment({...data, ...response})
        //   .then((response) => {
        //     dispatch(saveEstablishmentSuccess(response));
        //     if (!response) {
        //       dispatch(saveEstablishmentFailure());
        //     }
        //   })
        //   .catch((error) => {
        //     dispatch(saveEstablishmentFailure(error));
        //   });
      })
      .catch((error) => {
        console.log('error: ', error)
        //dispatch(saveEstablishmentFailure(error));
      });
  };
};
