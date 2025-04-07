import { Task, VehicleInspectionImages } from "../../store/shared/model";

enum InspectionType
{
  "Pre-rental Inspection" = 1,
  "Post-rental Inspection" = 2,
  "Initial Inspection" = 3
}

enum DROP_DOWN_TYPES
{
  "CITY" = "CITY",
  "STATE" = "STATE",
  "FUEL_TYPE" = "FUEL_TYPE",
  "VEHICLE_MAKE" = "VEHICLE_MAKE",
  "VEHICLE_MODEL" = "VEHICLE_MODEL",
  "VEHICLE_COLOR" = "VEHICLE_COLOR",
  "VEHICLE_TRANSMISSION" = "VEHICLE_TRANSMISSION",
};

enum VehicleStatus
{
  "AVAILABLE" = "Available",
  "BOOKED" = "On Rent",
  "PENDING_PICKUP" = "Pending Pickup",
  "IN_REPAIR" = "In Repair",
  "PENDING_DELIVERY" = "Pending Delivery",
  "PENDING_IN_FLEETING" = "Pending In-fleeting",
  "PENDING_INSPECTION" = "Pending Inspection",
  "IMPOUNDED" = "Impounded",
  "INSURANCE_HOLD" = "Insurance Hold",
  "FOR_SALE" = "For Sale",
  "UNAVAILABLE" = "Unavailable",
  "SOLD" = "Sold",
}

enum CustomSettingExportHeader {
  "DayRate" = "Day Rate",
  "InsurancePlan" = "Insurance Plan",
  "MaintenancePlan" = "Maintenance Plan",
  "ProtectionPlan" = "Protection Plan",
  "name" = "Vehicle Type",
  "AdminFee" = "Jax Admin Fee",
};

enum RevenueExportHeader {
  "firstName" = "First Name",
  "lastName" = "Last Name",
  "vehicleNumber" = "Vehicle Number",
  "RentalStatus" = "Rental Status",
  "rentalNumber" = "Rental Number",
  "pickupAt" = "Pickup Date",
  "returnAt" = "Return Date",
  "amount" = "Amount",
  "date" = "Rental Date",
  "duration" = "Duration",
  "extendRentalTransactionStatus" = "Extend Rental Transaction Status",
  "onTime" = "On Time",
  "status" = "Status",
}

enum EmployeeExportHeader {
  "addressLine1" = "Address Line 1",
  "addressLine2" = "Address Line 2",
  "backImageUrl" = "Back DL Image Url",
  "city" = "City",
  "dob" = "DOB",
  "email" = "Email",
  "employeeNumber" = "Employee Number",
  "expDate" = "Exp Date",
  "firstName" = "First Name",
  "frontImageUrl" = "Front Image Url",
  "isActive" = "Active",
  "isEmailVerified" = "Is Email Verified",
  "issueDate" = "DL Issue Date",
  "lastName" = "Last Name",
  "nickname" = "Nickname",
  "number" = "DL number",
  "permissions" = "Permissions",
  "phoneNumber" = "PhoneNumber",
  "profileImageUrl" = "Profile Image Url",
  "registrationStatus" = "Registration Status",
  "state" = "State",
  "status" = "Status",
  "zipCode" = "Zip Code",
}

enum BackgroundCheckExportHeader {
  "dlNumber" =  "Dl Number",
  "UserFirstName" =  "User First Name",
  "UserLastName" =  "User Last Name",
  "registeredOn" =  "Registered On",
  "status" =  "Status",
  "UserEmail" =  "User Email",
  "approvedDate" =  "Approved Date",
}

enum BlackoutDateExportHeader {
  "date" =  "Date",
  "name" =  "Name of holiday",
}

enum VehicleExpirationsExportHeader {
  "number" =  "VEHICLE NUMBER",
  "year" =  "YEAR",
  "make" =  "MAKE",
  "model" =  "MODEL",
  "vin" =  "VIN",
  "registrationExpDate" =  "EXPIRATION DATE"
}

