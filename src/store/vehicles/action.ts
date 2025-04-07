import {
  AddNoteInterface,
  RentalNoteInterface,
  AddTaskInterface,
  VehiclesPage,
  DeleteRentalNoteInterface,
  SearchNotesInterface,
  SearchTasksInterface,
  DeleteVehicleDocInterface,
} from "./interface";
import { Dispatch } from "react";
import { Action, AnyAction } from "redux";
import Api from "../../Api";
import { ResponseError, ResponseReset, ResponseSuccess } from "../shared/model";
import { PayloadAction } from "../index";
import {
  AddNotes,
  DeleteNotes,
  EditNotes,
  UpdateList,
  UpdateNotesInList,
  UpdateRentalList,
  UpdateTaskInList,
  SetVehicleList,
  UpdateVehicleTask,
  DeleteVehicleDoc,
  SetVehicleRegistrations,
} from "./models";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Loader } from "../loader/model";

export const fetchVehicles = (pageSize: number) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    Api.post("/api/v1/admin/vehicles/search", {
      pageSize: pageSize,
      pageNumber: 0,
      sortType: "DESC",
      sortBy: "updatedAt",
      make: "",
    })
      .then(function (response) {
        dispatch(new SetVehicleList(response.data).action());
      })
      .catch(function (error) {
        console.log(error);
        dispatch(new ResponseError(error.message).action());
      });
  };
};

export const fetchVehiclesRegistrations = (
  search: {
    pageSize: number,
    pageNumber: number
  }
) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    Api.post("/api/v1/vehicle-registration", {
      ...search
    })
      .then(function (response) {
        dispatch(new SetVehicleRegistrations(response.data).action());
      })
      .catch(function (error) {
        console.log(error);
        dispatch(new ResponseError(error.message).action());
      });
  };
};

export const searchVehicles = (
  searchParams: any,
  pageSize: number,
  pageNumber: number
) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    Api.post("/api/v1/admin/vehicles/search", {
      pageSize,
      pageNumber,
      sortType: "DESC",
      sortBy: "updatedAt",
      make: "",
      ...searchParams,
    })
      .then(function (response) {
        dispatch(new SetVehicleList(response.data).action());
      })
      .catch(function (error) {
        console.log(error);
        dispatch(new ResponseError(error.message).action());
      });
  };
};

export const addTask = ({ name, vehicleId, userId }: AddTaskInterface) => {
  return async (dispatch: Dispatch<Action>, state: any) => {
    dispatch(new Loader(true).action());
    Api.post("/api/v1/tasks/add", {
      name,
      vehicleId,
      userId,
    })
      .then(function (response) {
        if(response) {
          dispatch(new UpdateVehicleTask(response.data.data, vehicleId).action())
          dispatch(fetchVehicle(Number(vehicleId)) as any);
          dispatch(new Loader(false).action());
        }
        dispatch(new ResponseSuccess(response.data.message).action());
      })
      .catch(function (error) {
        dispatch(new ResponseError(error.message).action());
      });
  };
};

export const addNote = ({
  notes,
  vehicleId,
  userId,
  author,
}: AddNoteInterface) => {
  return async (dispatch: Dispatch<Action>, state: any) => {
    dispatch(new ResponseReset().action());
    Api.post("/api/v1/notes/create", {
      notes,
      vehicleId,
      userId,
      author,
    })
      .then(function (response) {
        dispatch(new ResponseSuccess(response.data.message).action());
      })
      .catch(function (error) {
        dispatch(new ResponseError(error.message).action());
      });
  };
};

export const addRentalNote = ({
  notes,
  rentalId,
  userId,
  author,
  vehicleId,
}: RentalNoteInterface) => {
  return async (dispatch: Dispatch<Action>, state: any) => {
    dispatch(new ResponseReset().action());
    Api.post("/api/v1/notes/create", {
      notes,
      rentalId: rentalId || null,
      userId,
      author,
      vehicleId: vehicleId || null,
    })
      .then(function (response) {
        dispatch(new ResponseSuccess(response.data.message).action());
        dispatch(new AddNotes(response.data.data).action());
      })
      .catch(function (error) {
        dispatch(new ResponseError(error.message).action());
      });
  };
};

