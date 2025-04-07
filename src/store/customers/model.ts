import { numberOfRentalDays } from "../../utils";
import { UpdateUserDocumentInterface, UpdateUserLicenseDocumentInterface } from './interface';
import moment from "moment";
export class CustomersPage {
  count: number = 0;
  usersList: User[] = [];

  constructor(usersList: any) {
    if (usersList && usersList.data?.length) {
      this.count = usersList.count;
      this.usersList = usersList.data?.map((rental: any) => new User(rental));
    }
  }
}

export class CustomerDetailsPageAction {
  customer?: User;
  status?: string;
  rentals: Rental[] = [];
  rentalsCount: number = 0;
  stats?: CustomerStats;
  frontUrl?: string;
  backUrl?: string;
  documents?: UserDocuments[]
  constructor(customer?: User, frontUrl?: string, backUrl?: string, documents?: any) {
    this.customer = customer;
    if(frontUrl && backUrl) {
      this.frontUrl = frontUrl
      this.backUrl = backUrl
    }
    if(documents) {
      this.documents = documents
    }
  }
}

export class CustomerDetailsPage {
  customer: User;
  rentals: Rental[] = [];
  rentalsCount: number = 0;
  stats?: CustomerStats;
  constructor(customer: User) {
    this.customer = customer;
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
  dlno: string = "";
  dlState: string = "";
  status: string = "";
  id?: number;
  driverLicenseDetail?: DrivingLicenseDetails;
  userDocuments: UserDocuments[] = [];
  backgroundStatus?: string = "";
  digisureStatus?: string = "";
  argyleData?: ArglyAccount[] = [];
  cards?: CardInfo[] = [];
  createdAt: string = "";

  constructor(data: any) {
    console.log(data)
    if (data) {
      this.firstName = data.firstName;
      this.id = data.id;
      this.dlIssueDate = data.dlIssueDate;
      this.dlExpDate = data.dlExpDate;
      this.dlno = data.dlno;
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
      this.status = data.status;
      this.createdAt = data.createdAt;
      this.digisureStatus = data.digisureStatus;
      if (data.driverLicenseDetail) {
        this.driverLicenseDetail = new DrivingLicenseDetails(
          data.driverLicenseDetail
        );
      }
      if (data.background) {
        this.backgroundStatus = data.background.status;
      }
      if (data.argyleData && data.argyleData.length) {
        this.argyleData = data.argyleData.map((argyle: any) => {
          return new ArglyAccount(argyle);
        });
      }
      if (data.cards) {
        this.cards = data.cards.map((card: any) => new CardInfo(card));
      }
      if(data.userDocuments) {
        this.userDocuments = data.userDocuments.map((document: any) => new UserDocuments(document))
      }
    }
  }
}

export class CustomerStats {
  totalRentalDays?: number;
  totalRevenue?: number;
  onTimePercentage?: string;

  constructor(data: any) {
    this.totalRentalDays = data.totalRentalDays;
    this.totalRevenue = data.totalRevenue;
    this.onTimePercentage = data.onTimePercentage;
  }
}

export class CardInfo {
  cardType?: string = "Visa";
  last4?: string;
  name?: string;

  constructor(data: any) {
    if (data.cardType) {
      this.cardType = data.cardType;
    }
    this.last4 = data.last4;
    this.name = data.cardHolderName;
  }
}

export class ArglyAccount {
  id?: number;
  userId?: string;
  accountId?: string;
  linkItemId?: string;

  constructor(data: any) {
    this.id = data.id;
    const accountData = JSON.parse(data.argyleResponse);
    this.userId = accountData.userId;
    this.accountId = accountData.accountId;
    this.linkItemId = accountData.linkItemId;
  }
}

export class DrivingLicenseDetails {
  id?: number;
  state?: string = "";
  issueDate?: Date;
  expDate?: Date;
  number?: string;
  backImageUrl?: string;
  frontImageUrl?: string;

  constructor(data: any) {
    this.id = data.id;
    this.state = data.state;
    this.issueDate = data.issueDate;
    this.expDate = data.expDate;
    this.number = data.number;
    this.backImageUrl = data.backImageUrl;
    this.frontImageUrl = data.frontImageUrl;
  }
}

export class UserDocuments {
  id: number;
  url: string = "";
  name: string = "";
  constructor(data: any) {
    this.id = data.id;
    this.url = data.url;
    this.name = data.name;
  }
}

export class UserFilters {
  firstName: string = "";
  lastName: string = "";
  nickname: string = "";
  email: string = "";
  phoneNumber: string = "";
  city: string = "";
  state: string = "";
  dlno: string = "";
  digiSureStatus: string = "";
  startDob?: string = "";
  endDob?: string = "";
  registrationStatus: string = "";
  rentalStatus: string = "";
  minTotalRentalDays: number = 0;
  maxTotalRentalDays: number = 1;
  minTotalRevenue: number = 0;
  maxTotalRevenue: number = 1;
  last4: number | null = null;
  sortBy?: string;
  sortType?: string;
  userType?: number = 1;

