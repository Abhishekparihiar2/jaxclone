import {
  User,
  ManageEmployeesPageAction,
  PopupMode,
  Loading
} from "./model";
import { Dispatch } from "react";
import { Action } from "redux";
import Api from "../../Api";
import { sendError } from "../shared/action";
import { PayloadAction } from "../index";
import { Loader } from "../loader/model";

export const fetchEmployees = (
  pageSize: number = 5,
  pageNumber: number = 0,
  searchObject?: any
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(new Loader(true).action());
    Api.post(`/api/v1/customers/search`, {
      pageNumber,
      pageSize,
      userType:2,
      status: 'ACTIVE',
      ...searchObject,
    })
      .then(function (response) {
        dispatch(new Loader(false).action());
        dispatch(setEmployeesList(response?.data, pageNumber, pageSize));
      })
      .catch(function (error) {
        dispatch(new Loader(false).action());
        dispatch(sendError(error.response.data.message));
      });
  };
};

export const fetchEmployeeDetails = (userId: number) => {
  return async (dispatch: Dispatch<Action>) => {
    // dispatch(setEmployeeDetails(null));
    dispatch(new Loader(true).action());
    dispatch(setEmptyUser());
    Api.get(`/api/v1/users/${userId}/details/admin`)
      .then(function (response) {
        dispatch(new Loader(false).action());
        if (response?.data?.data) {
          dispatch(setEmployeeDetails(response.data.data));
          dispatch(setLoading(true))
        } else {
          dispatch(setLoading(true))
          dispatch(sendError("No Customer Found with the ID."));
        }
      })
      .catch(function (error) {
        dispatch(new Loader(false).action());
        dispatch(sendError(error.response.data.message));
      });
  };
};

export const emptyUser = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(setEmptyUser());
  };
};

export const updateStatus = (status: string, id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(new Loader(true).action());
    Api.put(`/api/v1/user/${id}/admin/update`, {
      status: status,
    })
      .then(function (response) {
        dispatch(new Loader(false).action());
        dispatch(setUpdateStatus(status, id));
      })
      .catch(function (error) {
        dispatch(new Loader(false).action());
        dispatch(sendError(error.message));
      });
  };
};

export const updatePopupStatus = (status : PopupMode) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(setUpdatePopupStatus(status));
  };
};

const setUpdatePopupStatus = (status : PopupMode): PayloadAction<ManageEmployeesPageAction> => {
  const manageEmployeesPage: ManageEmployeesPageAction = new ManageEmployeesPageAction( null );
  manageEmployeesPage.popupMode = status;
  return {
    type: "SET_UPDATE_POPUP_STATUS",
    payload: manageEmployeesPage,
  };
};

export const setDeleteEmpId = (id : number): PayloadAction<ManageEmployeesPageAction> => {
  const manageEmployeesPage: ManageEmployeesPageAction = new ManageEmployeesPageAction( null );
  manageEmployeesPage.empDeleteId = id as any;
  return {
    type: "SET_DELETE_MODAL_ID",
    payload: manageEmployeesPage,
  };
};

const setEmployeesList = (data: any, pageNumber:number, pageSize:number): PayloadAction<ManageEmployeesPageAction> => {
  const manageEmployeesPage: ManageEmployeesPageAction = new ManageEmployeesPageAction( data );
  manageEmployeesPage.pageNumber = pageNumber;
  manageEmployeesPage.pageSize = pageSize;
  return {
    type: "SET_EMPLOYEES_LIST",
    payload: manageEmployeesPage,
  };
};

const setEmployeeDetails = (
  data: any
): PayloadAction<ManageEmployeesPageAction> => {
  const manageEmployeesPage: ManageEmployeesPageAction =
    new ManageEmployeesPageAction( null );
  manageEmployeesPage.user = new User( data ? data.userData : null );

  return {
    type: "SET_EMPLOYEE_DETAILS_PAGE",
    payload: manageEmployeesPage,
  };
};


const setEmptyUser = (
): PayloadAction<ManageEmployeesPageAction> => {
  const manageEmployeesPage: ManageEmployeesPageAction =
    new ManageEmployeesPageAction( null );
  manageEmployeesPage.user = new User( null );

  return {
    type: "SET_EMPLOYEE_DETAILS_PAGE",
    payload: manageEmployeesPage,
  };
};

const setLoading = (
  data: any
): PayloadAction<Loading> => {
  const loading: Loading =
    new Loading( false );
    loading.loadingStatus = data;

  return {
    type: "SET_LOADING",
    payload: loading,
  };
};


const setUpdateStatus = (
  status: string,
  id: number
): PayloadAction<ManageEmployeesPageAction> => {
  const manageEmployeesPage: ManageEmployeesPageAction =
    new ManageEmployeesPageAction(new User(null));

  if (status && id) {
    manageEmployeesPage.status = status;
  }

  return {
    type: "UPDATE_EMPLOYEE_STATUS",
    payload: manageEmployeesPage,
  };
};