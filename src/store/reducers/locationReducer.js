import {
   LOCATION,
   LOCATION_SUCCESS,
   LOCATION_FAILURE,
} from '../constants/index';

const initialState = {
   data: null,
   loading: false,
   error: false,
};

export default locationReducer = (state = initialState, action) => {
   switch (action.type) {
      case LOCATION:
         return {
            ...state,
            data: null,
            loading: true,
         };
      case LOCATION_SUCCESS:
         const items = action.payload.data.map((item) => {
            return {
               name: item.name,
               id: item.id,
               address: item.address,
               city: item.city,
            };
         });
         return {
            ...state,
            data: items,
            loading: false,
         };
      case LOCATION_FAILURE:
         return {
            ...state,
            loading: false,
            error: true,
         };
      default:
         return state;
   }
};
