export class BackgroundCheckList {
  count: number;
  backgroundCheckList: BackgroundChecksData[]
  constructor(data: any) {
    this.count = data.count;
    this.backgroundCheckList = data.backgroundCheckList;
  }
}

export class BackgroundCheckPageState {
  backgroundChecks: BackgroundCheckList = {
    backgroundCheckList: [],
    count: 0
  };
  constructor(data: any) {
    this.backgroundChecks.backgroundCheckList = data.data;
    this.backgroundChecks.count = data.count;
  }
};

export interface BackgroundChecksData {
  id: number;
  dlNumber: string;
  firstName: string;
  lastName: string;
  registeredOn: Date
  status: string;
  state: string;
};