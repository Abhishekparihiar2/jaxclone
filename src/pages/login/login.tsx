import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { doLogin } from '../../store/login/action';


const Login = () => {
    const [email, setEmail] = useState<string| null>()
    const [password, setPassword] = useState<string| null>()
    const [errors, setErrors] = useState<any>([])
    const dispatch = useDispatch()
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value)
      const updatedErrors = errors.map((error: any) => {
         return {
             ...error,
             email: ""
         }
      })
      setErrors(updatedErrors)
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPassword(value)
      const updatedErrors = errors.map((error: any) => {
         return {
             ...error,
             password: ""
         }
      })
      setErrors(updatedErrors)
    }
    const validate = () => {
      let status = true;
      let errorsObject = [];
      if(!email || email.length === 0) {
         errorsObject.push({email: "Please provide email address" })
         status = false
      }
      const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(email && !validEmailRegex.test(email)) {
         errorsObject.push({email: "Please provide valid email address" })
         status = false
      }
      if(!password || password.length === 0) {
         errorsObject.push({password: "Please enter the password"  })
         status = false
      }
      setErrors(errorsObject)
      return status
    }
    const handleSubmit = (e: React.SyntheticEvent) => {
      e.preventDefault();
      const isValid = validate()
      if(isValid) {
         if(email && password) {
            dispatch(doLogin({email, password}))
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
                     <h1>Sign In</h1>
                     <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                           <label>Email:</label>
                           <input className="form-control" name="email" onChange={handleEmailChange} type="text" placeholder="john1234"/>
                           <span style={{ color: "red", fontSize: '10px' }}>
                              {errors && Array.isArray(errors) ? errors.map((error) => error.email) : ""}
                           </span>
                        </div>
                        <div className="form-group">
                           <label>Password:</label>
                           <input className="form-control" name="password" onChange={handlePasswordChange} type="password" placeholder="●●●●●●●●●●"/>
                           <span style={{ color: "red", fontSize: '10px' }}>
                              {errors && Array.isArray(errors) ? errors.map((error) => error.password) : ""}
                           </span>
                        </div>
                        <div className="login-actions">
                           <Link to="/forgot-password">Forgot Password?</Link>
                           <button className="btn btn-orange" type="submit">Sign In</button>
                        </div>
                     </form>
                  </div>                  
               </div>
            </div>
         </div>
      </div>
        
       
    );
}

export default Login;