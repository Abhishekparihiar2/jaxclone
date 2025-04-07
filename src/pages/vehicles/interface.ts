import {
  RentalInterface,
  Vehicle,
  VehiclesPage,
} from "../../store/vehicles/interface";

export interface VehilceFilterInterface {
    vehicleNumber?: string;
    setVehicleNumber: (data: string) => void;
    make?: string;
    setMake: (data: string) => void;
    tag?: string;
    setTag: (data: string) => void
    vin?: string;
    setVIN: (data: string) => void
    model?: string;
    setModel: (data: string) => void
    // year?: Date | null;
    setYear: (data: Date) => void
    type?: string;
    setType: (data: string) => void
    purchase?: Date | null;
    setPurchase: (data: Date) => void;
    customer?: string;
    setCustomer: (data: string) => void;
    search: () => void;
    reset: () => void;
    handleFilters: (e: any) => void;
    handleRangeInput: (minFieldName:string, minFieldValue:number, maxFieldName:string, maxFieldValue:number) => void;
    handlePurchaseFilters: (dates: any) => void;
    handleYears: (dates: any) => void;
    // handleYearFilters: (date: Date, type: string) => void;
    filters: FilterInterface;
    setExpandFilters: (status: boolean) => void;
    expandFilters: boolean;
    handleDropDown: (name: string, value: []) => void;
}

export interface VehicleListHeaderInterface {
  totalPageSize: number;
  handleExport: () => void;
  changePageSize: (page: number) => void;
}

export interface VehicleListInterface {
  pageInfo: VehiclesPage;
  sortBy: string;
  sortType: string;
  setSortBy: any;
  setSortType: any;
}

export interface VehicleImagesInterface {
  newVehicleId?: number;
  handleClose?: () => void;
}

export interface VehicleInformationInterface {
  vehicle?: Vehicle;
}

export interface VehicleCurrentRentalInterface {
  currentRental: RentalInterface | null;
  currentRentalTotal: number;
  vehicle?: Vehicle
}

export interface VehicleRentalInterface {
  vehicle?: Vehicle;
}

export interface VehicleImagesInterface {
  vehicle?: Vehicle;
  handleToggle?: () => void;
}

export interface VehicleFinancialInterface {
  vehicle?: Vehicle;
  totalRevenue: () => void;
}

export interface VehicleTaskInterface {
  vehicle?: Vehicle;
}

export interface NotesInterface {
  vehicle?: Vehicle;
}

export interface VehicleInspectionInterface {
  vehicle?: Vehicle;
}

export interface VehicleDocumentsInterface {
  vehicle?: Vehicle;
  handleClose?: () => void
}

export interface PurchaseInterface {
  startDate: string | null;
  endDate: string | null;
}

export interface YearsInterface {
  startYear: string | null;
  endYear: string | null;
}

export interface FilterInterface {
    vehicleNumber: string | null;
    make: [
      {
        value: string,
        label: string,
      }
    ] | null;
    tag: string | null;
    vin: string | null;
    model: [
      {
        value: string,
        label: string,
      }
    ] | null;
    year?: YearsInterface | null;
    type?: [
      {
        value: string,
        label: string,
      }
    ] | null;
    purchase?: PurchaseInterface | null;
    customer: string | null;
    status?: [
      {
        value: string,
        label: string,
      }
    ] | null; 
    minDailyRate: number,
    maxDailyRate: number,
    minVehicleCost: number,
    maxVehicleCost: number,
    minOdometer: number,
    maxOdometer: number,
}
