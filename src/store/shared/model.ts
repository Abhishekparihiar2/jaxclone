import { readDateString } from "../../utils";
import moment from "moment";

export class ResponseSuccess {
  type: string = "SUCCESS";
  payload: string = "";
  constructor(data: any = null) {
    if (data) {
      this.payload = data;
    }
  }
  action() {
    return {
      type: this.type,
      payload: this.payload,
    };
  }
}

export class ResponseError {
  type: string = "ERROR";
  payload: string = "";
  constructor(data: any = null) {
    if (data) {
      this.payload = data;
    }
  }
  action() {
    return {
      type: this.type,
      payload: this.payload,
    };
  }
}

export class ResponseReset {
  type: string = "RESPONSE_RESET";
  constructor() {
    this.type = "RESPONSE_RESET";
  }
  action() {
    return {
      type: this.type,
    };
  }
}

export class UserPermissions {
  access_dashboard: boolean;
  access_rentals: boolean;
  access_vehicles: boolean;
  access_customers: boolean;
  access_inspections: boolean;
  access_background_checks: boolean;
  access_manage_employee: boolean;
  access_revenue: boolean;
  access_custom_settings: boolean;
  constructor(data: any) {
    this.access_dashboard = data?.access_dashboard || false;
    this.access_rentals = data?.access_rentals || false;
    this.access_vehicles = data?.access_vehicles || false;
    this.access_customers = data?.access_customers || false;
    this.access_inspections = data?.access_inspections || false;
    this.access_background_checks = data?.access_background_checks || false;
    this.access_manage_employee = data?.access_manage_employee || false;
    this.access_revenue = data?.access_revenue || false;
    this.access_custom_settings = data?.access_custom_settings || false;
  }
}

export class PaymentTransaction {
  id: number = 0;
  rentalId: number = 0;
  cardInfoId: number = 0;
  transactionId: string = "";
  status: string = "";
  receipt: string = "";
  createdAt: string = "";
  updatedAt: string = "";
  refund_id: string = "";
  extendRentalId: number = 0;
  extendRentalTransactionId: string = "";
  extendRentalTransactionStatus: string = "";
  amount: number = 0;
  refundedAmount: number = 0;
  duration: number = 0;
  date?: Date | null = null;
  onTime: number = 1;
  last4?: string = "";
  rentalNumber?: string;
  firstName?: string;
  lastName?: string;
  vehicleNumber?: string;
  make?: string;
  model?: string;
  year?: string;
  pickupAt?: Date;
  returnAt?: Date;

  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.rentalId = data.rentalId;
      this.cardInfoId = data.cardInfoId;
      this.transactionId = data.transactionId;
      this.status = data.status;
      this.receipt = data.receipt;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
      this.refund_id = data.refund_id;
      this.amount = data.amount;
      this.refundedAmount = data.refundedAmount;
      if (data.date) {
        var paymentDate = moment(data.date, "YYYY-MM-DD");
        this.date = paymentDate.toDate();
      }
      this.duration = data.duration;
      this.extendRentalId = data.extendRentalId;
      this.extendRentalTransactionId = data.extendRentalTransactionId;
      this.extendRentalTransactionStatus = data.extendRentalTransactionStatus;
      this.onTime = data.onTime;
      this.last4 = data.last4;
      this.rentalNumber = data.rentalNumber;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.vehicleNumber = data.vehicleNumber;
      this.pickupAt = data.pickupAt;
      this.returnAt = data.returnAt;
      this.make = data.make;
      this.model = data.model;
      this.year = data.year;
    }
  }
}

export class Task {
  id?: number;
  inspectionId?: number;
  vehicleId?: number;
  userId?: number;
  name: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  make?: string;
  model?: string;
  year?: Date;
  closedDate?: Date;
  number?: string;
  constructor(data: any) {
    this.id = data.id;
    this.inspectionId = data.inspectionId;
    this.vehicleId = data.vehicleId;
    this.userId = data.userId;
    this.name = data.name;
    this.status = data.status;
    this.createdAt = data.createdAt;
    this.make = data.make;
    this.model = data.model;
    this.year = data.year;
    this.closedDate = data.closedDate;
    this.updatedAt = data.updatedAt;
    this.number = data.number;
  }
}

export class VehicleInspectionImages {
  inspectionId?: number;
  type: string;
  imageUrl: string;
  createdAt?: Date;
  constructor(data: any) {
    this.inspectionId = data.inspectionId;
    this.type = data.type;
    this.imageUrl = data.imagePath;
  }
}
