import {
  User,
  UserFilters,
  CustomersPage,
  CustomerDetailsPageAction,
  Rental,
  CustomerStats,
} from "./model";
import { Dispatch } from "react";
import { Action } from "redux";
import Api from "../../Api";
import { sendError } from "../shared/action";
import { PayloadAction } from "../index";
import { ResponseSuccess } from "../shared/model";

export const fetchUsers = (
  pageSize: number = 5,
  pageNumber: number = 0,
  searchObject?: UserFilters
) => {
  return async (dispatch: Dispatch<Action>) => {
    Api.post(`/api/v1/customers/search`, {
      ...searchObject,
      pageNumber,
      pageSize,
    })
      .then(function (response) {
        dispatch(setUsersList(response?.data));
      })
      .catch(function (error) {
        dispatch(sendError(error.response.data.message));
      });
  };
};

export const fetchCustomerDetails = (userId: string = "") => {
  return async (dispatch: Dispatch<Action>) => {
    Api.get(`/api/v1/users/${userId}/details/admin`)
      .then(function (response) {
        if (response?.data?.data) {
          dispatch(setCustomerDetailsPage(response.data.data));
        } else {
          dispatch(sendError("No Customer Found with the ID."));
        }
      })
      .catch(function (error) {
        dispatch(sendError(error.response.data.message));
      });
  };
};

export const updateCustomerDetails = (userId: string = "", payload: any) => {
  return async (dispatch: Dispatch<Action>) => {
    Api.put(`/api/v1/user/${userId}/admin/update`, payload)
      .then(function (response) {
        dispatch(new ResponseSuccess("Record changed successfully!").action())
      })
      .catch(function (error) {
        dispatch(sendError(error.response.data.message));
      });
  };
};

export const fetchRentals = (userId: number, pageSize: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    Api.get(`/api/v1/bookings/user/${userId}?paginate=${pageSize}&pageNumber=0`)
      .then(function (response) {
        dispatch(
          setCustomerRentalHistory(response.data.data, response.data.count)
        );
      })
      .catch(function (error) {
        dispatch(sendError(error.message));
      });
  };
};

export const updateStatus = (status: string, id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    Api.put(`/api/v1/user/${id}/admin/update-status`, {
      status: status,
    })
      .then(function (response) {
        dispatch(setUpdateStatus(status, id));
        dispatch(new ResponseSuccess("Status changed successfully!").action())
      })
      .catch(function (error) {
        dispatch(sendError(error.message));
      });
  };
};

export const fetchCustomerStats = (userId: number) => {
  return async (dispatch: Dispatch<Action>) => {
    Api.get(`/api/v1/user/${userId}/admin/stats`)
      .then(function (response) {
        if (response?.data?.data) {
          dispatch(setCustomerStats(response.data.data));
        } else {
          dispatch(sendError("No Customer Found with the ID."));
        }
      })
      .catch(function (error) {
        dispatch(sendError(error.response.data.message));
      });
  };
};

const setUsersList = (data: any): PayloadAction<CustomersPage> => {
  const usersPage: CustomersPage = new CustomersPage(data);
  return {
    type: "SET_USERS_LIST",
    payload: usersPage,
  };
};

const setCustomerDetailsPage = (
  data: any
): PayloadAction<CustomerDetailsPageAction> => {
  const customerDetailsPage: CustomerDetailsPageAction =
    new CustomerDetailsPageAction(new User(data.userData));

  return {
    type: "SET_CUSTOMER_DETAILS_PAGE",
    payload: customerDetailsPage,
  };
};

const setCustomerRentalHistory = (
  data: any,
  count: number
): PayloadAction<CustomerDetailsPageAction> => {
  const customerDetailsPage: CustomerDetailsPageAction =
    new CustomerDetailsPageAction(new User(null));

  if (data.length) {
    customerDetailsPage.rentals = data.map((rental: any) => {
      return new Rental(rental);
    });
  }
  customerDetailsPage.rentalsCount = count;

  return {
    type: "SET_RENTALS_LIST",
    payload: customerDetailsPage,
  };
};

const setUpdateStatus = (
  status: string,
  id: number
): PayloadAction<CustomerDetailsPageAction> => {
  const customerDetailsPage: CustomerDetailsPageAction =
    new CustomerDetailsPageAction(new User(null));

  if (status && id) {
    customerDetailsPage.status = status;
  }

  return {
    type: "UPDATE_CUSTOMER_STATUS",
    payload: customerDetailsPage,
  };
};

const setCustomerStats = (
  data: any
): PayloadAction<CustomerDetailsPageAction> => {
  const customerDetailsPage: CustomerDetailsPageAction =
    new CustomerDetailsPageAction(new User(null));

  if (data) {
    customerDetailsPage.stats = new CustomerStats(data);
  }

  return {
    type: "UPDATE_CUSTOMER_STATS",
    payload: customerDetailsPage,
  };
};
