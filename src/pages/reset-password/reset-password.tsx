import React, { useEffect, useLayoutEffect, useState } from "react";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, passwordUpdateStatusChange } from "../../store/resetPassword/action";
import { RootState } from "../../store";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string | "">("");
  const [confPass, setConfPass] = useState<string | "">("");
  const [errors, setErrors] = useState<
    ({ password: string | null } | { confPassword: string | null })[]
  >([]);
  const [token, setToken] = useState<string | null>();
  const dispatch = useDispatch();
  const success = useSelector(
    (state: RootState) => state.response.successResponse
  );
  const [searchParams] = useSearchParams();

  const otp = useSelector((state: RootState) => state.otp.otp)
  const passwordResetSuccess = useSelector((state: RootState) => state.otp.passwordResetSuccess)

  useLayoutEffect(() => {
    
    const otpFromUrl = searchParams.get( "token" );
    if(otpFromUrl) {
      setToken(otpFromUrl)
    } else
    {
      setToken( otp );
    }
    // eslint-disable-next-line
  }, [] );
  
  useEffect( () =>
  {
    console.log('change detected')
    if ( passwordResetSuccess )
    {
      dispatch( passwordUpdateStatusChange( false ) )          
      navigate( '/login' );
    }
    // eslint-disable-next-line
  }, [passwordResetSuccess]);


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    let oldErrors = errors;
    if (name === "password") {
      setPassword(value);
    }
    if (name === "confPassword") {
      setConfPass(value);
    }
    const updatedErrors = oldErrors.map((error: any) => {
      return name in error ? { [name]: "" } : { ...error };
    });
    setErrors(updatedErrors);
  };

  const validate = () => {
    let valid = true;
    let errorArr = [];
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      errorArr.push({
        password:
          "Password must contain characters, numeric digits, symbol, lowercase and uppercase and must be minimum length of 8!",
      });
      valid = false;
    }
    if (!confPass || confPass.length === 0) {
      errorArr.push({ confPassword: "Please confirm your new password" });
      valid = false;
    }
    if (confPass && confPass.length > 0 && password !== confPass) {
      errorArr.push({
        confPassword: "Confirm password must be same as new password!",
      });
      valid = false;
    }
    if (!valid) {
      setErrors(errorArr);
    }
    return valid;
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const isValid = validate()
    if(isValid) {
        if(token && password){
          await dispatch( resetPassword( { token, password } ) )          
          if(success) {
              navigate("/login");
          }
        }
    }
  }
  return (
    <div className="login-main reset-pass-page">
      <div className="row">
        <div className="col-lg-7">
          <div className="login-left-panel">
            <div className="login-left-center">
              <div className="login-logo">
                <img src="/static/images/login-logo.png" alt="" />
              </div>
              <h3>Sign in to access your admin account</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="login-form-panel">
            <div className="login-form-inner">
              <h1>{ searchParams.get( "token" ) ? "Setup Password"  : "Reset Password" }</h1>
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>New Password:</label>
                  <input
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    type="password"
                    placeholder="●●●●●●●●●●"
                  />
                  <span style={{ color: "red", fontSize: '10px' }}>
                    {errors && Array.isArray(errors)
                      ? errors.map((error: any) => {
                          return error.password;
                        })
                      : ""}
                  </span>
                </div>
                <div className="form-group">
                  <label>Confirm New Password:</label>
                  <input
                    className="form-control"
                    name="confPassword"
                    value={confPass}
                    onChange={handleOnChange}
                    type="password"
                    placeholder="●●●●●●●●●●"
                  />
                  <span style={{ color: "red", fontSize: '10px' }}>
                    {errors && Array.isArray(errors)
                      ? errors.map((error: any) => {
                          return error.confPassword;
                        })
                      : ""}
                  </span>
                </div>
                <div className="login-actions">
                  <button className="btn btn-orange" type="submit">
                    { searchParams.get( "token" ) ? "Submit" : "Reset Password" }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
