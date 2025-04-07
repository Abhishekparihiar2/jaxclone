import {
  User,
  CustomersPage,
  CustomerDetailsPage,
  CustomerDetailsPageAction,
} from "./model";
import { PayloadAction } from "../index";

const initialState = new CustomersPage(null);
export const customersPage = (
  state: CustomersPage = initialState,
  { type, payload }: PayloadAction<CustomersPage>
): CustomersPage => {
  switch (type) {
    case "SET_USERS_LIST":
      return {
        ...state,
        count: payload.count,
        usersList: payload.usersList,
      };

    default:
      return state;
  }
};

const initialCustomerDetailsState = new CustomerDetailsPage(new User(null));

export const customerDetailsPage = (
  state: CustomerDetailsPage = initialCustomerDetailsState,
  { type, payload }: PayloadAction<CustomerDetailsPageAction>
): CustomerDetailsPage => {
  switch (type) {
    case "SET_CUSTOMER_DETAILS_PAGE":
      return {
        ...state,
        customer: payload.customer ? payload.customer : new User(null),
      };
    case "UPDATE_USER_LICENSE_DOCUMENT":
      console.log(payload)
      return {
        ...state,
        customer: payload.customer ? {...state.customer, driverLicenseDetail: {...state.customer.driverLicenseDetail, frontImageUrl: payload.frontUrl, backImageUrl: payload.backUrl}} : {...state.customer}
      }  

    case "UPDATE_USER_DOCUMENT":
      if(payload.documents && payload.documents.length > 0 && Object.keys(payload.documents[payload.documents.length - 1]).length === 0) {
        payload.documents.pop()  
      }
      return {
        ...state,
        customer: payload.customer && payload.documents ? {...state.customer, userDocuments: [
          ...payload.documents
        ]} : {...state.customer}
      }
    case "ADD_USER_DOCUMENT":
      if(payload.documents && payload.documents.length > 0 && Object.keys(payload.documents[payload.documents.length - 1]).length === 0) {
        payload.documents.pop()  
      }
      console.log(payload.documents)
      console.log(state.customer)
      return {
        ...state,
        customer: payload.customer && payload.documents ? {...state.customer, userDocuments: [
          ...state.customer.userDocuments,
          ...payload.documents
        ]} : {...state.customer}
      }  

    case "UPDATE_CUSTOMER_STATUS":
      const customerFromState = state.customer;
      if (payload.status) {
        customerFromState.status = payload.status;
      }
      return {
        ...state,
        customer: customerFromState,
      };
    case "UPDATE_CUSTOMER_STATS":
      return {
        ...state,
        stats: payload?.stats,
      };
    case "SET_RENTALS_LIST":
      return {
        ...state,
        rentals: payload?.rentals ? payload.rentals : [],
        rentalsCount: payload.rentalsCount,
      };
    default:
      return state;
  }
};
