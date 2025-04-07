import { Inspection } from "../../shared/models";

export class ViewInspectionPageState {
  inspection: Inspection;
  constructor(data: Inspection) {
    this.inspection = data;
  }
}

export class InspectionList {
  inspectionList: {
    count: number,
    inspections: Inspection[]
  };
  constructor(data: {
    count: number,
    inspections: Inspection[]
  } = {
    count: 0,
    inspections: []
  }) {
    this.inspectionList = data;
  }
}

export const TIRE_TREAD_LIST = [
  "10/32",
  "9/32",
  "8/32",
  "7/32",
  "6/32",
  "5/32",
  "4/32",
];

export const BREAK_THICKNESS_LIST = [
  "12mm",
  "11mm",
  "10mm",
  "9mm",
  "8mm",
  "7mm",
  "6mm",
  "5mm",
  "4mm",
];
