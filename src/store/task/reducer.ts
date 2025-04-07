import { PayloadAction } from "../index";
import { TaskPageState } from "./models";

const initialState = new TaskPageState(null);
export const taskViewPage = (
  state: TaskPageState = initialState,
  { type, payload }: PayloadAction<TaskPageState>
): TaskPageState => {
  switch (type) {
    case "SET_OPEN_TASK":
      return {
        ...state,
        openTask: payload.openTask
      };
    case "SET_CLOSE_TASK":
      return {
        ...state,
        closeTask: payload.closeTask
      };
    case "SET_OPEN_TASK_ALL":
      return {
        ...state,
        openTask: {
          count: payload.openTask?.count || 0,
          data: JSON.parse(JSON.stringify({...state.openTask?.data as any || [], ...payload.openTask?.data as any || []}))
        }
      };
    case "SET_CLOSE_TASK_ALL":
      return {
        ...state,
        closeTask: {
          count: payload.closeTask?.count || 0,
          data: JSON.parse(JSON.stringify({...state.closeTask?.data as any || [], ...payload.closeTask?.data as any || []}))
        }
      };
    default:
      return state;
  }
};