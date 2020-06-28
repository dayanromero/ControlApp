import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, SAVE_TOKEN, RESET, CLEAN_TOKEN } from '../constants';
import { authUser } from '../../../config/auth';
import AsyncStorage from '@react-native-community/async-storage';

export const logUser = () => {
   return {
      type: LOGIN,
   };
};

export const logUserSuccess = (response) => {
   const { idToken, accessToken, expiresIn } = response;
   return {
      type: LOGIN_SUCCESS,
      payload: {
         accessToken,
         idToken,
         expiresIn,
      },
   };
};

export const logUserFailure = (error) => {
   return {
      type: LOGIN_FAILURE,
      payload: {
         error,
      },
   };
};

export const resetValues = () => {
   return { 
      type: RESET
   };
};

export const saveToken = (token) => {
   return {
      type: SAVE_TOKEN,
      payload: token,
   };
};

export const getToken = () => {
   return (dispatch) => {
      AsyncStorage.getItem('idToken').then((token) => {
         dispatch(saveToken(token));
      });
   };
};

export const cleanToken = () => {
   return {
      type: CLEAN_TOKEN,
   };
};

export const logout = () => {
   return (dispatch) => {
      AsyncStorage.removeItem('idToken')
         .then(()=> dispatch(cleanToken()));
   };
};

export const authenticateUser = (username, password) => {
   return (dispatch) => {
      dispatch(logUser());
      authUser(username, password)
         .then(async (response) => {
            dispatch(logUserSuccess(response));
            await AsyncStorage.setItem('idToken', response.accessToken);
         })
         .catch((error) => dispatch(logUserFailure(error)));
   };
};
