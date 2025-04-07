import React from "react";
import { useDispatch, useSelector} from "react-redux";
import { StoreInterface } from "../../../store";
import { HandleHamburger } from "../../../store/hamburger/modal";
import axios from '../../../Api';
import { DeleteToken } from "../../../store/login/model";
import { useNavigate } from "react-router-dom";
import { ResponseSuccess } from '../../../store/shared/model';

const Header = () => {
  const dispatch = useDispatch()
  const handleHamburger = () => dispatch(new HandleHamburger().action())
  const navigate = useNavigate()
  const userId = useSelector((state: StoreInterface) => state.login.userId)
  const profileImageUrl = useSelector((state: StoreInterface) => state.login.profileImageUrl);
  const handleLogout = async () => {
    try {
      await axios.post(`/api/v1/users/${userId}/logout` , {
        "userTypes":[2,3]
    })
      dispatch(new DeleteToken().action())
      navigate('/login')
      dispatch(new ResponseSuccess('Logged Out!').action())
    } catch(err: any) {
      console.log(err.message)
    }
  }

  return (
    <header className="dash-header">
      <div className="logo-container">
        <span className="head-logo">
          <img src="/static/images/dash-logo.png" alt="" />
        </span>
        <div className="toggle-sidebar-left">
          <span  onClick={handleHamburger}>
            <i className="fa fa-bars" aria-label="Toggle sidebar"></i>
          </span>
        </div>
      </div>
      <div className="sidebar-header">
        <span className="sidebar-toggle"  onClick={handleHamburger}>
          <i className="fa fa-bars" aria-label="Toggle sidebar"></i>
        </span>
      </div>
      <div className="header-right">
        <div className="logout">
          <span title="Logout" onClick={handleLogout}><i className="fa fa-sign-out" aria-hidden="true"></i></span>
        </div>
        <div className="userbox">
          <span>
            <figure className="profile-picture">
              <img
                src={profileImageUrl || "/static/images/profile.png"}
                alt=""
                className="rounded-circle"
              />
            </figure>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
