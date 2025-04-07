export class BlackoutDatesPage {
    count: number = 0;
    blackoutDates: BlackoutDates[] = [];
    constructor(data: any) {
      if (data && data.data?.length) {
        this.count = data.count;
        this.blackoutDates = data.data?.map(
          (dates: any) => new BlackoutDates(dates)
        );
      }
    }
  }

export interface BlackoutPagesPaylod  {
    id?: number | null;
    blackoutNewData?: BlackoutDates | null;
    blackoutDates: BlackoutDates[] | [];
    count: number;
}

export class BlackoutDates {
    date?: Date | null = null;
    id?: number | null = null;
    name?: string | null = null;
    constructor(data:any){
        this.date = data.date
        this.id = data.id
        this.name = data.name
    }
}

export class DeleteBlackouts {
    type: string = "DELETE_BLACKOUT";
    payload: {id: number | null} = {
        id: null
    }
    constructor(data: number) {
        this.type = "DELETE_BLACKOUT";
        this.payload = {
            id: data
        }
        return {
            type: this.type,
            payload: this.payload
        }
    }
}

export class AddBlackouts {
    type: string = "ADD_BLACKOUT";
    payload: {
        blackoutNewData: BlackoutDates | null
    } = {
        blackoutNewData: null
    }
    constructor(data: any) {
        this.type = "ADD_BLACKOUT";
        this.payload = {
            blackoutNewData: data
        }
    }
    action() {
        return {
            type: this.type,
            payload: this.payload
        }
    }
}

export class EditBlackouts {
    type: string = "EDIT_BLACKOUT";
    payload: {
        blackoutNewData: BlackoutDates | null
        id: BlackoutDates | null
    } = {
        blackoutNewData: null,
        id: null
    }
    constructor(data: any) {
        this.type = "EDIT_BLACKOUT";
        this.payload = {
            blackoutNewData: data.newDate,
            id: data.id,
        }
    }
    action() {
        return {
            type: this.type,
            payload: this.payload
        }
    }
}