import { PayloadAction } from "../index";
import { CustomSetting, CustomSettingPage } from "./models";

const initialState = new CustomSettingPage({
  count: 0,
  customSettings: [new CustomSetting(null)]});
export const customSettings = (
  state: CustomSettingPage = initialState,
  { type, payload }: PayloadAction<CustomSettingPage>
): CustomSettingPage => {
  switch (type) {
    case "SET_REVENUE_LIST":
      return {
        ...state,
        count: payload.count,
        customSettings: payload.customSettings
      };

    default:
      return state;
  }
};