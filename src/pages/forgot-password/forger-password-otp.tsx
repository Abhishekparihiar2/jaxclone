import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { verifyOTP } from '../../store/forgetPassword/action';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { ResponseReset } from '../../store/shared/model';
import { OTPAdd } from '../../store/resetPassword/model';

const ForgetPasswordOTP = () => {
    const [otp, setOTP] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const dispatch = useDispatch();
    const success = useSelector((state: RootState) => state.response.successResponse)
    const navigate = useNavigate();
    const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setOTP(value)
        setError(null)
    }

    const validate = () => {
        let status = true;
        let errorString = null;
        if(!otp || otp.length === 0) {
            errorString = "Please provide otp"
            status = false
        }
        if(otp && otp.length !== 6) {
            errorString = "Please provide six digit otp"
            status = false
        }
        setError(errorString)
        return status
    }
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const isValid = validate()
        if(isValid) {
            if(otp) {
                dispatch(verifyOTP(otp))
                if(success) {
                    dispatch(new OTPAdd(otp).action())
                    dispatch(new ResponseReset().action())
                    navigate('/reset-password')
                }
            }
        }
    }
    return (
        <div className="login-main">
         <div className="row">
            <div className="col-lg-7">
               <div className="login-left-panel">
                  <div className="login-left-center">
                     <div className="login-logo">
                        <img src="/static/images/login-logo.png" alt=""/>
                     </div>
                     <h3>Reset OTP</h3>
                  </div>
               </div>
            </div>
            <div className="col-lg-5"> 
               <div className="login-form-panel">
                  <div className="login-form-inner">
                     <h1>Reset OTP</h1>
                     <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                           <label>Enter OTP:</label>
                           <input className="form-control" name="otp" onChange={handleOTPChange} type="text" placeholder="Enter OTP"/>
                           <span style={{ color: "red", fontSize: '10px' }}>
                              {error  ? error : ""}
                           </span>
                        </div>
                        <div className="login-actions forgot-action">
                            <button className="btn btn-orange w-100" type="submit">Send OTP</button>
                            <Link to="/login">Back to Login</Link>                         
                        </div>
                     </form>
                  </div>                  
               </div>
            </div>
         </div>
      </div>
    )
}

export default ForgetPasswordOTP