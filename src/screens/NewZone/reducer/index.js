import {
   CREATE_ZONE,
   CREATE_ZONE_SUCCESS,
   CREATE_ZONE_FAILURE,
   RESET_ZONE,
} from '../constants';

const initialState = {
   data: null,
   loading: false,
   error: false,
   registro: false,
};

export const createZoneReducer = (state = initialState, action) => {
   switch (action.type) {
      case CREATE_ZONE:
         return {
            ...state,
            data: null,
            loading: true,
         };
      case CREATE_ZONE_SUCCESS:
         return {
            ...state,
            data: action.payload.data,
            loading: false,
            registro: true,
         };
      case CREATE_ZONE_FAILURE:
         return {
            ...state,
            loading: false,
            error: true,
         };
      case RESET_ZONE:
         return {
            ...state,
            registro: false,
         };
      default:
         return state;
   }
};