enum InspectionExportHeader
{
  "typeOfInspection" =  "Type Of Inspection",
  "make" =  "Make",
  "model" =  "Model",
  "vehicleNumber" =  "Vehicle Number",
  "vin" =  "Vin",
  "year" =  "Year",
  "rentalNumber" =  "Rental Number",
  "status" =  "Status",
  "pickupAt" =  "Rental Pickup",
  "returnAt" =  "Rental Return At",
  "RentalStatus" =  "Rental Status",
  "dashWarningNote" =  "Dashboard Warning Note",
  "date" =  "Inspection Date",
  "exteriorNote" =  "Exterior Note",
  "frontDriverSideBrakeThickness" =  "Front Driver Side Brake Thickness",
  "frontPassengerSideBrakeThickness" =  "Front Passenger Side Brake Thickness",
  "frontDriverSideTireTread" =  "Front Driver Side Tire Tread",
  "frontPassengerSideTread" =  "Front Passenger Side Tread",
  "fuel" =  "Fuel",
  "inspectionTypeId" =  "Inspection Type Id",
  "inspector" =  "Inspector",
  "interiorNote" =  "Interior Note",
  "isAcHeatFunctional" =  "Is Ac Heat Functional",
  "isCurrentOilChange" =  "Is Current Oil Change",
  "isDashWarning" =  "Is Dash Warning",
  "isDoorsTrunkFunctional" =  "Is Doors Trunk Functional",
  "isExtPresentable" =  "Is Ext Presentable",
  "isGlassIntact" =  "Is Glass Intact",
  "isHeadLightsFunctional" =  "Is Head Lights Functional",
  "isHornFunctional" =  "Is Horn Functional",
  "isIndicatorsFunctional" =  "Is Indicators Functional",
  "isIntPresentable" =  "Is Int Presentable",
  "isJumperCablePresent" =  "Is Jumper Cable Present",
  "isKeyPresent" =  "Is Key Present",
  "isParkingBrakeFunctional" =  "Is Parking Brake Functional",
  "isPressureWarningLightsOff" =  "Is Pressure Warning Lights Off",
  "isRegPresent" =  "Is Reg Present",
  "isSeatBeltsFunctional" =  "Is Seat Belts Functional",
  "isSpareTirePresent" =  "Is Spare Tire Present",
  "isSteeringFunctional" =  "Is Steering Functional",
  "isTagPresent" =  "Is Tag Present",
  "isTailLightFunctional" =  "Is Tail Light Functional",
  "isTireJackPresent" =  "Is Tire Jack Present",
  "isWindShieldWipersFunctional" =  "Is Wind Shield Wipers Functional",
  "isWindowFunctional" =  "Is Window Functional",
  "isWorkingKeyFOB" =  "Is Working Key FOB",
  "odometer" =  "Odometer",
  "otherNotes" =  "OtherNotes",
  "rearDriverSideBrakeThickness" =  "Rear Driver Side Brake Thickness",
  "rearDriverSideTread" =  "Rear Driver Side Tread",
  "rearPassengerSideBrakeThickness" =  "Rear Passenger Side Brake Thickness",
  "rearPassengerSideTread" =  "Rear Passenger Side Tread",
  "DayRate" =  "Day Rate",
  "MaintenancePlan" =  "Maintenance Plan",
  "ProtectionPlan" =  "Protection Plan",
  "InsurancePlan" =  "Insurance Plan",
  "Total" =  "Total",
  "Surcharge" =  "Surcharge",
  "Tax" =  "Tax",
  "Slot" =  "Slot",
  "RentalDuration" =  "Rental Duration",
  "agreementUrl" =  "Agreement Url",
}

