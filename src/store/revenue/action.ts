import { Dispatch } from "react";
import { Action } from "redux";
import Api from "../../Api";
import { sendError } from "../shared/action";
import { PayloadAction } from "../index";
import { RevenueList } from "./models";
import { PaymentTransaction } from "../shared/model";
import { Loader } from "../loader/model";

const setReveueList = (
  data: any
): PayloadAction<RevenueList> => {
  const actionPayload: RevenueList = new RevenueList({ count: 0, revenueList: [new PaymentTransaction(null)]});
  let revenueList: {
      count: number,
      revenueList: PaymentTransaction[]
    } = {
      count: 0,
      revenueList: []
    };
  if (data) {
    revenueList.count = data.count;
    revenueList.revenueList = data.data.map((paymentTransaction: any)=> new PaymentTransaction(paymentTransaction));
  }
  actionPayload.count = revenueList.count;
  actionPayload.revenueList = revenueList.revenueList;
  return {
    type: "SET_REVENUE_LIST",
    payload: actionPayload,
  };
};

export const fetchRevenueList = (
  pageSize: number = 10,
  pageNumber: number = 0,
  searchObject?: any
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(new Loader(true).action());
    Api.post(`/api/v1/payment-transaction/search/${pageSize}/${pageNumber}`, {
      ...searchObject
    })
      .then(function (response) {
        dispatch(setReveueList(response?.data));
        dispatch(new Loader(false).action());
      })
      .catch(function (error) {
        dispatch(sendError(error.response.data.message));
      });
  };
};

