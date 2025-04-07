import { SetLoader } from "./interface";

const initialState = {
  showLoader: false
};

export const loader = (
  state = initialState,
  { type, payload }: SetLoader
) => {
  switch (type) {
    case "UPDATE_LOADER":
    return {
      ...state,
      showLoader: payload.showLoader
    }
    default:
      return state;
  }
};
