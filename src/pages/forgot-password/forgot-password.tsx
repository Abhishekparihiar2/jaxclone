import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { forgetPassword } from '../../store/forgetPassword/action';
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
   const [email, setEmail] = useState<string | null>(null)
   const [error, setError] = useState<string | null>(null)
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setEmail(value)
      setError(null)
   }
   const validate = () => {
      let status = true;
      let errorString = null;
      if(!email || email.length === 0) {
         errorString = "Please provide email address"
         status = false
      }
      const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(email && !validEmailRegex.test(email)) {
         errorString = "Please provide valid email address"
         status = false
      }
      setError(errorString)
      return status
   }
   const handleSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault()
      const isValid = validate()
      if(isValid) {
         if(email) {
            dispatch(forgetPassword(email))
            navigate("/verify-otp")
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
                     <h3>Sign in to access your admin account</h3>
                  </div>
               </div>
            </div>
            <div className="col-lg-5"> 
               <div className="login-form-panel">
                  <div className="login-form-inner">
                     <h1>Forgot Password</h1>
                     <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                           <label>Email:</label>
                           <input className="form-control" name="email" onChange={handleEmailChange} type="text" placeholder="john1234"/>
                           <span style={{ color: "red", fontSize: '10px' }}>
                              {error  ? error : ""}
                           </span>
                        </div>
                        <div className="login-actions forgot-action">
                            <button className="btn btn-orange w-100" type="submit">Request Reset Link</button>
                            <Link to="/login">Back to Login</Link>                         
                        </div>
                     </form>
                  </div>                  
               </div>
            </div>
          </div>
        </div>
  );
};

export default ForgotPassword;
