export type LoginInterface = {
  email: string;
  password: string;
};

export type LoginDataInterface = {
  name: string;
  token: string;
  userId: number;
  permissions?: any;
  profileImageUrl?: string;
};
export type SetLoginInterface = {
  type: string;
  payload: LoginDataInterface;
};

export type NormalActionWithoutPayloadInterface = {
  type: string;
};

export type UserState = {
  token: string | null;
  userId: number | null;
  name: string | null;
  permissions?: any;
  profileImageUrl?:string;
};
