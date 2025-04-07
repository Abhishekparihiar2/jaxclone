import { Dispatch } from 'react'
import { Action } from 'redux'
import Api from '../../Api'
import { ResetPasswordInterface } from './interface';
import { ResponseSuccess, ResponseError } from '../shared/model';

export const passwordUpdateStatusChange = (val: boolean) => {
    return async (dispatch: Dispatch<Action>)  => {
        dispatch(passwordResetSuccess(false))
    }
}


export const resetPassword = (payloads: ResetPasswordInterface) => {
    return async (dispatch: Dispatch<Action>)  => {
        Api.post('/api/v1/users/reset-password', {
            token: payloads.token,
            password: payloads.password
        }).then((response) => {
            // dispatch(sendSuccess(response.data.message))
            dispatch(passwordResetSuccess(true))
            dispatch(new ResponseSuccess(response.data.message).action())
        }).catch((error) => {
            // dispatch(sendError(error.response.data.message))
            dispatch(new ResponseError(error.response.data.message).action())
        })
    }
}


const passwordResetSuccess = (val:boolean): any=> {
    return {
      type: "PASSWORD_RESET_SUCCESS",
      payload: '',
      passwordResetSuccess:val
    };
  };
  