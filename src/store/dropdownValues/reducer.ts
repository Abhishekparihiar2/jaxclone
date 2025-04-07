import {
  DropdownValuesStateAction,
  DropdownValuesState,
  DropdownValue,
} from "./model";
import { PayloadAction } from "../index";

const initialState = new DropdownValuesState(null);
export const dropdownValues = (
  state: DropdownValuesState = initialState,
  { type, payload }: PayloadAction<DropdownValuesStateAction>
): DropdownValuesState => {
  switch (type) {
    case "SET_DROPDOWN_LIST":
      return {
        ...state,
        dropdownValues: payload?.dropdownValues,
      };
    case "ADD_DROPDOWN":
      let stateDropdownValues: DropdownValue[] = state.dropdownValues;
      if (payload.dropdownValue) {
        stateDropdownValues.push(payload.dropdownValue);
      }

      return {
        ...state,
        dropdownValues: stateDropdownValues,
      };
    case "UPDATE_DROPDOWN":
      let updatedDropdowns: DropdownValue[] = state.dropdownValues;
      if (payload.dropdownValue) {
        const payloadDropdownValue = payload.dropdownValue;
        updatedDropdowns = state.dropdownValues.map((item) => {
          return item.id === payloadDropdownValue.id
            ? payloadDropdownValue
            : item;
        });
      }
      return {
        ...state,
        dropdownValues: updatedDropdowns,
      };
    default:
      return state;
  }
};
