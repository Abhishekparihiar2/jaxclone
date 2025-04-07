import { ResponseInterface } from "./interface";
import { PayloadAction } from "../index";
import { toast } from "react-toastify";

const initialState = {
  successResponse: null,
  errorResponse: null,
  errors: [],
};

export const response = (
  state: ResponseInterface = initialState,
  action: PayloadAction<string>
): ResponseInterface => {
  switch (action.type) {
    case "SUCCESS":
      toast.success(action.payload);
      return {
        ...state,
        successResponse: true,
      };
    case "ERROR":
      toast.error(action.payload);
      return {
        ...state,
        successResponse: false,
        errorResponse: true,
      };
    case "RESPONSE_RESET":
      return {
        ...state,
        successResponse: null,
        errorResponse: null,
      };
    default:
      return state;
  }
};
