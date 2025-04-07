import { PayloadAction } from "../index";
import { PaymentTransaction } from "../shared/model";
import { RevenueList } from "./models";

const initialState = new RevenueList({
  count: 0,
   revenueList: [new PaymentTransaction(null)]});
export const revenueList = (
  state: RevenueList = initialState,
  { type, payload }: PayloadAction<RevenueList>
): RevenueList => {
  switch (type) {
    case "SET_REVENUE_LIST":
      return {
        ...state,
        count: payload.count,
        revenueList: payload.revenueList
      };

    default:
      return state;
  }
};