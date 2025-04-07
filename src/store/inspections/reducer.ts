import { Inspection } from "../../shared/models";
import { PayloadAction } from "../index";
import { InspectionList, ViewInspectionPageState } from "./models";

const initialState = new ViewInspectionPageState(new Inspection(null));
export const viewInspectionPage = (
  state: ViewInspectionPageState = initialState,
  { type, payload }: PayloadAction<ViewInspectionPageState>
): ViewInspectionPageState => {
  switch (type) {
    case "SET_INSPECTION_DATA":
      return {
        ...state,
        inspection: payload.inspection
      };

    default:
      return state;
  }
};


const initialInspectionState = new InspectionList();
export const inspectionListPage = (
  state: InspectionList = initialInspectionState,
  { type, payload }: PayloadAction<InspectionList>
): InspectionList => {
  switch (type) {
    case "SET_INSPECTIONS_LIST":
      return {
        ...state,
        inspectionList: payload.inspectionList
      };

    default:
      return state;
  }
};
