import { Dispatch } from 'react';
import { Action } from 'redux';
import { Loader } from '../loader/model';
import Api from "../../Api";
import { PayloadAction } from '..';
import { PromoCodePage } from './models';
import { sendError } from '../shared/action';


export const fetchPromoCodes = (
    // pageSize: number = 20,
    // pageNumber: number = 0,
    searchObject?: any
  ) => {
    return async (dispatch: Dispatch<Action>) => {
      dispatch(new Loader(true).action());
      Api.get(`/api/v1/promocode`, {
        params: {
            ...searchObject
        },
      })
        .then(function (response) {
          dispatch(setPromoCodeList(response?.data));
          dispatch(new Loader(false).action());
        })
        .catch(function (error) {
          console.log(error)
          dispatch(sendError(error.response.data.message));
        });
    };
  };

  const setPromoCodeList = (data: any): PayloadAction<PromoCodePage> => {
    const promoCodePage: PromoCodePage = new PromoCodePage(data);
    return {
      type: "SET_PROMO_CODE_LIST",
      payload: promoCodePage,
    };
  };