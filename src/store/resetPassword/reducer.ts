import { OTPInterface, OTPType } from "./interface"
 
const initialState = {
    otp: "",
    passwordResetSuccess:false
}

export const otp = (state: OTPInterface = initialState, action: OTPType) => {
    switch(action.type) {
        case 'ADD_OTP':
            return {
                ...state,
                otp: action.payload
            }
        case 'PASSWORD_RESET_SUCCESS':
            return {
                ...state,
                passwordResetSuccess: action.passwordResetSuccess ? true : false
            }
        default:
            return state
    }
}