enum VehicleExportHeader
{
  "make" = "Make",
  "model" = "Model",
  "number" = "Number",
  "vin" = "VIN",
  "year" = "Year",
  "vtName" = "Vehicle Type Name",
  "buyDate" =  "Date of purchase",
  "buyer" =  "Buyer",
  "color" =  "Color",
  "odometer" = "Odometer",
  "door" = "Door",
  "fuelType" =  "Fuel Type",
  "features" = "Features",
  "city" =  "City",
  "state" = "State",
  "tagNumber" = "Tag Number",
  "lastOilChangeDate" = "Oil Changed",
  "primaryImageUrl" = "Primary Image",
  "registrationDocument" = "Registration Document",
  "registrationExpDate" = "Registration Expire At",
  "status" = "Status",
  "transmission" = "Transmission",
  "gasTankSize" = "Gas Tank Size",
  "description" = "Vehicle Description",
  "vehicleCost" = "Vehicle Cost",
  "vehicleSalePrice" = "Vehicle Sale Price",
  "DayRate" =  "DayRate",
}

enum PromoCodeExportHeader 
{
  "codeName" = "Name",
  "startDate"= "Start Date" ,
  "expirationDate"= "Expire Date",
  "codeType" = "Code Type",
  "offer" = "Code Offer",
  "extension" = "Extension Allowed",
  "useType" = "Use Type",
  "rentalTerm"= "Rental Term",
  "firstTimeRenter" = "First Time Renter",
  "totalCount"= "Total Count",
  "isActive"=  "Active",
  "name" = "Vehicle Type"
}

enum CustomerExportHeader
{
  "BackgroundStatus" = "Background Status",
  "LicenseNo" = "License No",
  "firstName" = "First Name",
  "lastName" = "Last Name",
  "addressLine1" = "Address 1",
  "addressLine2" = "Address 2",
  "city" = "City",
  "dob" = "DOB",
  "email" = "Email",
  "nickname" = "Nickname",
  "phoneNumber" = "Phone",
  "profileImageUrl" = "Profile Image Url",
  "registrationStatus" = "Registration Status",
  "state" = "State",
  "status" = "Status",
  "stripeCustomerId" = "Stripe Customer Id",
  "zipCode" = "Zip Code",
  "argyleResponse" = "Argyle Data",
}

enum RentalsExportHeader {
  "rentalNumber" = "Rental Number",
  "UserFirstName" = "Customer First name",
  "UserLastName" = "Customer Last name",
  "UserEmail" = "User Email",
  "UserPhone" = "User Phone",
  "DOB" = "Date of birth",
  "VehicleName" = "Vehicle Make",
  "VehicleModel" = "Vehicle Model",
  "VehicleYear" = "Vehicle Year",
  "agreementUrl" = "Rental Agreement",
  "duration" = "Rental Duration",
  "fuelLevelIn" = "Fuel Level",
  "fuelLevelOut" = "Pick up fuel level",
  "includedMilage" = "Included Milage",
  "pickupLocation" = "Pickup Location",
  "returnLocation" = "Return Location",
  "status" = "Status",
  "TagNumber" = "Vehicle TagNumber",
  "VIN" = "VIN",
  "VehicleStatus" = "Vehcile Status",
  "City" = "City",
  "ZipCode" = "ZipCode",
  "State" = "State",
  "pickupTime" = "Pickup Time",
  "pickupAt" =  "Pick Date",
  "returnAt" = "Return Date",
  "DayRate" =  "DayRate",
  "InsurancePlan" =  "InsurancePlan",
  "MaintenancePlan" = "MaintenancePlan",
  "ProtectionPlan" = "ProtectionPlan",
  "JaxAdminFee" = "Jax Admin Fee",
  "returnTime" = "Return Time",
  "Surcharge" = "Surcharge",
  "Tax" = "Tax",
  "Total" = "Total",
}



enum UserStatus
{
  "ACTIVE" = "Active",
  "INACTIVE" = "Inactive",
  "BLACKLISTED" = "Blacklisted",
  "DELINQUENT" = "Delinquent",
}

