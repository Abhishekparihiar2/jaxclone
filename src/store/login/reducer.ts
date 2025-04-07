import { SetLoginInterface, UserState } from "./interface";

const initialState = {
  token: null,
  userId: null,
  name: "",
  permissions: {
    "access_dashboard": false,
    "access_background_checks": false,
    "access_rentals": false,
    "access_manage_employee": false,
    "access_vehicles": false,
    "access_customers": false,
    "access_revenue": false,
    "access_custom_settings": false,
    "access_inspections": false
  },
  profileImageUrl: ''
};

export const login = (
  state: UserState = initialState,
  { type, payload }: SetLoginInterface
) => {
  switch (type) {
    case "SET_LOGIN":
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        token: payload.token,
        userId: Number(payload.userId),
        name: payload.name,
        permissions: payload.permissions,
        profileImageUrl: payload.profileImageUrl
      };

    case "SET_TOKEN":
      const token = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : null;
      return {
        ...state,
        token,
      };

    case "DELETE_TOKEN":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        userId: null,
        name: "",
      };

    case "SET_USER":
      return {
        ...state,
        userId: payload.userId,
        name: payload.name,
        permissions: payload.permissions,
        profileImageUrl: payload.profileImageUrl
      };

    default:
      return state;
  }
};
