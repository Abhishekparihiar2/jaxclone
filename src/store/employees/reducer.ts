import {
  User,
  ManageEmployeesPage,
  ManageEmployeesPageAction,
  PopupMode
} from "./model";
import { PayloadAction } from "../index";

const initialManageEmployeesState = new ManageEmployeesPage(null);

export const manageEmployeesState = (
  state: ManageEmployeesPage = initialManageEmployeesState,
  { type, payload }: PayloadAction<ManageEmployeesPageAction>
): ManageEmployeesPage => {
  switch ( type )
  {
    case "SET_EMPLOYEES_LIST":
      return {
        ...state,
        count: payload.count ? payload.count :0,
        usersList: payload.usersList ? payload.usersList : [],
        pageNumber: payload.pageNumber ? payload.pageNumber : 0,
        pageSize: payload.pageSize ? payload.pageSize : 10
      };
    case "SET_EMPLOYEE_DETAILS_PAGE":
      return {
        ...state,
        user: payload.user ? payload.user : new User(null),
      };
    case "SET_LOADING":
      return {
        ...state,
        loadingStatus: payload.loadingStatus ? payload.loadingStatus : false,
      };  
    case  "SET_DELETE_MODAL_ID": 
      return {
        ...state,
        empDeleteId: payload.empDeleteId
        // user: payload.user ? payload.user : new User(null),

      };
    case "UPDATE_EMPLOYEE_STATUS":
      const userFromState = state.user;
      if (payload.status  && userFromState) {
        userFromState.status = payload.status;
      }
      return {
        ...state,
        user: userFromState,
      };
      case "SET_UPDATE_POPUP_STATUS":
        return {
          ...state,
          popupMode : payload.popupMode ? payload.popupMode : PopupMode.OFF,
        };
    default:
      return state;
  }
};
