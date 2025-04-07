import { LoginInterface } from "./interface";
import { Dispatch } from "react";
import { Action, AnyAction } from "redux";
import Api from "../../Api";
import { DeleteToken, SetLoginAction, SetUser } from "./model";
import { ResponseSuccess, ResponseError } from "../shared/model";

export const doLogin = (payloads: LoginInterface) => {
  return async (dispatch: Dispatch<Action>) => {
    Api.post("/api/v1/users/login", {
      email: payloads.email,
      password: payloads.password,
      userTypes:[2,3]
    })
      .then((response) => {
        // dispatch(setLogin(response.data.data.auth.authToken))
        dispatch(
          new SetLoginAction(
            response.data.data.auth,
            response.data.data.userData.id,
            `${response.data.data.userData.firstName} ${response.data.data.userData.lastName}`,
            response.data.data.userData.permissions,
            response.data.data.userData.profileImageUrl
          ).action()
        );
        // dispatch(sendSuccess("Successfully loggedin!"))
        dispatch(new ResponseSuccess("Sign In Successful").action());
      })
      .catch((error) => {
        console.log(error);
        dispatch(new ResponseError(error.response.data.message).action());
      });
  };
};

export const fetchUser = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    Api.get("/api/v1/users/confirm/admin")
      .then((response) => {
        const token = localStorage.getItem("token");
        dispatch(
          new SetUser(
            token || "",
            response.data.data.userData.id,
            `${response.data.data.userData.firstName} ${response.data.data.userData.lastName}`,
            response.data.data.userData.permissions,
            response.data.data.userData.profileImageUrl
          ).action()
        );
      })
      .catch((error) => {
        dispatch(new DeleteToken().action());
      });
  };
};
