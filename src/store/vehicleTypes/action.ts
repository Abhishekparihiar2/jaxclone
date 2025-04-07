import { Dispatch } from "react";
import { Action } from "redux";
import Api from "../../Api";
import { sendError } from "../shared/action";
import { PayloadAction } from "../index";
import { ResponseError, ResponseSuccess } from "../shared/model";
import { VehicleTypesState } from "../../shared/models";

export const fetchVehicleTypes = () => {
  return async (dispatch: Dispatch<Action>) => {
    Api.get(`/api/v1/vehicle-type`)
      .then(function (response) {
        dispatch(setVehicleTypes(response?.data?.data));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(sendError(error.response.data.message));
      });
  };
};

export const addVehicleTypes = (name: string) => {
  return async (dispatch: Dispatch<Action>) => {
    Api.post("/api/v1/vehicle-type", {
      name
    })
      .then(function (response) {
        if (response.data.data) {
          dispatch(fetchVehicleTypes() as any);
        }
        dispatch(new ResponseSuccess(response.data.message).action());
      })
      .catch( function ( error )
      {
        console.log(error.data)
        dispatch(new ResponseError("Given value already exists in the dropdown!").action());
      });
  };
};

export const editVehicleTypes = (id: number, name: string) => {
  return async (dispatch: Dispatch<Action>) => {
    if (id) {
      Api.post(`/api/v1/vehicle-type/${id}`, { name })
        .then(function (response) {
          dispatch(fetchVehicleTypes() as any);
          dispatch(new ResponseSuccess(response.data.message).action());
        })
        .catch( function ( error )
        {
          console.log(error)
          dispatch(new ResponseError("Given value already exists in the dropdown!").action());
        });
    } else {
      dispatch(new ResponseError("Value not found.").action());
    }
  };
};

const setVehicleTypes = (
  data: any
): PayloadAction<VehicleTypesState> => {
  const payload: VehicleTypesState = new VehicleTypesState(
    data
  );

  return {
    type: "SET_TYPES_DROPDOWN_LIST",
    payload: payload,
  };
};