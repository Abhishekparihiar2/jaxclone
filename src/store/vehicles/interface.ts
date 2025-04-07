import { ImagesInterface } from "../../pages/vehicles/shared/add-images";

export type VehicleList = {
  count: number;
  vehiclesList: Vehicle[];
};

export type VehiclesPage = {
  count: number;
  vehiclesList: Vehicle[];
  vehiclesRegistrationList?: Vehicle[];
  notes?: string;
  rentalId?: number;
  userId?: number;
  author?: string;
  vehicleId?: number;
  id?: number;
  vehicle?: Vehicle;
  rentals?: RentalInterface[];
  tasks?: VehicleTasks[];
  images?: ImagesInterface[];
  url?: string;
  status?: string;
  taskId?: number;
  urls?: URLS[];
};

export type URLS = {
  url : string;
  vehicleId : number;
  name: string;
  isRegistrationDocument: number;
  id: number;
}

export type SetVehiclesPage = {
  type: string;
  payload: VehiclesPage;
};

export type Vehicle = {
  number: string;
  make: string;
  model: string;
  year: Date | null;
  tagNumber: string;
  vin: string;
  color: string;
  vehicleTypeId: number | null;
  city: string;
  state: string;
  transmission: string;
  odometer: number;
  odometerDate: Date | null;
  door: number;
  gasTankSize: number;
  fuelType: string;
  lastOilChangeDate: Date | null;
  priceAdjustment: number;
  vehicleCost: number;
  vehicleSalePrice: number;
  buyer: string;
  buyDate: Date | null;
  sellDate: Date | null;
  registrationExpDate: Date | null;
  description: string;
  status: string;
  features: string;
  primaryImageUrl: string;
  registrationDocument: string;
  DayRate: number;
  id?: number;
  images?: VehicleImages[];
  rentals?: RentalInterface[];
  vehicleTasks?: VehicleTasks[];
  vehicleNotes?: Notes[];
  vehicleAlerts?: VehicleAlerts[];
  vehicleInspections?: VehicleInspections[];
  vehicleDocuments?: VehicleDocuments[];
  priceDecrement?: number| null;
  priceIncrement?: number| null;
};

export interface VehicleAlerts {
  message?: string;
  vehicleId?: number;
}

export interface VehicleDocuments {
  url?: string;
  id?: number;
  name?: string;
}

export interface VehicleInspections {
  id: number;
  inspectionTypeId?: number;
  isExtPresentable?: number;
  isIntPresentable?: number;
  isTagPresent?: number;
  isRegPresent?: number;
  exteriorNote?: string;
  interiorNote?: string;
  isWorkingKeyFOB?: number;
  isSpareTirePresent?: number;
  isTireJackPresent?: number;
  isJumperCablePresent?: number;
  isCurrentOilChange?: number;
  fuel?: string;
  isPressureWarningLightsOff?: number;
  isDashWarning?: number;
  frontDriverSideTireTread?: string;
  frontPassengerSideTread?: string;
  rearPassengerSideTread?: string;
  frontDriverSideBrakeThickness?: string;
  frontPassengerSideBrakeThickness?: string;
  rearDriverSideBrakeThickness?: string;
  rearPassengerSideBrakeThickness?: string;
  isSeatBeltsFunctional?: number;
  isHeadLightsFunctional?: number;
  isTailLightFunctional?: number;
  isIndicatorsFunctional?: number;
  isParkingBrakeFunctional?: number;
  isSteeringFunctional?: number;
  isDoorsTrunkFunctional?: number;
  isGlassIntact?: number;
  isWindShieldWipersFunctional?: number;
  isAcHeatFunctional?: number;
  isHornFunctional?: number;
  isWindowFunctional?: number;
  otherNotes?: string;
  typeOfInspection?: string;
}

export interface VehicleTasks {
  id: number;
  name: string;
  userId: number;
  status: string;
}

export interface RentalInterface {
  id: number;
  rentalNumber: string;
  vehicleId: number;
  pickupAt: string;
  returnAt: string;
  returnFormattedAt: string;
  startedAtFormatted: string;
  pickupFormattedAt: string;
  Total: number;
  extended: ExtendedRentalInterface[];
  user: UserInterface;
  status: string;
  Slot: string;
  pickupTime: string;
  returnTime: string;
  duration: number;
  rentalNotes?: Notes[];
  userFirstName?: string;
  userLastName?: string;
  profileImage?: string;
  TotalAmount: number;
  userId?: number;
  oldVehicleId?: number;
  switch?: Switch
}

export interface Switch {
  id: number;
  status: string;
  rentalId: number;
  finalVehicleId: number;
  initialVehicleId: number;
  updatedAt: string;
}

export interface Notes {
  id: number;
  notes: string;
  rentalId?: number;
  userId: number;
  vehicleId?: number;
  author: string;
  createdAt: Date;
}

export interface UserInterface {
  firstName: string;
  lastName: string;
  profileImageUrl: string;
}

export interface ExtendedRentalInterface {
  id: number;
  total: number;
  returnAt: string;
}

export interface VehicleImages {
  url: string;
  vehicleId: number;
  id: number;
}

export interface AddTaskInterface {
  name: string;
  vehicleId: number;
  userId: number;
}

export interface AddNoteInterface {
  notes: string;
  vehicleId: number;
  userId: number;
  author: string;
}

export interface RentalNoteInterface {
  notes: string;
  rentalId?: number;
  userId: number;
  author: string;
  vehicleId?: number;
  id?: number;
}

export interface DeleteRentalNoteInterface {
  id: number;
  rentalId?: number;
  vehicleId?: number;
}

export interface DeleteVehicleDocInterface {
  id?: number;
  vehicleId?: number;
}

export interface UpdateListInterface {
  vehicle: Vehicle | null;
}

export interface SearchNotesInterface {
  vehicleId?: number;
  rentalId?: number;
}

export interface SearchTasksInterface {
  vehicleId: number;
  status?: string;
}

export interface UpdateNotesInListInterface {
  notes: Notes[] | null;
  rentalId?: number;
  vehicleId?: number;
}

export interface UpdateRentalInListInterface {
  rentals: RentalInterface[] | null;
  vehicleId: number | null;
}

export interface UpdateTasksInListInterface {
  tasks: VehicleTasks[] | null;
  vehicleId: number | null;
}

export interface SetVehicleListInterface {
  count: number | null;
  vehiclesList: Vehicle[] | null;
}

export interface UpdateVehicleImagesInterface {
  vehicleId: number | null;
  images: ImagesInterface[] | null;
}

export interface UpdateVehiclePrimaryImagesInterface {
  vehicleId: number | null;
  url: string | null;
}

export interface UpdateVehicleTaskInterface {
  vehicleId: number | null,
  tasks: VehicleTasks[]
}


export interface CompleteTaskInterface {
  vehicleId: number | null,
  taskId: number | null,
}

export interface AddVehicleDocumentInterface {
  vehicleId: number | null;
  urls: URLS[];
}

