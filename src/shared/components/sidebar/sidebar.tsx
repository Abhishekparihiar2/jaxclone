import { shallowCopy } from 'immer/dist/internal';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { StoreInterface } from '../../../store';

const Sidebar = () => {
    const location = useLocation();
    const premission = useSelector((state: StoreInterface) => state.login.permissions);
    const [showCustom, setShowCustom] = useState(false);
    return (
            <div className="sidebar-left">
                <div className="nano">
                    <div className="sidebar-profile">
                        <h4>Admin</h4>
                    </div>
                    <nav className="navbar">
                        <ul className="navbar-nav">
                            {(!premission || premission?.access_dashboard) && <li className={"nav-item " + (location?.pathname === '/dashboard' ? 'active' : '')}>
                                <a href="/dashboard" className="nav-link">
                                    <span className="nav_icon">
                                        <img className="icon-image" src="/static/images/nav-dashboard.png" alt=""/>
                                        <img className="icon-active" src="/static/images/nav-dashboard-active.png" alt=""/>
                                    </span>
                                    <span className="name">Dashboard</span>
                                </a>
                            </li>}
                            {(!premission || premission?.access_rentals) && <li className={"nav-item " + (location?.pathname === '/rentals' ? 'active' : '')}>
                                <a href="/rentals" className="nav-link">
                                    <span className="nav_icon">
                                        <img className="icon-image" src="/static/images/nav-customers.png" alt=""/>
                                        <img className="icon-active" src="/static/images/nav-customers-active.png" alt=""/>
                                    </span>
                                    <span className="name">Rentals</span>
                                </a>
                            </li>}
                            {(!premission || premission?.access_vehicles) &&  <li className={"nav-item " + ((location?.pathname === '/vehicle-registrations' || location?.pathname === '/vehicles') ? 'active' : '')}>
                                <a href="/vehicles" className="nav-link">
                                    <span className="nav_icon">
                                        <img className="icon-image" src="/static/images/nav-vehicle.png" alt=""/>
                                        <img className="icon-active" src="/static/images/nav-vehicle-active.png" alt=""/>
                                    </span>
                                    <span className="name">Vehicles</span>
                                </a>
                                {(showCustom || location?.pathname === '/vehicle-registrations' || location?.pathname === '/vehicles') && 
                                <ul>
                                    <li className={"nav-item " + (location?.pathname === '/vehicle-registrations' ? 'active' : '')}>
                                        <a href="/vehicle-registrations">
                                            <span className="nav_icon"></span>
                                            <span className='name'>Vehicle Registrations</span>
                                        </a>
                                    </li>
                                </ul>}
                            </li>}
                            {(!premission || premission?.access_customers) && <li className={"nav-item " + (location?.pathname === '/customers' ? 'active' : '')}>
                                <a href="/customers" className="nav-link">
                                    <span className="nav_icon">
                                        <img className="icon-image" src="/static/images/nav-customers.png" alt=""/>
                                        <img className="icon-active" src="/static/images/nav-customers-active.png" alt=""/>
                                    </span>
                                    <span className="name">Customers</span>
                                </a>
                            </li>}
                            {(!premission || premission?.access_inspections) && <li className={"nav-item " + (location?.pathname === '/inspections' || location?.pathname.startsWith('/tasks') ? 'active' : '')}>
                                <a href="/inspections" className="nav-link">
                                    <span className="nav_icon">
                                        <img className="icon-image" src="/static/images/nav-inspections.png" alt=""/>
                                        <img className="icon-active" src="/static/images/nav-inspections-active.png" alt=""/>
                                    </span>
                                    <span className="name">Inspections</span>
                                </a>
                            </li>}
                            {(!premission || premission?.access_background_checks) && <li className={"nav-item " + (location?.pathname === '/background-checks' ? 'active' : '')}>
                                <a href="/background-checks" className="nav-link">
                                    <span className="nav_icon">
                                        <img className="icon-image" src="/static/images/nav-back-check.png" alt=""/>
                                        <img className="icon-active" src="/static/images/nav-back-check-active.png" alt=""/>
                                    </span>
                                    <span className="name">Background Checks</span>
                                </a>
                            </li>}
                            {(!premission || premission?.access_manage_employee) && <li className={"nav-item " + (location?.pathname === '/manage-employee' ? 'active' : '')}>
                                <a href="/manage-employee" className="nav-link">
                                    <span className="nav_icon">
                                        <img className="icon-image" src="/static/images/nav-manage.png" alt=""/>
                                        <img className="icon-active" src="/static/images/nav-manage-active.png" alt=""/>
                                    </span>
                                    <span className="name">Manage Employee</span>
                                </a>
                            </li>}
                            {(!premission || premission?.access_revenue) && <li className={"nav-item " + (location?.pathname === '/revenue' ? 'active' : '')}>
                                <a href="/revenue" className="nav-link">
                                    <span className="nav_icon">
                                        <img className="icon-image" src="/static/images/nav-revenue.png" alt=""/>
                                        <img className="icon-active" src="/static/images/nav-revenue-active.png" alt=""/>
                                    </span>
                                    <span className="name">Revenue</span>
                                </a>
                            </li>}
                            {(!premission || premission?.access_custom_settings) && <li className={"nav-item " + (location?.pathname === '/customer-setting' ? 'active' : '')}>
                                <a href="/customer-setting" className="nav-link">
                                    <span className="nav_icon">
                                        <img className="icon-image" src="/static/images/nav-setting.png" alt=""/>
                                        <img className="icon-active" src="/static/images/nav-setting-active.png" alt=""/>
                                    </span>
                                    <span className="name">Custom Settings</span>
                                </a>
                                {(showCustom || location?.pathname === '/customer-setting' || location?.pathname === '/blackout-dates' || location?.pathname === '/promo-codes') && 
                                <ul>
                                    <li className={"nav-item " + (location?.pathname === '/customer-setting' ? 'active' : '')}>
                                        <a href="/customer-setting">
                                            <span className="nav_icon"></span>
                                            <span className='name'>Pricing</span>
                                        </a>
                                    </li>
                                    <li className={"nav-item " + (location?.pathname === '/blackout-dates' ? 'active' : '')}>
                                        <a href="/blackout-dates">
                                            <span className="nav_icon"></span>
                                            <span className='name'>Blackout Dates</span>
                                        </a>
                                    </li>
                                    <li className={"nav-item " + (location?.pathname === '/promo-codes' ? 'active' : '')}>
                                        <a href="/promo-codes">
                                            <span className="nav_icon"></span>
                                            <span className='name'>Promo Code</span>
                                        </a>
                                    </li>
                                </ul>}
                            </li>}
                        </ul>
                    </nav>
                </div>
            </div>
              
         
    );
}

export default Sidebar;