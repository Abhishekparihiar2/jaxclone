import {
  DropdownValue,
  DropdownValuesStateAction,
} from "./model";
import { Dispatch } from "react";
import { Action } from "redux";
import Api from "../../Api";
import { sendError } from "../shared/action";
import { PayloadAction } from "../index";
import { ResponseError, ResponseSuccess } from "../shared/model";
import { Loader } from "../loader/model";

export const fetchDropdownValues = (types?: string[]) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(new Loader(true).action());
    Api.post(`/api/v1/dropdownvalues/search`, {
      types: types,
    })
      .then(function (response) {
        dispatch(new Loader(false).action());
        console.log(response);
        dispatch(setDropdownsList(response?.data?.data));
      })
      .catch(function (error) {
        dispatch(new Loader(false).action());
        console.log(error);
        dispatch(sendError(error.response.data.message));
      });
  };
};

export const addDropDownValue = (title: string, type: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(new Loader(true).action());
    Api.post("/api/v1/dropdownvalues/add", {
      title: title,
      type: type,
    })
      .then(function (response) {
        dispatch(new Loader(false).action());
        if (response.data.data) {
          dispatch(setDropdown(response.data.data));
        }
        dispatch(new ResponseSuccess(response.data.message).action());
      })
      .catch( function ( error )
      {
        dispatch(new Loader(false).action());
        console.log(error.data)
        dispatch(new ResponseError("Given value already exists in the dropdown!").action());
      });
  };
};

export const editDropdownValue = (id: number, title: string, type: string) => {
  return async (dispatch: Dispatch<Action>) => {
    if (id && title && type) {
      dispatch(new Loader(true).action());
      Api.put(`/api/v1/dropdownvalues/update/${id}`, {
        id,
        title,
        type,
      })
        .then(function (response) {
          dispatch(new Loader(false).action());
          dispatch(setUpdateDropdown({ id, title, type }));
          dispatch(new ResponseSuccess(response.data.message).action());
        })
        .catch( function ( error )
        {
          dispatch(new Loader(false).action());
          console.log(error)
          dispatch(new ResponseError("Given value already exists in the dropdown!").action());
        });
    } else {
      dispatch(new ResponseError("Value not found.").action());
    }
  };
};

const setDropdownsList = (
  data: any
): PayloadAction<DropdownValuesStateAction> => {
  const payload: DropdownValuesStateAction = new DropdownValuesStateAction(
    data
  );

  return {
    type: "SET_DROPDOWN_LIST",
    payload: payload,
  };
};

const setDropdown = (
  dropdown: any
): PayloadAction<DropdownValuesStateAction> => {
  const payload: DropdownValuesStateAction = new DropdownValuesStateAction(
    null
  );
  payload.dropdownValue = new DropdownValue(dropdown);

  return {
    type: "ADD_DROPDOWN",
    payload: payload,
  };
};

const setUpdateDropdown = (
  dropdown: DropdownValue
): PayloadAction<DropdownValuesStateAction> => {
  const payload: DropdownValuesStateAction = new DropdownValuesStateAction(
    null
  );
  payload.dropdownValue = dropdown;

  return {
    type: "UPDATE_DROPDOWN",
    payload: payload,
  };
};
