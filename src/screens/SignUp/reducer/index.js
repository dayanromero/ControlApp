import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, SAVE_TOKEN, CLEAN_TOKEN, RESET } from '../constants';

const initialState = {
   email: '',
   password: '',
   error: '',
   expiresIn: '',
   idToken: '',
   accessToken: '',
   loading: true,
   error: false,
};

export default loginReducer = (state = initialState, action) => {
   switch (action.type) {
      case LOGIN:
         return {
            ...state,
            loading: true,
         };
      case LOGIN_SUCCESS:
         const { idToken, accessToken, expiresIn } = action.payload;
         return {
            ...state,
            idToken,
            accessToken,
            expiresIn,
            loading: false,
         };
      case SAVE_TOKEN:
         return {
            ...state,
            accessToken: action.payload,
            loading: false,
         };
      case CLEAN_TOKEN:
         return {
            ...state,
            accessToken: '',
         }
      case LOGIN_FAILURE:
         return {
            ...state,
            loading: false,
            error: true,
         };
      case RESET:
         return {
            ...state,
            loading: false,
            error: false,
         };
      default:
         return state;
   }
};
