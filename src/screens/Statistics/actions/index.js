import {
   GET_STATISTICS,
   GET_STATISTICS_SUCCESS,
   GET_STATISTICS_FAILURE,
} from '../constants';

import { fetTotal, fetHosMuerec } from '../../../config/api';

export const getStatistics = () => {
   return {
      type: GET_STATISTICS,
   };
};

export const getStatisticsSuccess = (data) => {
   return {
      type: GET_STATISTICS_SUCCESS,
      payload: {
         data,
      },
   };
};

export const getStatisticsFailure = () => {
   return { type: GET_STATISTICS_FAILURE };
};

export const fetchData = () => {
   return (dispatch) => {
      dispatch(getStatistics());
      fetHosMuerec()
         .then((response) => {
            dispatch(getStatisticsSuccess(response));
            if (!response) {
               dispatch(getStatisticsFailure());
            }
         })
         .catch((error) => {
            dispatch(getStatisticsFailure(error));
         });
   };
};
