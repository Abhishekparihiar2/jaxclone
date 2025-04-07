import { Dispatch } from "react";
import { Action } from "redux";
import Api from "../../Api";
import { sendError } from "../shared/action";
import { PayloadAction } from "../index";
import { CustomSetting, CustomSettingPage } from "./models";

const setCustomSettingsList = (
  data: any
): PayloadAction<CustomSettingPage> => {
  const actionPayload: CustomSettingPage = new CustomSettingPage({ count: 0, customSettings: [new CustomSetting(null)]});
  let customSetting: {
      count: number,
      customSetting: CustomSetting[]
    } = {
      count: 0,
      customSetting: []
    };
  if (data) {
    customSetting.count = data.count;
    customSetting.customSetting = data.data.map((paymentTransaction: any)=> new CustomSetting(paymentTransaction));
  }
  actionPayload.count = customSetting.count;
  actionPayload.customSettings = customSetting.customSetting;
  return {
    type: "SET_REVENUE_LIST",
    payload: actionPayload,
  };
};

export const fetchCustomSettings = (
  pageSize: number = 10,
  pageNumber: number = 0,
  searchObject?: any
) => {
  return async (dispatch: Dispatch<Action>) => {
    Api.get(`/api/v1/custom-setting?pageSize=${pageSize}&pageNumber=${pageNumber}&sortBy=${searchObject.sortBy}&sortOrder=${searchObject.sortOrder}`)
      .then(function (response) {
        dispatch(setCustomSettingsList(response?.data));
      })
      .catch(function (error) {
        dispatch(sendError(error.response.data.message));
      });
  };
};

