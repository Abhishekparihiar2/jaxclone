export class DropdownValuesState {
  dropdownValues: DropdownValue[] = [];

  constructor(dropdownValuesList: any) {
    if (dropdownValuesList?.length) {
      this.dropdownValues = dropdownValuesList.map(
        (item: any) => new DropdownValue(item)
      );
    }
  }
}

export class DropdownValuesStateAction {
  dropdownValues: DropdownValue[] = [];
  dropdownValue?: DropdownValue;

  constructor(dropdownValuesList: any) {
    if (dropdownValuesList?.length) {
      this.dropdownValues = dropdownValuesList.map(
        (item: any) => new DropdownValue(item)
      );
    }
  }
}

export class DropdownValue {
  id?: number;
  type: string = "";
  title: string = "";

  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.title = data.title;
      this.type = data.type;
    }
  }
}