export const editRentalNote = ({
  notes,
  rentalId,
  userId,
  author,
  id,
  vehicleId,
}: RentalNoteInterface) => {
  return async (dispatch: Dispatch<Action>, state: any) => {
    dispatch(new ResponseReset().action());
    Api.put(`/api/v1/notes/update/${id}`, {
      notes,
      rentalId: rentalId || null,
      userId,
      author,
      vehicleId: vehicleId || null,
    })
      .then(function (response) {
        dispatch(new ResponseSuccess(response.data.message).action());
        dispatch(
          new EditNotes({
            notes,
            rentalId,
            userId,
            author,
            id,
            vehicleId,
          }).action()
        );
      })
      .catch(function (error) {
        dispatch(new ResponseError(error.message).action());
      });
  };
};

export const deleteRentalNote = ({
  id,
  rentalId,
  vehicleId,
}: DeleteRentalNoteInterface) => {
  return async (dispatch: Dispatch<Action>, state: any) => {
    dispatch(new ResponseReset().action());
    Api.delete(`/api/v1/notes/delete/${id}`)
      .then(function (response) {
        dispatch(new ResponseSuccess(response.data.message).action());
        dispatch(new DeleteNotes({ id, rentalId, vehicleId }).action());
      })
      .catch(function (error) {
        dispatch(new ResponseError(error.message).action());
      });
  };
};

export const deleteVehicleDoc = ({
  id,
  vehicleId
}: DeleteVehicleDocInterface) => {
  return async (dispatch: Dispatch<Action>, state: any) => {
    dispatch(new ResponseReset().action());
    Api.delete(`/api/v1/vehicle-documents/delete/${id}`)
      .then(function (response) {
        dispatch(new ResponseSuccess(response.data.message).action());
        dispatch(new DeleteVehicleDoc({ id, vehicleId }).action());
      })
      .catch(function (error) {
        dispatch(new ResponseError(error.message).action());
      });
  };
};

export const fetchVehicle = (
  id: number
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(new Loader(true).action());
    dispatch(new ResponseReset().action());
    Api.get(`/api/v1/vehicles/show/${id}`)
      .then(function (response) {
        dispatch(new UpdateList(response.data.data).action());
        dispatch(searchNotes({ vehicleId: Number(id) }));
        dispatch(fetchRentals(id));
        dispatch(searchTasks({ vehicleId: Number(id), status: 'ACTIVE' }));
        dispatch(new Loader(false).action());
      })
      .catch(function (error) {
        // dispatch(new ResponseError(error.message).action())
      });
  };
};

export const fetchRentals = (id: number) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(new ResponseReset().action());
    Api.get(`/api/v1/bookings/vehicles/${id}`)
      .then(function (response) {
        dispatch(new UpdateRentalList(response.data.data, id).action());
      })
      .catch(function (error) {
        // dispatch(new ResponseError(error.message).action())
      });
  };
};

export const updateStatus = (
  status: string,
  id: number
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    Api.put(`/api/v1/vehicles/update/${id}`, {
      status: status,
    })
      .then(function (response) {
        dispatch(setUpdateStatus(status, id));
        dispatch(new ResponseSuccess(`Status changed sucessfully!`).action());
      })
      .catch(function (error) {
        dispatch(new ResponseError(error.message).action());
      });
  };
};

const setUpdateStatus = (
  status: string,
  id: number
): PayloadAction<VehiclesPage> => {
  const actionPayload: VehiclesPage = { count: 0, vehiclesList: [] };

  if (status && id) {
    actionPayload.status = status;
    actionPayload.vehicleId = id;
  }

  return {
    type: "UPDATE_VEHICLE_STATUS",
    payload: actionPayload,
  };
};

export const searchNotes = ({ vehicleId, rentalId }: SearchNotesInterface) => {
  return async (dispatch: Dispatch<Action>, state: any) => {
    dispatch(new ResponseReset().action());
    Api.post(`/api/v1/notes/search`, {
      rentalId,
      vehicleId,
    })
      .then(function (response) {
        dispatch(
          new UpdateNotesInList(
            response.data.data,
            rentalId,
            vehicleId
          ).action()
        );
      })
      .catch(function (error) {
        dispatch(new ResponseError(error.message).action());
      });
  };
};

export const searchTasks = ({ vehicleId, status }: SearchTasksInterface) => {
  return async (dispatch: Dispatch<Action>, state: any) => {
    dispatch(new ResponseReset().action());
    Api.post(`/api/v1/tasks/search`, {
      vehicleId,
      status
    })
      .then(function (response) {
        dispatch(new UpdateTaskInList(response.data.data, vehicleId).action());
      })
      .catch(function (error) {
        // dispatch(new ResponseError(error.message).action())
      });
  };
};
