export interface ResetPasswordInterface {
    password: string,
    token: string
}

export type OTPInterface = {
    otp: string,
    passwordResetSuccess:boolean
}

export type OTPType = {
    type: string | null,
    payload: string,
    passwordResetSuccess?:boolean
}