import { Dispatch } from "react";
import { Action } from "redux";
import Api from "../../Api";
import { sendError } from "../shared/action";
import { PayloadAction } from "../index";
import { BackgroundCheckPageState } from "./models";

const setBackgroundList = (
  data: any
): PayloadAction<BackgroundCheckPageState> => {
  const backgroundChecks = new BackgroundCheckPageState(data);
  return {
    type: "SET_BACKGROUND_CHECK_LIST",
    payload: backgroundChecks,
  };
};

export const fetchBackgroundCheckList = (
  pageSize: number = 10,
  pageNumber: number = 0,
  searchObject?: any
) => {
  return async (dispatch: Dispatch<Action>) => {
    Api.post(`/api/v1/background-checks/search/${pageSize}/${pageNumber}`, {
      ...searchObject
    })
      .then(function (response) {
        dispatch(setBackgroundList(response?.data));
      })
      .catch(function (error) {
        dispatch(sendError(error.response.data.message));
      });
  };
};

