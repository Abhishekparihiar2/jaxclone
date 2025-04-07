import { Dispatch } from "react";
import { Action } from "redux";
import Api from "../../Api";
import { sendError } from "../shared/action";
import { PayloadAction } from "../index";
import { InspectionList, ViewInspectionPageState } from "./models";
import { Inspection } from "../../shared/models";
import { Loader } from "../loader/model";

export const fetchInspectionById = (
  inspectionId: number
) => {
  return async (dispatch: Dispatch<Action>) => {
    Api.get(`/api/v1/inspections/show/${inspectionId}`)
      .then(function (response) {
        dispatch(setInspectionData(response?.data?.data));
      })
      .catch(function (error) {
        dispatch(sendError(error.response.data.message));
      });
  };
};

const setInspectionData = (
  data: any
): PayloadAction<ViewInspectionPageState> => {
  const inspectionData = new ViewInspectionPageState(data);
  return {
    type: "SET_INSPECTION_DATA",
    payload: inspectionData,
  };
};

const setInspectionsList = (
  data: any
): PayloadAction<InspectionList> => {
  const actionPayload: InspectionList = new InspectionList();
  let inspectionsList: {
      count: number,
      inspections: Inspection[]
    } = {
      count: 0,
      inspections: []
    };
  if (data) {
    inspectionsList.count = data.count;
    inspectionsList.inspections = data.data.map((inspection: any)=> new Inspection(inspection));
  }
  actionPayload.inspectionList = inspectionsList;
  return {
    type: "SET_INSPECTIONS_LIST",
    payload: actionPayload,
  };
};

export const fetchInspectionsList = (
  pageSize: number = 10,
  pageNumber: number = 0,
  searchObject?: any
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(new Loader(true).action());
    Api.post(`/api/v1/inspections/search/${pageSize}/${pageNumber}`, {
      ...searchObject
    })
      .then(function (response) {
        dispatch(new Loader(false).action());
        dispatch(setInspectionsList(response?.data));
      })
      .catch(function (error) {
        dispatch(new Loader(false).action());
        dispatch(sendError(error.response.data.message));
      });
  };
};

