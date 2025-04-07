export enum PopupMode
{
  "OFF",
  "ADD",
  "EDIT",
  "DELETE",
  "VIEW"
}
export class ManageEmployeesPage {
  count: number = 0;
  usersList: User[] = [];
  user?: User;
  pageSize: number = 10;
  pageNumber: number = 0;
  popupMode: PopupMode = PopupMode.OFF;
  empDeleteId?: number;
  loadingStatus?: boolean;

  constructor(usersList: any) {
    if (usersList && usersList.data?.length) {
      this.count = usersList.count;
      this.usersList = usersList.data?.map((rental: any) => new User(rental));
    }
  }
}

export class ManageEmployeesPageAction {
  user?: User;
  status?: string;
  count?: number = 0;
  usersList?: User[] = [];
  pageSize?: number;
  pageNumber?: number;
  popupMode?: PopupMode;
  empDeleteId?: number;
  loadingStatus?: boolean;

  constructor(usersList: any) {
    if (usersList && usersList.data?.length) {
      this.count = usersList.count;
      this.usersList = usersList.data?.map((rental: any) => new User(rental));
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
  dlno: string = "";
  dlState: string = "";
  status: string = "";
  id?: number;
  driverLicenseDetail?: DrivingLicenseDetails;
  digisureStatus?: string = "";
  createdAt: string = "";
  permissions: string = "";
  employeeNumber?: string = '';
  userDocuments?: any;
  constructor(data: any) {
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
      this.permissions = data.permissions;
      this.employeeNumber = data.employeeNumber;
      this.userDocuments = data.userDocuments;
      if (data.driverLicenseDetail) {
        this.driverLicenseDetail = new DrivingLicenseDetails(
          data.driverLicenseDetail
        );
      }
    }
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
  startDob?: Date;
  endDob?: Date;
  registrationStatus: string = "";
  rentalStatus: string = "";
  minTotalRentalDays: number = 0;
  maxTotalRentalDays: number = 1;
  minTotalRevenue: number = 0;
  maxTotalRevenue: number = 1;

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
    }
  }
}


export class Loading {
  loadingStatus: boolean | null = null;

  constructor(data: any) {
    if (data) {
      this.loadingStatus = data;
    }
  }
}