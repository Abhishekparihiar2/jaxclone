import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Inspections from './pages/inspections/inspections'
import AddInspection from './pages/inspections/add-inspection'
// import logo from './logo.svg';
import './App.css';
import ForgotPassword from './pages/forgot-password/forgot-password';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import Customers from './pages/customers/list';
import CustomerInformation from './pages/customers/details';
import Maintenance from './pages/maintenance/maintenance';
import BackgroundChecks from './pages/background-checks/background-checks';
import ManageEmployee from './pages/manage-employee';
import Incidents from './pages/incidents/incidents';
import VendorManagment from './pages/vendor-managment/vendor-managment';
import Revenue from './pages/revenue/revenue';
import CustomSetting from './pages/custom-setting/custom-setting';
import Vehicles from './pages/vehicles/list';
import AddVehicles from './pages/vehicles/add-vehicles';
import VehiclesDetail from './pages/vehicles/details';
import Rentals from './pages/rentals/list';
import RentalsDetails from './pages/rentals/details';
import Messages from './pages/messages/messages';
import { useSelector } from 'react-redux';
import PrivateRoute from '../src/routes/PrivateRoute'
import Toastr from './shared/components/toastr/toastr';
import { StoreInterface } from './store';
import ResetPassword from './pages/reset-password/reset-password';
import ForgetPasswordOTP from './pages/forgot-password/forger-password-otp';
import { TermsAndConditions } from './shared/components/public/terms-and-condition';
import ViewInspection from './pages/inspections/view-inspection';
import EditVehicles from './pages/vehicles/edit-vehicles';
import TaskListClosed from './pages/inspections/components/task-list-closed';
import TaskListOpen from './pages/inspections/components/task-list-open';
import Tasks from './pages/inspections/tasks';
import CustomerEdit from './pages/customers/details/edit';
import PromoCodes from './pages/promo-code/list/index';
import BlackOutDates from './pages/blackout-dates/list';
import RentalEdit from './pages/rentals/details/components/rental-edit';
import VehicleRegistrations from './pages/vehicles/list/vehicleRegistrations';

function App ()
{
  const token = useSelector( ( state: StoreInterface ) => state.login.token )
  console.log( token )
  return (
    <>
      <Toastr />
      <Router>
        <Routes>
          <Route path='/' element={ <Navigate to='/dashboard' /> } />
          <Route path='/login' element={ token && token !== null ? <Navigate to="/dashboard" /> : <Login /> } />
          <Route path='/background-checks' element={ <PrivateRoute><BackgroundChecks /></PrivateRoute> } />
          <Route path='/customers' element={ <PrivateRoute><Customers /></PrivateRoute> } />
          <Route path='/customer-setting' element={ <PrivateRoute><CustomSetting /></PrivateRoute> } />
          <Route
            path='/add-inspection'
            element={
              <PrivateRoute>
                <AddInspection />
              </PrivateRoute>
            }
          />
          <Route
            path='/view-inspection'
            element={
              <PrivateRoute>
                <ViewInspection />
              </PrivateRoute>
            }
          />
          <Route
            path='/customer-edit/:id'
            element={
              <PrivateRoute>
                <CustomerEdit />
              </PrivateRoute>
            }
          />
          <Route
            path='/promo-codes'
            element={
              <PrivateRoute>
                <PromoCodes />
              </PrivateRoute>
            }
          />
          <Route
            path='/edit-rental/:id'
            element={
              <PrivateRoute>
                <RentalEdit />
              </PrivateRoute>
            }
          />
          <Route
            path='/blackout-dates'
            element={
              <PrivateRoute>
                <BlackOutDates />
              </PrivateRoute>
            }
          />
          <Route
            path='/vehicle-edit/:id'
            element={
              <PrivateRoute>
                <EditVehicles />
              </PrivateRoute>
            }
          />
          <Route
            path='/customer-info/:userId'
            element={
              <PrivateRoute>
                <CustomerInformation />
              </PrivateRoute>
            }
          />

          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path='/dashboard' element={ <Dashboard /> } />
          <Route path='/forgot-password' element={ <ForgotPassword /> } />
          <Route path='/incidents' element={ <Incidents /> } />
          <Route path='/inspections' element={ <PrivateRoute><Inspections /></PrivateRoute> } />
          <Route path='/tasks' element={ <PrivateRoute><Tasks /></PrivateRoute> } />
          <Route path='/tasks/open' element={<PrivateRoute><TaskListOpen /></PrivateRoute>} />
          <Route path='/tasks/closed' element={<PrivateRoute><TaskListClosed /></PrivateRoute>} />
          <Route path='/maintenance' element={ <Maintenance /> } />
          <Route path='/manage-employee' element={ <PrivateRoute><ManageEmployee /></PrivateRoute> } />
          <Route path='/messages' element={ <Messages /> } />
          {/* <Route path='/promocode' element={ <PromoCode /> } /> */}
          <Route path='/revenue' element={<PrivateRoute><Revenue /></PrivateRoute> } />
          <Route path='/verify-otp' element={ <ForgetPasswordOTP /> } />
          <Route path='/reset-password' element={ <ResetPassword /> } />
          <Route path='/add-vehicles' element={ <AddVehicles /> } />
          <Route path='/vehicle-detail/:id' element={ <PrivateRoute><VehiclesDetail /></PrivateRoute> } />
          <Route
            path='/vehicles'
            element={
              <PrivateRoute>
                <Vehicles />
              </PrivateRoute>
            }

          />
          <Route
            path='/rentals'
            element={
              <PrivateRoute>
                <Rentals />
              </PrivateRoute>
            }
          />
          <Route
            path='/vehicle-registrations'
            element={
              <PrivateRoute>
                <VehicleRegistrations />
              </PrivateRoute>
            }
          />
          <Route
            path='/rental-details/:rentalID'
            element={
              <PrivateRoute>
                <RentalsDetails />
              </PrivateRoute>
            }
          />
          <Route path='/vendor-managment' element={ <VendorManagment /> } />

          {/* Public Url */ }
          <Route path='/terms-and-condition' element={ <TermsAndConditions /> } />

        </Routes>
      </Router>
    </>

  );
}

export default App;
