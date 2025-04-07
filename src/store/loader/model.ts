interface LoaderInterface {
  showLoader: Boolean;

}

export class Loader {
  type: string = "UPDATE_LOADER";
  payload: LoaderInterface;
  constructor(data: any = null) {
    this.payload = {
      showLoader: data
    };
  }
  action() {
    return {
      type: this.type,
      payload: this.payload,
    };
  }
}
