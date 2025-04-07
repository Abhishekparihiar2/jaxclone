import { Dispatch } from 'react'
import { Action } from 'redux'
import Api from '../../Api'
import { ResponseSuccess, ResponseError, ResponseReset } from '../shared/model';

export const forgetPassword = (email: string) => {
    return async (dispatch: Dispatch<Action>)  => {
        Api.post('/api/v1/users/forgot-password', {
            email,
            userTypes:[2,3]
        }).then((response) => {
            dispatch(new ResponseReset().action())
            // dispatch(sendSuccess(response.data.message))
            dispatch(new ResponseSuccess(response.data.message).action())
        }).catch((error) => {
            // dispatch(sendError(error.response.data.message))
            dispatch(new ResponseError(error.response.data.message).action())
        })
    }
}

export const verifyOTP = (otp: string) => {
    return (dispatch: Dispatch<Action>)  => {
        Api.post('/api/v1/forget-otp/verify', {
            otp,
        }).then((response) => {
            dispatch(new ResponseReset().action())
            // dispatch(sendSuccess(response.data.message))
            dispatch(new ResponseSuccess(response.data.message).action())
        }).catch((error) => {
            // dispatch(sendError(error.response.data.message))
            console.log(error.response.data.message)
            dispatch(new ResponseError(error.response.data.message).action())
        })
    }
}