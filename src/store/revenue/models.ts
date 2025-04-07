import { PaymentTransaction } from "../shared/model";

export class RevenueList {
  count: number;
  revenueList: PaymentTransaction[];
  constructor(data: {
    count: number,
    revenueList: PaymentTransaction[]
  } = {
    count: 0,
    revenueList: []
  }) {
    this.count = data.count;
    this.revenueList = data.revenueList;
  }
}