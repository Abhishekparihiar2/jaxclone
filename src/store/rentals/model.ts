import { numberOfRentalDays } from "../../utils";
import { Inspection, User, Vehicle, VehicleSwitches } from "../../shared/models";
import { PaymentTransaction } from "../shared/model";

export class RentalsPage {
  count: number = 0;
  rentalsList: Rental[] = [];

  constructor(rentalsList: any) {
    if (rentalsList && rentalsList.data?.length) {
      this.count = rentalsList.count;
      this.rentalsList = rentalsList.data?.map(
        (rental: any) => new Rental(rental)
      );
    }
  }
}

export class RentalDetailsPageAction {
  rental?: Rental;
  status?: string;
  returnAt?: Date | null;
  pickupAt?: Date | null;
  slot?: string;
  inspections?: Inspection[] = [];
  paymentList: PaymentTransaction[] = [];
  constructor(rental?: Rental) {
    this.rental = rental;
  }
}

export class RentalDetailsPage {
  rental: Rental;
  inspections?: Inspection[] = [];
  paymentList: PaymentTransaction[] = [];
  constructor(rental: Rental) {
    this.rental = rental;
  }
}

export class Rental {
  rentalNumber: string = "";
  id: number = 0;
  number: number = 0;
  vehicleId: number = 0;
  userId: number = 0;
  fuelLevelIn: number = 0;
  city?: string = "";
  fuelLevelOut: number = 0;
  includedMilage: string = "";
  pickupAt: Date | null | undefined | string = null;
  returnAt: Date | null | undefined | string = null;
  originalStartAt: Date | null | undefined = null;
  originalEndAt: Date | null | undefined= null;
  status: string = "";
  createdAt: Date | null = null;
  updatedAt: Date | null = null;
  firstName: string = "";
  lastName: string = "";
  bookedDate: Date | null | undefined | string = null;
  bookedSlot: string = "";
  pickupLocation: String = "";
  returnLocation: String = "";
  pickUpOdometer: number = 0;
  returnOdometer: number = 0;
  MaintenancePlan: number = 0;
  ProtectionPlan: number = 0;
  InsurancePlan: number = 0;
  Slot: string = "";
  Total: number = 0;
  Surcharge: number = 0;
  Tax: number = 0;
  make: string = "";
  model: string = "";
  year: number = 0;
  registrationDocument: string = "";
  vehicleTypeId: number = 0;
  DayRateNotIncludingAll: number = 0;
  DayRateIncludingAll: number = 0;
  DayRate: number = 0;
  slot: string = "";
  pickupTime: string = "";
  returnTime: string = "";
  userDetails: User = new User(null);
  vehicleDetails: Vehicle = new Vehicle(null);
  vehicleSwitches: VehicleSwitches[] = [];
  numberOfRentalDays: number = 0;
  insuranceUrl: string = "";
  agreementUrl: string = "";
  endDate: string = "";
  endTime: string = "";
  duration?: number;
  formattedPickDate?: string;
  formattedReturnDate?: string;
  inspections?: {
    id?: number;
    odometer?: number;
  } 

  constructor(data: any) {
    if (data) {
      this.rentalNumber = data.rentalNumber;
      this.id = data.id;
      this.duration = data.duration;
      this.number = data.number;
      if(data.vehicleCity) {
        this.city = data.vehicleCity;
      }
      this.vehicleId = data.vehicleId;
      this.userId = data.userId;
      this.fuelLevelIn = data.fuelLevelIn;
      this.fuelLevelOut = data.fuelLevelOut;
      this.includedMilage = data.includedMilage;
      this.pickupAt = data.pickupAt;
      this.returnAt = data.returnAt;
      this.originalStartAt = data.originalStartAt;
      this.originalEndAt = data.originalEndAt;
      this.status = data.status;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.pickupLocation = data.pickupLocation;
      this.returnLocation = data.returnLocation;
      this.MaintenancePlan = data.MaintenancePlan;
      this.ProtectionPlan = data.ProtectionPlan;
      this.InsurancePlan = data.InsurancePlan;
      this.Slot = data.Slot;
      this.Total = data.Total;
      this.Surcharge = data.Surcharge;
      this.Tax = data.Tax;
      this.make = data.make;
      this.model = data.model;
      this.year = data.year;
      this.registrationDocument = data.registrationDocument;
      this.vehicleTypeId = data.vehicleTypeId;
      this.DayRateIncludingAll = data.DayRateIncludingAll;
      this.DayRateNotIncludingAll = data.DayRateNotIncludingAll;
      this.DayRate = data.DayRate;
      this.slot = data.slot;
      this.pickUpOdometer = data.pickUpOdometer;
      this.returnOdometer = data.returnOdometer;
      this.insuranceUrl = data.insuranceUrl;
      this.agreementUrl = data.agreementUrl;
      this.bookedDate = data.bookedDate;
      this.bookedSlot = data.bookedSlot;
      this.pickupTime = data.pickupTime;
      this.endDate = data.endDate;
      this.endTime = data.endTime;
      this.returnTime = data.returnTime;
      this.numberOfRentalDays = numberOfRentalDays(
        data.pickupAt,
        data.returnAt
      );

      this.userDetails = new User(data?.userDetails);
      this.formattedPickDate = data.formattedPickDate;
      this.formattedReturnDate = data.formattedReturnDate;
      this.vehicleDetails = new Vehicle(data?.vehicleDetails);
      if(data.inspections) {
        this.inspections = data.inspections
      }
      if(data.vehicleSwitches) {
        data.vehicleSwitches.forEach((switchData: VehicleSwitches) => {
          this.vehicleSwitches?.push(new VehicleSwitches(switchData));
        })
      }
    }
  }
}