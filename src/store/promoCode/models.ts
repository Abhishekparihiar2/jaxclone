export class PromoCodePage {
    count: number = 0;
    promoList: PromoCode[] = [];
    constructor(promoList: any) {
      if (promoList && promoList.data?.length) {
        this.count = promoList.count;
        this.promoList = promoList.data?.map(
          (code: any) => new PromoCode(code)
        );
      }
    }
  }

 export class PromoCode {
    id: number | null = null;
    codeName: string | null = null;
    startDate: null | Date = null;
    expirationDate: null | Date = null;
    codeType: null | string = null;
    offer: null | string = null;
    extension: number | null = null;
    useType: null | string = null;
    vehicleType: null | number = null;
    rentalTerm: null | number = null;
    firstTimeRenter: undefined | boolean = undefined;
    totalCount: null | number = null;
    remainingUse: null | number = null;
    isActive: null | number = null;
    name: null | string = null;
    constructor(data: any) {
        if(data) {
            this.id = data.id;
            this.codeName = data.codeName;
            this.startDate = data.startDate;
            this.expirationDate = data.expirationDate;
            this.codeType = data.codeType;
            this.offer = data.offer;
            this.extension = data.extension;
            this.useType = data.useType;
            this.vehicleType = data.vehicleTypeId;
            this.rentalTerm = data.rentalTerm;
            this.firstTimeRenter = data.firstTimeRenter;
            this.totalCount = data.totalCount;
            this.remainingUse = data.remainingUse;
            this.isActive = data.isActive;
            this.name = data.name;
        }
    }
 } 

 export class PromoCodeDetailsPage {
    promoCode: PromoCode;
    constructor(promoCode: PromoCode) {
      this.promoCode = promoCode;
    }
}

export class PromoCodeDetailsPageAction {
    promoCode?: PromoCode;
    constructor(promoCode?: PromoCode) {
      this.promoCode = promoCode;
    }
  }