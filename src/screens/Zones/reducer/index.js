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

const initialState = {
   data: null,
   loading: false,
   error: false,
   registro: false,
};

export const ZonesReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_ZONE:
         return {
            ...state,
            data: null,
            loading: true,
         };
      case FETCH_ZONE_SUCCESS:
         return {
            ...state,
            data: action.payload.data,
            loading: false,
            registro: true,
         };
      case FETCH_ZONE_FAILURE:
         return {
            ...state,
            loading: false,
            error: true,
         };
      case RESET_FETCH_ZONE:
         return {
            ...state,
            registro: false,
         };
      default:
         return state;
   }
};

const initialStateDelete = {
   data: null,
   loading: false,
   error: false,
   deleted: false,
};
export const deleteZonesReducer = (state = initialStateDelete, action) => {
   switch (action.type) {
      case DELETE_ZONE:
         return {
            ...state,
            data: null,
            loading: true,
         };
      case DELETE_ZONE_SUCCESS:
         return {
            ...state,
            data: action.payload.data,
            loading: false,
            deleted: true,
         };
      case DELETE_ZONE_FAILURE:
         return {
            ...state,
            loading: false,
            error: true,
         };
      case DELETE_ZONE_DATA:
         return {
            ...state,
            deleted: false,
         };
      default:
         return state;
   }
};