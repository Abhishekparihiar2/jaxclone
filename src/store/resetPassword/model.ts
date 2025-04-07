export class OTPAdd {
    type: string = 'ADD_OTP';
    payload: string = '';
    constructor(data: any = null) {
        if(data) {
            this.payload = data
        }
    }
    action() {
        return {
            type: this.type,
            payload: this.payload
        }
    }
}