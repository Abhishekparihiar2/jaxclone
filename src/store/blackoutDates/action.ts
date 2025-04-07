import { Dispatch } from 'react';
import { Action } from 'redux';
import { Loader } from '../loader/model';
import Api from "../../Api";
import { PayloadAction } from '..';
import { sendError } from '../shared/action';
import { BlackoutDatesPage, DeleteBlackouts } from './model';


export const fetchBlackoutDates = (
    // pageSize: number = 20,
    // pageNumber: number = 0,
    searchObject?: any
  ) => {
    return async (dispatch: Dispatch<Action>) => {
      dispatch(new Loader(true).action());
      Api.get(`/api/v1/blackoutdates`, {
        params: {
            ...searchObject
        },
      })
        .then(function (response) {
          dispatch(setBlackoutDatesList(response?.data));
          dispatch(new Loader(false).action());
        })
        .catch(function (error) {
          console.log(error)
          dispatch(sendError(error.response.data.message));
        });
    };
  };
  export const deleteBlackoutDates = (
    id: number
  ) => {
    return async (dispatch: Dispatch<Action>) => {
      dispatch(new Loader(true).action());
      Api.delete(`/api/v1/blackoutdates/${id}`)
        .then(function (response) {
          dispatch(new DeleteBlackouts(id));
          dispatch(new Loader(false).action());
        })
        .catch(function (error) {
          console.log(error)
          dispatch(sendError(error.response.data.message));
        });
    };
  };

  const setBlackoutDatesList = (data: any): PayloadAction<BlackoutDatesPage> => {
    const blackoutDates: BlackoutDatesPage = new BlackoutDatesPage(data);
    return {
      type: "SET_BLACKOUT_DATES_LIST",
      payload: blackoutDates,
    };
  };