export class CustomSetting {
  VehicleTypeId?: string;
  DayRate?: number;
  MaintenancePlan?: number;
  ProtectionPlan?: number;
  InsurancePlan?: number;
  AdminFee?: number;
  name?: string;
  id?: string;
  constructor(data: any){
    this.VehicleTypeId = data?.VehicleTypeId;
    this.DayRate = data?.DayRate;
    this.MaintenancePlan = data?.MaintenancePlan;
    this.ProtectionPlan = data?.ProtectionPlan;
    this.InsurancePlan = data?.InsurancePlan;
    this.AdminFee = data?.AdminFee;
    this.name = data?.name;
    this.id = data?.id;
  }
}


export class CustomSettingPage {
  count: number;
  customSettings: CustomSetting[];
  constructor(data: {
    count: number,
    customSettings: CustomSetting[];
  } = {
    count: 0,
    customSettings: []
  }) {
    this.count = data.count;
    this.customSettings = data.customSettings;
  }
}