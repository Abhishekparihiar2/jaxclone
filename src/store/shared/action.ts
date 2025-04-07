import { PayloadAction } from "../index";

export const sendSuccess = (message: string): PayloadAction<string> => ({
  type: "SUCCESS",
  payload: message,
});

export const sendError = (message: string): PayloadAction<string> => ({
  type: "ERROR",
  payload: message,
});
