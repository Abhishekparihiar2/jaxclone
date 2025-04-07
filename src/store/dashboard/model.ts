import { VehiclesCount } from "./interface";

interface WidgetInterface {
  vehicles: VehiclesCount[];
  totalCount?: number;
}

interface DashBoardInterface {
  widget: WidgetInterface;
  count: number;
}

interface BackgroundCheckInterface {
  count: number;
  widget: WidgetInterface;
}

export class DashBoardWidget {
  type: string = "SET_VEHICLES_WIDGET";
  payload: DashBoardInterface | null = null;
  constructor(data: any = null) {
    const vehiclesList: VehiclesCount[] = [];
    if (data && data.length > 0) {
      data.forEach((vehicleDetails: any) => {
        vehiclesList.push(vehicleDetails);
      });
    }

    this.payload = {
      widget: {
        vehicles: vehiclesList,
      },
      count: 0,
    };
  }
  action() {
    return {
      type: this.type,
      payload: this.payload,
    };
  }
}

export class BackgroundChecks {
  type: string = "SET_BACKGROUND_CHECKS";
  payload: BackgroundCheckInterface;
  constructor(data: any = null) {
    const vehiclesList: VehiclesCount[] = [];
    let backgroundChecksCount = 0;
    if (data) {
      backgroundChecksCount = data.count;
    }
    this.payload = {
      count: backgroundChecksCount,
      widget: {
        vehicles: vehiclesList,
      },
    };
  }
  action() {
    return {
      type: this.type,
      payload: this.payload,
    };
  }
}
