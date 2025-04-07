import { PayloadAction } from "../index";
import { BackgroundCheckPageState } from "./models";

const initialState = new BackgroundCheckPageState({
  backgroundCheckList: [],
  count: 0
});

export const backgroundCheckPage = (
  state: BackgroundCheckPageState = initialState,
  { type, payload }: PayloadAction<BackgroundCheckPageState>
): BackgroundCheckPageState => {
  switch (type) {
    case "SET_BACKGROUND_CHECK_LIST":
      return {
        ...state,
        backgroundChecks: payload.backgroundChecks
      };

    default:
      return state;
  }
};
