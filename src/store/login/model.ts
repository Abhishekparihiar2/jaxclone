import { UserPermissions } from "../shared/model";

interface LoginPayloadInterface {
  token: string;
  userId: number | null;
  name: string;
  permissions?: UserPermissions;
  profileImageUrl?: string;

}
export class SetLoginAction {
  type: string = "SET_LOGIN";
  payload: LoginPayloadInterface = {
    token: "",
    userId: null,
    name: "",
    permissions: new UserPermissions(null),
    profileImageUrl: ''
  };
  constructor(data: any = null, id: number | null = null, name: string = "", permissions: string = "{}", profileImageUrl: string = '') {
    if (data) {
      this.payload.token = data.authToken;
      this.payload.userId = id;
      this.payload.name = name;
      this.payload.permissions = JSON.parse(permissions);
      this.payload.profileImageUrl = this.payload.profileImageUrl;
    }
  }
  action() {
    return {
      type: this.type,
      payload: this.payload,
    };
  }
}

export class SetToken {
  type: string = "SET_TOKEN";
  constructor() {
    this.type = "SET_TOKEN";
  }
  action() {
    return {
      type: this.type,
    };
  }
}

export class DeleteToken {
  type: string = "DELETE_TOKEN";
  constructor() {
    this.type = "DELETE_TOKEN";
  }
  action() {
    return {
      type: this.type,
    };
  }
}

export class SetUser {
  type: string = "SET_USER";
  payload: LoginPayloadInterface = {
    token: "",
    userId: null,
    name: "",
    permissions: new UserPermissions(null),
    profileImageUrl: ''
  };
  constructor(authToken: string, id: number, name: string, permissions: string = '{}', profileImageUrl: string = '') {
    this.type = "SET_USER";
    if (authToken && id) {
      this.payload.token = authToken;
      this.payload.userId = id;
      this.payload.name = name;
      this.payload.permissions = JSON.parse(permissions); 
      this.payload.profileImageUrl = profileImageUrl;
    }
  }
  action() {
    return {
      type: this.type,
      payload: this.payload,
    };
  }
}
