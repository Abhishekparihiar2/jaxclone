import { SetDashboard, Dashboard } from "./interface";

const initialState = {
  backgroundChecksWidget: {
    count: 0,
  },
  vehiclesWidget: {
    totalCount: 0,
    vehicles: [
      {
        status: "AVAILABLE",
        displyName: "Available",
        backgroundColor: "#2cd889",
        count: 0,
        percentage: 0,
      },
      {
        status: "PENDING_INSPECTION",
        displyName: "Pending Inspection",
        backgroundColor: "#e62e79",
        count: 0,
        percentage: 0,
      },
      {
        status: "BOOKED",
        displyName: "On Rent",
        backgroundColor: "#f41d0d",
        count: 0,
        percentage: 0,
      },
      {
        status: "IMPOUNDED",
        displyName: "Impounded",
        backgroundColor: "#788fff",
        count: 0,
        percentage: 0,
      },
      {
        status: "PENDING_PICKUP",
        displyName: "Pending Pickup",
        backgroundColor: "#5800af",
        count: 0,
        percentage: 0,
      },
      {
        status: "INSURANCE_HOLD",
        displyName: "Insurance Hold",
        backgroundColor: "#fe8202",
        count: 0,
        percentage: 0,
      },
      {
        status: "IN_REPAIR",
        displyName: "In Repair",
        backgroundColor: "#b024bf",
        count: 0,
        percentage: 0,
      },
      {
        status: "FOR_SALE",
        displyName: "For Sale",
        backgroundColor: "#0070d2",
        count: 0,
        percentage: 0,
      },
      {
        status: "PENDING_DELIVERY",
        displyName: "Pending Delivery",
        backgroundColor: "#2cd8d8",
        count: 0,
        percentage: 0,
      },
      {
        status: "UNAVAILABLE",
        displyName: "Unavailable",
        backgroundColor: "#1f335e",
        count: 0,
        percentage: 0,
      },
      {
        status: "PENDING_IN_FEELING",
        displyName: "Pending In-fleeting",
        backgroundColor: "#550000",
        count: 0,
        percentage: 0,
      },
    ],
  },
};

export const dashboard = (
  state: Dashboard = initialState,
  { type, payload }: SetDashboard
) => {
  switch (type) {
    case "SET_VEHICLES_WIDGET":
      const vehiclesWidget = state.vehiclesWidget;
      const inputMap: Map<string, number> = new Map<string, number>();
      payload?.widget?.vehicles.forEach((inputValue) => {
        inputMap.set(inputValue.status, inputValue.count);
      });
      vehiclesWidget?.vehicles?.forEach((stateVehicle: any) => {
        if (inputMap.get(stateVehicle.status)) {
          stateVehicle.count = inputMap.get(stateVehicle.status);
        }
      });
      const totalCount = vehiclesWidget?.vehicles?.reduce(
        (partialSum, a) => partialSum + a.count,
        0
      );
      if (totalCount === 0) {
        vehiclesWidget?.vehicles?.forEach((stateVehicle: any) => {
          stateVehicle.percentage = 0;
        });
        vehiclesWidget.totalCount = totalCount;
      } else {
        vehiclesWidget?.vehicles?.forEach((stateVehicle: any) => {
          stateVehicle.percentage = (
            (stateVehicle.count * 100) /
            totalCount
          ).toFixed(2);
        });
        vehiclesWidget.totalCount = totalCount;
      }
      return {
        ...state,
        vehiclesWidget: vehiclesWidget,
      };
    case "SET_BACKGROUND_CHECKS":
      const backgroundChecksWidget = state.backgroundChecksWidget;
      backgroundChecksWidget.count = payload?.count;

      return {
        ...state,
        backgroundChecksWidget: backgroundChecksWidget,
      };

    default:
      return state;
  }
};
