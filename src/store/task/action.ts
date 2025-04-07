import { Dispatch } from "react";
import { Action } from "redux";
import { PayloadAction } from "..";
import Api from "../../Api";
import { sendError } from "../shared/action";
import { TaskPageState } from "./models";


export const fetchTask = (isOpen: boolean, limit = 2, offset = 0, isALL: boolean = true) => {
  return async (dispatch: Dispatch<Action>) => {
    Api.get(`/api/v1/tasks/fetchTasks?status=${isOpen ? 'ACTIVE' : 'COMPLETED'}&limit=${limit}&offset=${offset}`)
      .then(function (response) {
        dispatch(isOpen ? (isALL ? setOpenTaskAll(response?.data) : setOpenTask(response?.data)) : (isALL ? setCloseTaskAll(response?.data) : setCloseTask(response?.data)));
      })
      .catch(function (error) {
        dispatch(sendError(error.response.data.message));
      });
  };
};

const setOpenTask = (data: any
  ): PayloadAction<TaskPageState> => {
    return {
      type: "SET_OPEN_TASK",
      payload: { openTask: data },
    };
  };
  
  const setCloseTask = (
    data: any
  ): PayloadAction<TaskPageState> => {
    return {
      type: "SET_CLOSE_TASK",
      payload:  { closeTask: data },
    };
  };

const setOpenTaskAll = (data: any
): PayloadAction<TaskPageState> => {
  return {
    type: "SET_OPEN_TASK_ALL",
    payload: { openTask: data },
  };
};

const setCloseTaskAll = (
  data: any
): PayloadAction<TaskPageState> => {
  return {
    type: "SET_CLOSE_TASK_ALL",
    payload:  { closeTask: data },
  };
};