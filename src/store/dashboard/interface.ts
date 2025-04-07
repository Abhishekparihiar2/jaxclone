export type VehiclesCount = {
  status: string;
  displyName: string;
  backgroundColor: string;
  count: number;
  percentage: number;
};

export type VehiclesWidget = {
  vehicles: VehiclesCount[];
  totalCount: number;
};

export type BackgroundChecksWidget = {
  count: number;
};

export type Dashboard = {
  vehiclesWidget: VehiclesWidget;
  backgroundChecksWidget: BackgroundChecksWidget;
};

export type SetDashboard = {
  type: string;
  payload: {
    widget: VehiclesWidget;
    count: number;
  };
};
