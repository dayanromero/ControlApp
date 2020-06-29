import {
    CREATE_ESTABLISHMENT,
    CREATE_ESTABLISHMENT_SUCCESS,
    CREATE_ESTABLISHMENT_FAILURE,
    CLEAR_ESTABLISHMENT,
} from '../constants';

const initialState = {
   data: null,
   loading: false,
   error: false,
   registro: false,
};

export const createEstablishmentReducer = (state = initialState, action) => {
   switch (action.type) {
      case CREATE_ESTABLISHMENT:
         return {
            ...state,
            data: null,
            loading: true,
         };
      case CREATE_ESTABLISHMENT_SUCCESS:
         return {
            ...state,
            data: action.payload.data,
            loading: false,
            registro: true,
         };
      case CREATE_ESTABLISHMENT_FAILURE:
         return {
            ...state,
            loading: false,
            error: true,
         };
      case CLEAR_ESTABLISHMENT:
         return {
            ...state,
            registro: false,
            loading: false
         };
      default:
         return state;
   }
};