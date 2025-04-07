export type SetLoader = {
  type: string;
  payload: {
    showLoader: boolean;
  };
};

export type LoaderState = {
  showLoader: boolean  
};