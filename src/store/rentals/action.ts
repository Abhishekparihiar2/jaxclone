import {
  RentalsPage,
  RentalDetailsPageAction,
} from "./model";
import { Dispatch } from "react";
import { Action } from "redux";
import Api from "../../Api";
import { sendError } from "../shared/action";
import { PayloadAction } from "../index";
import { Inspection } from "../../shared/models";
import { PaymentTransaction } from "../shared/model";
import { Loader } from "../loader/model";

export const fetchRentals = (
  pageSize: number = 20,
  pageNumber: number = 0,
  searchObject?: any
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(new Loader(true).action());
    Api.post(`/api/v1/rental/search/${pageSize}/${pageNumber}`, {
      sortType: "DESC",
      make: "",
      ...searchObject,
    })
      .then(function (response) {
        dispatch(setRentalsList(response?.data));
        dispatch(new Loader(false).action());
      })
      .catch(function (error) {
        console.log(error)
        dispatch(sendError(error.response.data.message));
      });
  };
};

export const fetchRentalDetails = (rentalNumber: string = "") => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(new Loader(true).action());
    Api.get(`/api/v1/bookings/${rentalNumber}/details`)
      .then(function (response) {
        if (response?.data?.data) {
          dispatch(setRentalDetailsPage(response.data.data));
          dispatch(new Loader(false).action());
        } else {
          dispatch(sendError("No Booking Found with the ID."));
        }
      })
      .catch(function (error) {
        dispatch(sendError(error.response.data.message));
      });
  };
};

export const updateRentalStatus = (rentalId: number,  status: string = "", activeRentalData: undefined |  null | any = null) => {
  return async (dispatch: Dispatch<Action>) => {
    Api.post(`/api/v1/bookings/${rentalId}/update-status`, {
      status: status,
      startedAt: activeRentalData.startDate,
      endAt: activeRentalData.endDate,
      slot: activeRentalData.slot,
    })
      .then(function (response) {
        if ( response?.data?.type === "success" )
        {
          
          Api.get(`/api/v1/bookings/${rentalId}/details`)
          .then(function (response) {
            if (response?.data?.data) {
              dispatch(setRentalDetailsPage(response.data.data));
            } else {
              dispatch(sendError("No Booking Found with the ID."));
            }
          })
          .catch(function (error) {
            dispatch(sendError(error.response.data.message));
          });
        } else {
          dispatch(sendError(response.data.message));
        }
      })
      .catch(function (error) {
        dispatch(sendError(error.response.data.message));
      });
  };
};

export const fetchInspections = (
  rentalId?: number,
  pageSize: number = 10,
  pageNumber: number = 0
) => {
  return async (dispatch: Dispatch<Action>) => {
    Api.post(`/api/v1/inspections/search/${pageSize}/${pageNumber}`, {
      rentalId: rentalId,
    })
      .then(function (response) {
        dispatch(setInspectionsList(response?.data?.data));
      })
      .catch(function (error) {
        dispatch(sendError(error.response.data.message));
      });
  };
};

export const fetchPayments = (rentalId?: number) => {
  return async (dispatch: Dispatch<Action>) => {
    Api.post(`/api/v1/payment-transaction/search/100/0`, {
      rentalId: rentalId,
    })
      .then(function (response) {
        dispatch(setPaymentsList(response?.data?.data));
      })
      .catch(function (error) {
        dispatch(sendError(error.response.data.message));
      });
  };
};

const setPaymentsList = (data: any): PayloadAction<RentalDetailsPageAction> => {
  const actionPayload: RentalDetailsPageAction = new RentalDetailsPageAction();
  let paymentsList: PaymentTransaction[] = [];
  if (data) {
    paymentsList = data.map(
      (transaction: any) => new PaymentTransaction(transaction)
    );
  }

  actionPayload.paymentList = paymentsList;
  return {
    type: "SET_PAYMENTS",
    payload: actionPayload,
  };
};
const setInspectionsList = (
  data: any
): PayloadAction<RentalDetailsPageAction> => {
  const actionPayload: RentalDetailsPageAction = new RentalDetailsPageAction();
  let inspectionsList: Inspection[] = [];
  if (data) {
    inspectionsList = data.map((inspection: any) => new Inspection(inspection));
  }

  actionPayload.inspections = inspectionsList;
  return {
    type: "SET_INSPECTIONS",
    payload: actionPayload,
  };
};


const setRentalsList = (data: any): PayloadAction<RentalsPage> => {
  const rentalsPage: RentalsPage = new RentalsPage(data);
  return {
    type: "SET_RENTALS_LIST",
    payload: rentalsPage,
  };
};

const setRentalDetailsPage = (
  data: any
): PayloadAction<RentalDetailsPageAction> => {
  const rentalDetailsPage: RentalDetailsPageAction =
    new RentalDetailsPageAction(data);

  return {
    type: "SET_RENTAL_DETAILS_PAGE",
    payload: rentalDetailsPage,
  };
};
