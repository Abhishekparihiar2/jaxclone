import {
    PromoCodePage,
    PromoCodeDetailsPage,
    PromoCode,
    PromoCodeDetailsPageAction
  } from "./models";
import { PayloadAction } from "../index";

const initialPage = new PromoCodePage(null)

export const promoCodeReducer = (
    state: PromoCodePage = initialPage,
    { type, payload }: PayloadAction<PromoCodePage>
  ): PromoCodePage => {
    switch (type) {
      case "SET_PROMO_CODE_LIST":
        return {
          ...state,
          promoList: payload.promoList,
          count: payload.count
        };
      default:
        return state;
    }
  };
  