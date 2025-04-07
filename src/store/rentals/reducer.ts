import {
  RentalsPage,
  RentalDetailsPage,
  Rental,
  RentalDetailsPageAction,
} from "./model";
import { PayloadAction } from "../index";

const initialState = new RentalsPage(null);
export const rentalsPage = (
  state: RentalsPage = initialState,
  { type, payload }: PayloadAction<RentalsPage>
): RentalsPage => {
  switch (type) {
    case "SET_RENTALS_LIST":
      return {
        ...state,
        count: payload.count,
        rentalsList: payload.rentalsList,
      };

    default:
      return state;
  }
};

const initialRentalDetailsState = new RentalDetailsPage(new Rental(null));

export const rentalDetailsPage = (
  state: RentalDetailsPage = initialRentalDetailsState,
  { type, payload }: PayloadAction<RentalDetailsPageAction>
): RentalDetailsPage => {
  switch (type) {
    case "SET_RENTAL_DETAILS_PAGE":
      return {
        ...state,
        rental: payload.rental ? payload.rental : new Rental(null),
      };
    case "UPDATE_RENTAL_STATUS":
      const rentalFromState = state.rental;
      if (payload.status) {
        rentalFromState.status = payload.status;
      }
      return {
        ...state,
        rental: rentalFromState,
      };

    case "UPDATE_RENTAL_SLOT":
      const currentRental = state.rental;
      if (payload.status && payload.slot) {
        currentRental.slot = payload.slot;
        currentRental.pickupAt = payload.pickupAt;
        currentRental.returnAt = payload.returnAt;
      }
      return {
        ...state,
        rental: currentRental,
      };  
    case "SET_INSPECTIONS":
      return {
        ...state,
        inspections: payload?.inspections ? payload.inspections : [],
      };
    case "SET_PAYMENTS":
      return {
        ...state,
        paymentList: payload?.paymentList ? payload.paymentList : [],
      };
    default:
      return state;
  }
};
