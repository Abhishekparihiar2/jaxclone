import { combineReducers, Reducer } from "redux";
import { UserState } from "./login/interface";
import { login } from "./login/reducer";
import { dashboard } from "./dashboard/reducer";
import { Dashboard } from "./dashboard/interface";
import { ResponseInterface } from "./shared/interface";
import { response } from "./shared/reducer";
import { VehiclesPage } from "./vehicles/interface";
import { RentalsPage, RentalDetailsPage } from "./rentals/model";
import { vehiclesPage } from "./vehicles/reducer";
import { rentalsPage, rentalDetailsPage } from "./rentals/reducer";
import { OTPInterface } from "./resetPassword/interface";
import { otp } from "./resetPassword/reducer";
import { NotesSectionState } from "./notes/model";
import { notesSection } from "./notes/reducer";
import { HamburgerState } from "./hamburger/interface";
import { hamburger } from "./hamburger/reducer";
import { InspectionList, ViewInspectionPageState } from "./inspections/models";
import { inspectionListPage, viewInspectionPage } from "./inspections/reducer";
import { TaskPageState } from "./task/models";
import { taskViewPage } from "./task/reducer";
import { CustomersPage, CustomerDetailsPage } from "./customers/model";
import { customersPage, customerDetailsPage } from "./customers/reducer";
import { DropdownValuesState } from "./dropdownValues/model";
import { dropdownValues } from "./dropdownValues/reducer";
import { BackgroundCheckPageState } from "./backgroundChecks/models";
import { backgroundCheckPage } from "./backgroundChecks/reducer";
import { ManageEmployeesPage } from "./employees/model";
import { manageEmployeesState } from "./employees/reducer";
import { RevenueList } from "./revenue/models";
import { revenueList } from "./revenue/reducer";
import { promoCodeReducer } from "./promoCode/reducer";
import { customSettings } from "./customSetting/reducer";
import { CustomSettingPage } from "./customSetting/models";
import { VehicleTypesState } from "../shared/models";
import { vehicleTypesValues  } from "./vehicleTypes/reducer";
import { loader } from "./loader/reducer";
import { LoaderState } from "./loader/interface";
import { PromoCodePage } from './promoCode/models';
import { BlackoutDatesPage } from './blackoutDates/model';
import { blackouts } from './blackoutDates/reducer';

export type PayloadAction<PayloadType> = {
  type: string;
  payload: PayloadType;
};

export type StoreInterface = {
  login: UserState;
  response: ResponseInterface;
  dashboard: Dashboard;
  vehiclesPage: VehiclesPage;
  rentalsPage: RentalsPage;
  promoCodeReducer: PromoCodePage;
  rentalDetailsPage: RentalDetailsPage;
  otp: OTPInterface;
  notesSection: NotesSectionState;
  hamburger: HamburgerState;
  viewInspectionPage: ViewInspectionPageState;
  customersPage: CustomersPage;
  customerDetailsPage: CustomerDetailsPage;
  inspectionListPage: InspectionList;
  taskViewPage: TaskPageState;
  dropdownValues: DropdownValuesState;
  backgroundCheckPage: BackgroundCheckPageState;
  manageEmployeesState: ManageEmployeesPage;
  revenueList: RevenueList;
  customSettings: CustomSettingPage;
  vehicleTypesValues: VehicleTypesState;
  loader: LoaderState;
  blackouts: BlackoutDatesPage;
};

export const root: Reducer<StoreInterface> = combineReducers<StoreInterface>({
  login,
  response,
  dashboard,
  vehiclesPage,
  rentalsPage,
  rentalDetailsPage,
  otp,
  notesSection,
  hamburger,
  viewInspectionPage,
  inspectionListPage,
  taskViewPage,
  customersPage,
  customerDetailsPage,
  dropdownValues,
  backgroundCheckPage,
  manageEmployeesState,
  revenueList,
  customSettings,
  vehicleTypesValues,
  loader,
  promoCodeReducer,
  blackouts
});

export type RootState = ReturnType<typeof root>;