enum RentalStatus
{

  "BOOKED" = "Booked",
  "ACTIVE" = "Active",
  "FINISHED" = "Complete",
  "CANCELED" = "Cancelled",
  "PENDING" = "Pending",
  "PRE_RENTAL_INSPECTION_DONE" = "Pre rental inspection done",
  "POST_RENTAL_INSPECTION_DONE" = "Post rental inspection done",
  "LATE" = "Late"
}

enum InspectionStatus
{
  "OPEN" = "Open",
  "FINISHED" = "Closed",
}

enum BackgroundChecksStatus {
  "OPEN" = 'Pending', 
  "PENDING" = 'Pending', 
  "COMPLETED" = 'Approved', 
  "REJECTED" = 'Declined', 
}

export class VehicleTypesState {
  vehicleTypes: {
    [id: number]: string;
  } = {};
  constructor ( data: any )
  {
    data?.forEach((vehicle: VehicleTypes)=>{
      this.vehicleTypes[vehicle.id as any] = vehicle.name;
    })
  }
}

export const VehicleWidgets = {
  statuses:[
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
}
export class VehicleTypes {
  id: number;
  name: string;
  constructor ( data: any )
  {
    this.id = data.id;
    this.name = data.name;
  }
}

export class Vehicle {
  number: string = "";
  make: string = "";
  model: string = "";
  year: string = "";
  tagNumber: string = "";
  vin: string = "";
  color: string = "";
  vehicleTypeId: number = 0;
  city: string = "";
  state: string = "";
  transmission: string = "";
  odometer: number = 0;
  door: number = 0;
  gasTankSize: number = 0;
  fuelType: string = "";
  lastOilChangeDate: string = "";
  priceAdjustment: number = 0;
  vehicleCost: number = 0;
  vehicleSalePrice: number = 0;
  buyer: string = "";
  buyDate: string = "";
  sellDate: string = "";
  registrationExpDate: string = "";
  description: string = "";
  status: string = "";
  features: string = "";
  primaryImageUrl: string = "";
  registrationDocument: string = "";
  DayRate: number = 0;
  id: number = 0;

  constructor(data: any) {
    if (data) {
      this.number = data.number;
      this.make = data.make;
      this.model = data.model;
      this.year = data.year;
      this.tagNumber = data.tagNumber;
      this.vin = data.vin;
      this.color = data.color;
      this.vehicleTypeId = data.vehicleTypeId;
      this.city = data.city;
      this.state = data.state;
      this.transmission = data.transmission;
      this.odometer = data.odometer;
      this.door = data.door;
      this.gasTankSize = data.gasTankSize;
      this.fuelType = data.fuelType;
      this.lastOilChangeDate = data.lastOilChangeDate;
      this.priceAdjustment = data.priceAdjustment;
      this.vehicleCost = data.vehicleCost;
      this.vehicleSalePrice = data.vehicleSalePrice;
      this.buyDate = data.buyDate;
      this.buyDate = data.buyDate;
      this.sellDate = data.sellDate;
      this.registrationExpDate = data.registrationExpDate;
      this.description = data.description;
      this.status = data.status;
      this.features = data.features;
      this.primaryImageUrl = data.primaryImageUrl;
      this.registrationDocument = data.registrationDocument;
      this.DayRate = data.DayRate;
      this.id = data.id;
    }
  }
}

export class Inspection
{
  rentalId?: number;
  rentalNumber: string = "";
  inspectionTypeId?: number;
  userId?: number;
  isExtPresentable: number = 1;
  isIntPresentable: number = 1;
  isTagPresent: number = 1;
  isRegPresent: number = 1;
  exteriorNote: string = "";
  interiorNote: string = "";
  dashWarningNote: string = "";
  isWorkingKeyFOB: number = 1;
  isKeyPresent: number = 1;
  isSpareTirePresent: number = 1;
  isTireJackPresent: number = 1;
  isJumperCablePresent: number = 1;
  isCurrentOilChange: number = 1;
  fuel: string = "full";
  isPressureWarningLightsOff: number = 1;
  isDashWarning: number = 1;
  frontDriverSideTireTread: string = "";
  frontPassengerSideTread: string = "";
  rearPassengerSideTread: string = "";
  rearDriverSideTread: string = "";
  frontDriverSideBrakeThickness: string = "";
  frontPassengerSideBrakeThickness: string = "";
  rearDriverSideBrakeThickness: string = "";
  rearPassengerSideBrakeThickness: string = "";
  isSeatBeltsFunctional: number = 1;
  isHeadLightsFunctional: number = 1;
  isTailLightFunctional: number = 1;
  isIndicatorsFunctional: number = 1;
  isParkingBrakeFunctional: number = 1;
  isSteeringFunctional: number = 1;
  isDoorsTrunkFunctional: number = 1;
  isGlassIntact: number = 1;
  isWindShieldWipersFunctional: number = 1;
  isAcHeatFunctional: number = 1;
  isHornFunctional: number = 1;
  isWindowFunctional: number = 1;
  otherNotes: string = "";
  typeOfInspection: string = "";
  vehicleId?: number;
  id?: number;
  odometer: number = 0;
  date?: Date;
  vehicleNumber?: string;
  frontImageUrl?: string;
  passengerImageUrl?: string;
  driverSideUrl?: string;
  rearSideUrl?: string;
  gaugesUrl?: string;
  number?: number;
  inspector?: string;
  tasks?: Task[] = [];
  vin?: string = "";
  vehicleInspectionImages?: VehicleInspectionImages[] = [];
  model?: string;
  make?: string;
  year?: Date;
  status?: InspectionStatus;

  constructor ( data: any )
  {
    if ( data )
    {
      this.id = data.id;
      this.date = new Date( data.date );
      this.vehicleNumber = data.vehicleNumber;
      this.odometer = data.odometer;
      this.exteriorNote = data.exteriorNote;
      this.dashWarningNote = data.dashWarningNote;
      this.frontDriverSideBrakeThickness = data.frontDriverSideBrakeThickness;
      this.frontDriverSideTireTread = data.frontDriverSideTireTread;
      this.frontPassengerSideTread = data.frontPassengerSideTread;
      this.fuel = data.fuel;
      this.inspectionTypeId = data.inspectionTypeId;
      this.isKeyPresent = data.isKeyPresent;
      this.interiorNote = data.interiorNote;
      this.isAcHeatFunctional = data.isAcHeatFunctional;
      this.isCurrentOilChange = data.isCurrentOilChange;
      this.isDashWarning = data.isDashWarning;
      this.isDoorsTrunkFunctional = data.isDoorsTrunkFunctional;
      this.isExtPresentable = data.isExtPresentable;
      this.isGlassIntact = data.isGlassIntact;
      this.isHeadLightsFunctional = data.isHeadLightsFunctional;
      this.isHornFunctional = data.isHornFunctional;
      this.isIndicatorsFunctional = data.isIndicatorsFunctional;
      this.isIntPresentable = data.isIntPresentable;
      this.isJumperCablePresent = data.isJumperCablePresent;
      this.isParkingBrakeFunctional = data.isParkingBrakeFunctional;
      this.isPressureWarningLightsOff = data.isPressureWarningLightsOff;
      this.isRegPresent = data.isRegPresent;
      this.isSeatBeltsFunctional = data.isSeatBeltsFunctional;
      this.isSpareTirePresent = data.isSpareTirePresent;
      this.isSteeringFunctional = data.isSteeringFunctional;
      this.isTagPresent = data.isTagPresent;
      this.isTailLightFunctional = data.isTailLightFunctional;
      this.isTireJackPresent = data.isTireJackPresent;
      this.isWindShieldWipersFunctional = data.isWindShieldWipersFunctional;
      this.isWindowFunctional = data.isWindowFunctional;
      this.isWorkingKeyFOB = data.isWorkingKeyFO;
      this.otherNotes = data.otherNotes;
      this.rearDriverSideBrakeThickness = data.rearDriverSideBrakeThickness;
      this.rearPassengerSideTread = data.rearPassengerSideTread;
      this.rearDriverSideTread = data.rearDriverSideTread;
      this.rentalId = data.rentalId;
      this.typeOfInspection = data.typeOfInspection;
      this.userId = data.userId;
      this.vehicleId = data.vehicleId;
      this.frontPassengerSideBrakeThickness =
        data.frontPassengerSideBrakeThickness;
      this.rearPassengerSideBrakeThickness =
        data.rearPassengerSideBrakeThickness;
      this.frontImageUrl = data.frontImageUrl;
      this.passengerImageUrl = data.passengerImageUrl;
      this.driverSideUrl = data.driverSideUrl;
      this.gaugesUrl = data.gaugesUrl;
      this.rearSideUrl = data.rearSideUrl;
      this.number = data.number;
      this.tasks = data.tasks;
      this.vin = data.vin;
      this.model = data.model;
      this.make = data.make;
      if ( data.year )
      {
        this.year = new Date( data.year );
      }
      this.inspector = data.inspector;
      this.status = data.status;
    }
  }
}

export class User {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  phoneNumber: string = "";
  dob: string = "";
  profileImageUrl: string = "";
  registrationStatus: string = "";
  nickname: string = "";
  addressLine1: string = "";
  addressLine2: string = "";
  zipCode: string = "";
  state: string = "";
  city: string = "";
  dlExpDate: string = "";
  dlIssueDate: string = "";
  dlNumber: string = "";
  dlState: string = "";
  id?: number;

  constructor(data: any) {
    if (data) {
      this.firstName = data.firstName;
      this.id = data.id;
      this.dlIssueDate = data.dlIssueDate;
      this.dlExpDate = data.dlExpDate;
      this.dlNumber = data.dlNumber;
      this.dlState = data.dlState;
      this.lastName = data.lastName;
      this.email = data.email;
      this.phoneNumber = data.phoneNumber;
      this.dob = data.dob;
      this.profileImageUrl = data.profileImageUrl;
      this.registrationStatus = data.registrationStatus;
      this.nickname = data.nickname;
      this.addressLine1 = data.addressLine1;
      this.addressLine2 = data.addressLine2;
      this.zipCode = data.zipCode;
      this.state = data.state;
      this.city = data.city;
    }
  }
}

export class VehicleSwitches {
  id: number = 0;
  status: string = "";
  rentalId: number = 0;
  finalVehicleId: number = 0;
  initialVehicleId: number = 0
  oldVehicleName: string = ""
  newVehicleName: string = ""
  createdAt: string = ""
  constructor(data: any) {
    console.log(data)
    this.id = data.id
    this.status = data.status
    this.rentalId = data.rentalId
    this.finalVehicleId = data.finalVehicleId
    this.initialVehicleId = data.initialVehicleId
    this.oldVehicleName = data.oldVehicleName
    this.newVehicleName = data.newVehicleName
    this.createdAt = data.createdAt
  }
}

export
{
  VehicleStatus,
  RentalStatus,
  UserStatus,
  DROP_DOWN_TYPES,
  InspectionStatus,
  BackgroundChecksStatus,
  InspectionType,
  VehicleExportHeader,
  CustomerExportHeader,
  RentalsExportHeader,
  InspectionExportHeader,
  BackgroundCheckExportHeader,
  EmployeeExportHeader,
  RevenueExportHeader,
  CustomSettingExportHeader,
  BlackoutDateExportHeader,
  PromoCodeExportHeader,
  VehicleExpirationsExportHeader
};
