import React, { useContext } from "react";
import { useSelector } from "react-redux";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import { StoreInterface } from "../../../store";

const Layout = ( { children }: any ) =>
{
  const {showLoader} = useSelector((state: StoreInterface) => state.loader);
  
  const show = useSelector( ( state: StoreInterface ) => state.hamburger.show )
  return (
    <div className="wrapper">
      <div className={ `dashboard_body ${show ? '' : 'body_collapse'}` }>
        {/* Top Header Bar */}
        <Header />
        {/* Inner Wrapper Start */}
        <div className="inner-wrapper">
          {/* Sidebar Start */}
          <Sidebar />

          {/* Sidebar End */}

          {/* Body Content Start */}
          {children}
          {/* Body Content End */}
        </div>
        {/* Inner Wrapper End */}
      </div>
      {showLoader && <div className="loader-modal show">
          <div className="loader-modal-body">
            <div className="loader4"></div>
          </div>
        </div>}
    </div>
  );
};

export default Layout;
