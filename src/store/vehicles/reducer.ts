import {
  VehiclesPage,
  SetVehiclesPage,
  Vehicle,
  RentalInterface,
} from "./interface";

const initialState = {
  count: 0,
  vehiclesList: [],
  vehiclesRegistrationList: []
};

export const vehiclesPage = (
  state: VehiclesPage = initialState,
  { type, payload }: SetVehiclesPage
) => {
  switch (type) {
    case "SET_VEHICLES_LIST":
      return {
        ...state,
        count: payload.count,
        vehiclesList: payload.vehiclesList,
      };
    case "SET_VEHICLES_REGISTRATIONS":
      return {
        ...state,
        count: payload.count,
        vehiclesRegistrationList: payload.vehiclesList,
      }  

    case "UPDATE_LIST":
      const listFromState = state.vehiclesList;
      let newList = [];

      // if vehicle exists in the list, update it, else add it
      if (
        listFromState.find((vehicle) => vehicle.id === payload?.vehicle?.id)
      ) {
        newList = state.vehiclesList.map((vehicle) =>
          vehicle.id === payload.vehicle?.id
            ? { ...payload.vehicle }
            : { ...vehicle }
        );
      } else {
        newList = [...listFromState, payload.vehicle];
      }
      return {
        ...state,
        vehiclesList: newList,
      };

    case "UPDATE_NOTES_LIST":
      return {
        ...state,
        vehiclesList: state.vehiclesList.map((vehicle) => {
          if (payload.rentalId) {
            const updatedRentals = vehicle.rentals?.map((rental) =>
              rental.id === payload.rentalId
                ? { ...rental, rentalNotes: payload.notes }
                : { ...rental }
            );
            console.log(updatedRentals);
            return { ...vehicle, rentals: updatedRentals };
          } else if (payload.vehicleId) {
            return vehicle.id === payload.vehicleId
              ? { ...vehicle, vehicleNotes: payload.notes }
              : { ...vehicle };
          } else {
            return { ...vehicle };
          }
        }),
      };

    case "UPDATE_RENTAL_LIST":
      return {
        ...state,
        vehiclesList: state.vehiclesList.map((vehicle: Vehicle) =>
          vehicle.id === payload.vehicleId
            ? { ...vehicle, rentals: payload.rentals }
            : { ...vehicle }
        ),
      };

    case "UPDATE_TASK_LIST":
      return {
        ...state,
        vehiclesList: state.vehiclesList.map((vehicle: Vehicle) =>
          vehicle.id === payload.vehicleId
            ? { ...vehicle, vehicleTasks: payload.tasks }
            : { ...vehicle }
        ),
      };

    case "UPDATE_VEHICLE_TASK" :
      console.log(payload, "UPDATE_VEHICLE_TASK")
      return {
        ...state,
        vehiclesList: state.vehiclesList.map((vehicle: Vehicle) =>
          vehicle.id === payload.vehicleId
            ? { ...vehicle, vehicleTasks: vehicle?.vehicleTasks && payload.tasks && [...vehicle?.vehicleTasks, ...payload.tasks] }
            : { ...vehicle }
        ),
      };
    case "UPDATE_VEHICLE_STATUS":
      const newList1 = state.vehiclesList.map((vehicle: Vehicle) =>
        vehicle.id === payload.vehicleId
          ? { ...vehicle, status: payload.status }
          : { ...vehicle }
      );

      return {
        ...state,
        vehiclesList: newList1,
      };

    case "COMPLETE_VEHICLE_TASK":
      return {
        ...state,
        vehiclesList: state.vehiclesList.map((vehicle: Vehicle) =>
          vehicle.id === payload.vehicleId
            ? {...vehicle, vehicleTasks: vehicle.vehicleTasks?.map((task) => task.id === payload.taskId ? {...task, status: "COMPLETED"} : {...task})}
            : { ...vehicle }
        ),
      }   

    case "ADD_NOTES":
      let vehicleList: any = [];
      if (state.vehiclesList) {
        if (payload.rentalId) {
          vehicleList = state.vehiclesList.map((data: Vehicle) => {
            const filteredRental = data.rentals?.find(
              (rental: RentalInterface) => rental.id === payload.rentalId
            );
            if (filteredRental) {
              let updatedNotes: any = [];
              if (filteredRental.rentalNotes)
                updatedNotes = [
                  ...filteredRental.rentalNotes,
                  { ...payload, createdAt: new Date() },
                ];
              const updatedRental = data.rentals?.map(
                (rental: RentalInterface, index: number) => {
                  if (rental.id === filteredRental.id) {
                    return { ...rental, rentalNotes: updatedNotes };
                  } else {
                    return { ...rental };
                  }
                }
              );
              return { ...data, rentals: updatedRental };
            } else {
              return { ...data };
            }
          });
        }
        if (payload.vehicleId) {
          vehicleList = state.vehiclesList.map((data: Vehicle) => {
            if (data.id === payload.vehicleId) {
              let updatedNotes: any = [];
              if (data.vehicleNotes)
                updatedNotes = [
                  ...data.vehicleNotes,
                  { ...payload, createdAt: new Date() },
                ];
              return { ...data, vehicleNotes: updatedNotes };
            } else {
              return { ...data };
            }
          });
        }
      }
      return {
        ...state,
        vehiclesList: vehicleList,
      };

    case "EDIT_NOTES":
      let oldVehicleList: any = [];
      if (state.vehiclesList) {
        if (payload.rentalId) {
          oldVehicleList = state.vehiclesList.map((data: Vehicle) => {
            const filteredRental = data.rentals?.find(
              (rental: RentalInterface) => rental.id === payload.rentalId
            );
            if (filteredRental) {
              const updatedNotes = filteredRental.rentalNotes?.map((note) => {
                return note.id === payload.id
                  ? { ...note, ...payload }
                  : { ...note };
              });
              const updatedRental = data.rentals?.map(
                (rental: RentalInterface, index: number) => {
                  if (rental.id === filteredRental.id) {
                    return { ...rental, rentalNotes: updatedNotes };
                  } else {
                    return { ...rental };
                  }
                }
              );
              return { ...data, rentals: updatedRental };
            } else {
              return { ...data };
            }
          });
        }
        if (payload.vehicleId) {
          oldVehicleList = state.vehiclesList.map((data: Vehicle) => {
            if (data.id === payload.vehicleId) {
              const updatedNotes = data.vehicleNotes?.map((note) => {
                return note.id === payload.id
                  ? { ...note, ...payload }
                  : { ...note };
              });
              return { ...data, vehicleNotes: updatedNotes };
            } else {
              return { ...data };
            }
          });
        }
      }
      return {
        ...state,
        vehiclesList: oldVehicleList,
      };

    case "UPDATE_IMAGES":
      return {
        ...state,
        vehiclesList: state.vehiclesList.map((vehicle: Vehicle) =>
          vehicle.id === payload.vehicleId
            ? { ...vehicle, images: payload.images }
            : { ...vehicle }
        ),
      };

    case "UPDATE_PRIMARY_IMAGES":
      return {
        ...state,
        vehiclesList: state.vehiclesList.map((vehicle: Vehicle) =>
          vehicle.id === payload.vehicleId
            ? { ...vehicle, primaryImageUrl: payload.url }
            : { ...vehicle }
        ),
      };

    case "UPDATE_DOCUMENT" :
      return {
        ...state,
        vehiclesList: state.vehiclesList.map((vehicle: Vehicle) =>
          vehicle.id === payload.vehicleId
            ? { ...vehicle, registrationDocument: payload.url }
            : { ...vehicle }
        ),
      }
    case "ADD_VEHICLE_DOCUMENT" :
      console.log(payload)
      return {
        ...state,
        vehiclesList: state.vehiclesList.map((vehicle: Vehicle) =>
          vehicle.id === payload.vehicleId && vehicle?.vehicleDocuments && payload.urls
            ? { ...vehicle, vehicleDocuments: [...vehicle?.vehicleDocuments, ...payload.urls] }
            : { ...vehicle }
        ),
      }
    case "DELETE_VEHICLE_DOC" :
      console.log(payload)
      let vehicles: any = [];
      vehicles = state.vehiclesList.map((data: Vehicle) => {
        if (data.id === payload.vehicleId) {
          const updateDocuments = data.vehicleDocuments?.filter(
            (document) => document.id !== payload.id
          );
          return { ...data, vehicleDocuments: updateDocuments };
        } else {
          return { ...data };
        }
      });
      return {
        ...state,
        vehiclesList: vehicles
      }      
    case "DELETE_NOTE":
      let vehiclesList: any = [];
      if (state.vehiclesList) {
        if (payload.rentalId) {
          vehiclesList = state.vehiclesList.map((data: Vehicle) => {
            const filteredRental = data.rentals?.find(
              (rental: RentalInterface) => rental.id === payload.rentalId
            );
            if (filteredRental) {
              const updatedNotes = filteredRental.rentalNotes?.filter(
                (note) => note.id !== payload.id
              );
              const updatedRental = data.rentals?.map(
                (rental: RentalInterface, index: number) => {
                  if (rental.id === filteredRental.id) {
                    return { ...rental, rentalNotes: updatedNotes };
                  } else {
                    return { ...rental };
                  }
                }
              );
              return { ...data, rentals: updatedRental };
            } else {
              return { ...data };
            }
          });
        }
        if (payload.vehicleId) {
          vehiclesList = state.vehiclesList.map((data: Vehicle) => {
            if (data.id === payload.vehicleId) {
              const updatedNotes = data.vehicleNotes?.filter(
                (note) => note.id !== payload.id
              );
              return { ...data, vehicleNotes: updatedNotes };
            } else {
              return { ...data };
            }
          });
        }
      }
      return {
        ...state,
        vehiclesList,
      };
    default:
      return state;
  }
};