  constructor(data: any) {
    if (data) {
      this.firstName = data.firstName;
      this.minTotalRentalDays = data.minTotalRentalDays;
      this.maxTotalRentalDays = data.maxTotalRentalDays;
      this.minTotalRevenue = data.minTotalRevenue;
      this.maxTotalRevenue = data.maxTotalRevenue;
      this.dlno = data.dlno;
      this.lastName = data.lastName;
      this.email = data.email;
      this.phoneNumber = data.phoneNumber;
      this.startDob = data.startDob;
      this.endDob = data.endDob;
      this.registrationStatus = data.registrationStatus;
      this.nickname = data.nickname;
      this.rentalStatus = data.rentalStatus;
      this.state = data.state;
      this.city = data.city;
      this.digiSureStatus = data.digiSureStatus;
      this.last4 = data.last4;
      this.userType = 1;
    }
  }
}
export class PaymentTransaction {
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
  duration: number = 0;
  date?: Date | null = null;
  onTime: number = 1;
  last4?: string = "";

  constructor(data: any) {
    if (data) {
      this.rentalId = data.rentalId;
      this.cardInfoId = data.cardInfoId;
      this.transactionId = data.transactionId;
      this.status = data.status;
      this.receipt = data.receipt;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
      this.refund_id = data.refund_id;
      this.amount = data.amount;
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
    }
  }
}

export class Rental {
  rentalNumber: string = "";
  id: number = 0;
  number: number = 0;
  vehicleId: number = 0;
  userId: number = 0;
  fuelLevelIn: number = 0;
  fuelLevelOut: number = 0;
  includedMilage: string = "";
  pickupAt: Date | null = null;
  returnAt: Date | null = null;
  returnFormattedAt: string | null = null;
  pickupFormattedAt: string | null = null;
  pickupTime: string | null = null;
  returnTime: string | null = null;
  status: string = "";
  createdAt: Date | null = null;
  updatedAt: Date | null = null;
  firstName: string = "";
  lastName: string = "";
  pickupLocation: String = "";
  returnLocation: String = "";
  pickUpOdometer: number = 0;
  returnOdometer: number = 0;
  MaintenancePlan: number = 0;
  ProtectionPlan: number = 0;
  InsurancePlan: number = 0;
  Slot: String = "";
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
  userDetails: User = new User(null);
  numberOfRentalDays: number = 0;
  insuranceUrl: string = "";
  agreementUrl: string = "";
  city: string | null = null;

  constructor(data: any) {
    if (data) {
      this.rentalNumber = data.rentalNumber;
      this.id = data.id;
      this.number = data.number;
      this.vehicleId = data.vehicleId;
      this.userId = data.userId;
      this.fuelLevelIn = data.fuelLevelIn;
      this.fuelLevelOut = data.fuelLevelOut;
      this.includedMilage = data.includedMilage;
      if (data.pickupAt) {
        var pickupAtDate = moment(data.pickupAt, "YYYY-MM-DD");
        this.pickupAt = pickupAtDate.toDate();
      }
      if (data.returnAt) {
        var returnAtDate = moment(data.returnAt, "YYYY-MM-DD");
        this.returnAt = returnAtDate.toDate();
      }
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
      this.city = data.city;
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
      this.pickupFormattedAt = data.pickupFormattedAt;
      this.returnFormattedAt = data.returnFormattedAt;
      this.pickupTime = data.pickupTime;
      this.returnTime = data.returnTime;
      this.numberOfRentalDays = numberOfRentalDays(
        data.pickupAt,
        data.returnAt
      );

      this.userDetails = new User(data?.userDetails);
    }
  }
}


export class UpdateUserDocuments {
  type: string = "UPDATE_USER_LICENSE_DOCUMENT";
  payload: UpdateUserLicenseDocumentInterface = {
      customer: null,
      frontUrl: null,
      backUrl: null
  }
  constructor (data: any, customer: User | undefined) {
      this.type = "UPDATE_USER_LICENSE_DOCUMENT"
      if(data && customer) {
          this.payload.customer = customer
          this.payload.frontUrl = data.frontImageUrl
          this.payload.backUrl = data.backImageUrl
      }
  }
  action() {
      return {
          type: this.type,
          payload: this.payload
      }
  }
}

export class UpdateCustomerDocuments {
  type: string = "UPDATE_USER_DOCUMENT";
  payload: UpdateUserDocumentInterface = {
      customer: null,
      documents: null
  }
  constructor (data: any, customer: User | undefined) {
    this.type = "UPDATE_USER_DOCUMENT"
    if(data && customer) {
        this.payload.customer = customer
        this.payload.documents = data
    }
  }
  action() {
    return {
        type: this.type,
        payload: this.payload
    }
  } 
}

export class AddCustomerDocuments {
  type: string = "ADD_USER_DOCUMENT";
  payload: UpdateUserDocumentInterface = {
      customer: null,
      documents: null
  }
  constructor (data: any, customer: User | undefined) {
    this.type = "ADD_USER_DOCUMENT"
    if(data && customer) {
        this.payload.customer = customer
        this.payload.documents = data
    }
  }
  action() {
    return {
        type: this.type,
        payload: this.payload
    }
  } 
}