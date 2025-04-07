import { PayloadAction } from "../index";
import { VehicleTypesState } from "../../shared/models";

const initialState = new VehicleTypesState(null);
export const vehicleTypesValues = (
  state: VehicleTypesState = initialState,
  { type, payload }: PayloadAction<VehicleTypesState>
): VehicleTypesState => {
  switch (type) {
    case "SET_TYPES_DROPDOWN_LIST":
      return {
        ...state,
        vehicleTypes: payload?.vehicleTypes,
      };
    default:
      return state;
  }
};
