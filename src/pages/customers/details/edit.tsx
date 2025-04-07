import React, { useEffect, useState } from 'react'
import { openCalender, formatDate, formatPhoneNumber } from '../../../utils/index';
import DatePicker, { ReactDatePicker } from "react-datepicker";
import Layout from '../../../shared/components/layout/layout';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerDetails, updateCustomerDetails } from '../../../store/customers/action';
import { useParams } from 'react-router-dom';
import { CustomerDetailsPage } from '../../../store/customers/model';
import { StoreInterface } from '../../../store';
import CustomDropdown from '../../../shared/components/custom-dropdown/custom-dropdown';
import { BackgroundChecksStatus, DROP_DOWN_TYPES } from '../../../shared/models';
import { useLayoutEffect } from 'react';
import { fetchDropdownValues } from '../../../store/dropdownValues/action';
import { ResponseError } from '../../../store/shared/model';
import { useNavigate } from 'react-router-dom';

interface FormInterface
{
  firstName: string;
  lastName: string;
  nickname: string;
  dob: Date | null;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  zipCode: string;
  drivingLicenseNumber?: string;
  drivingLicenseState?: string;
  issueDate: Date | null;
  expDate: Date | null;
  id?: number;
}
const CustomerEdit = () => {
  const initialForm = {
    firstName: "",
    lastName: "",
    nickname: "",
    dob: null,
    addressLine1: "",
    addressLine2: null,
    city: "",
    state: "",
    zipCode: "",
    drivingLicenseNumber: "",
    drivingLicenseState: "",
    issueDate: null,
    expDate: null
  }
    const { id: userId } = useParams();
    const dobCalRef = useRef<ReactDatePicker<never, undefined> | null>(null);
    const issueDateCalRef = useRef<ReactDatePicker<never, undefined> | null>(null);
    const expDateCalRef = useRef<ReactDatePicker<never, undefined> | null>(null);
    const [ errors, setErrors ] = useState<any>( [] );
    const [form, setForm] = useState<FormInterface>(initialForm)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const pageInfo: CustomerDetailsPage = useSelector(
      (state: StoreInterface) => state.customerDetailsPage
    );

    useLayoutEffect(() => {
      dispatch( fetchDropdownValues( [
        DROP_DOWN_TYPES.STATE.toString(),
      ] ) );
      // eslint-disable-next-line
    }, [])

    useEffect(() => {
      if(pageInfo.customer) {
        setForm((preForm: FormInterface) => {
          return {
            ...preForm,
            firstName: pageInfo.customer.firstName,
            id: pageInfo.customer.id,
            lastName: pageInfo.customer.lastName,
            nickname: pageInfo.customer.nickname,
            dob: pageInfo.customer.dob ? new Date(pageInfo.customer.dob) : null,
            addressLine1: pageInfo.customer.addressLine1,
            addressLine2: pageInfo.customer.addressLine2,
            city: pageInfo.customer.city,
            state: pageInfo.customer.state,
            zipCode: pageInfo.customer.zipCode,
            drivingLicenseNumber: pageInfo.customer.driverLicenseDetail?.number,
            drivingLicenseState: pageInfo.customer.driverLicenseDetail?.state,
            issueDate: pageInfo.customer.driverLicenseDetail?.issueDate ? new Date(pageInfo.customer.driverLicenseDetail?.issueDate) : null,
            expDate: pageInfo.customer.driverLicenseDetail?.expDate ? new Date(pageInfo.customer.driverLicenseDetail?.expDate) : null
          }
        })
      }
    }, [pageInfo.customer])
    
    useEffect(() => {
      dispatch(fetchCustomerDetails(userId));
      // eslint-disable-next-line
    }, []);

    const validate = () => {
      let valid = true;
      let errorArr = [];
      if ( !form.firstName )
      {
        errorArr.push( {
          firstName: "Please provide first name!",
        } );
        valid = false;
      }
      if ( !form.lastName )
      {
        errorArr.push( {
          lastName: "Please provide last name!",
        } );
        valid = false;
      }
      if ( !form.dob )
      {
        errorArr.push( {
          dob: "Please provide date of birth!",
        } );
        valid = false;
      }

      if ( !form.addressLine1 )
      {
        errorArr.push( {
          addressLine1: "Please provide address!",
        } );
        valid = false;
      }

      if ( !form.city )
      {
        errorArr.push( {
          city: "Please provide city!",
        } );
        valid = false;
      }

      if ( !form.state )
      {
        errorArr.push( {
          state: "Please provide state!",
        } );
        valid = false;
      }

      if ( !form.zipCode )
      {
        errorArr.push( {
          zipCode: "Please provide zip code!",
        } );
        valid = false;
      }
      if ( !form.drivingLicenseNumber )
      {
        errorArr.push( {
          drivingLicenseNumber: "Please provide driving license number!",
        } );
        valid = false;
      }

      if ( !valid )
      {
        setErrors( errorArr );
        window.scrollTo( 0, 0 );
        dispatch(
          new ResponseError( "Please provide all necessary details." ).action()
        );
      }
      return valid;
    };

    const handleSubmit = (e: any) => {
      e.preventDefault()
      const validData: boolean = validate();
      if(validData) {
        const updateFormData: any = form
        if(form.dob) { 
          updateFormData.dob = formatDate(form.dob)
        }
        if(form.issueDate) { 
          updateFormData.issueDate = formatDate(form.issueDate)
        }
        if(form.expDate) { 
          updateFormData.expDate = formatDate(form.expDate)
        }
        dispatch(updateCustomerDetails(userId, updateFormData))
        navigate( `/customer-info/${ userId }` )
      }
    }

    const resetError = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) =>
    {
      const name = e.target.name;
      let oldErrors = errors;
      const updatedErrors = oldErrors.map( ( error: any ) =>
      {
        return name in error ? { [ name ]: "" } : { ...error };
      } );
      setErrors( updatedErrors );
    };

    const handleForm = (e: any) => {
      setForm((prevForm) => ({...prevForm, [e.target.name]: e.target.value}))
    }

    const resetDropdownError = ( name: string ) =>
    {
      let oldErrors = errors;
      const updatedErrors = oldErrors.map( ( error: any ) =>
      {
        return name in error ? { [ name ]: "" } : { ...error };
      } );
      setErrors( updatedErrors );
    };

    const handleDateForm = (type: any, value: any) => {
      setForm( {
        ...form,
        [ type ]: value,
      } );
    }

    const handleDropdownForm = ( name: string, value: string ) =>
    {
      setForm( {
        ...form,
        [ name ]: value,
      } );
    };

    const resetDateFieldError = ( name: string ) =>
    {
      let oldErrors = errors;
      const updatedErrors = oldErrors.map( ( error: any ) =>
      {
        return name in error ? { [ name ]: "" } : { ...error };
      } );
      setErrors( updatedErrors );
    };
    var maxDOB = new Date();
    maxDOB.setFullYear(maxDOB.getFullYear() - 23)
    return (
        <>
        <Layout>
          <section className="content-body">
            <header className="page-header">
              <div className="page_title">
                <h2>Customer</h2>
              </div>
            </header>
            <div className="page_content">
              <div className="white-box">
                <section className="card mb20 border-none">
                  <div className="card-body p-0">
                    <div className="table-head table-single-heading">
                      <h3 className="mb-0">Edit Information</h3>
                      <div className="head-page-action">
                      </div>
                    </div>
                    <div className="tabs-column">
                      <div className="tab-content">
                        <div
                          className={
                            "tab-pane active" 
                          }
                          id="vehicledetail"
                          role="tabpanel"
                          aria-labelledby="vehicle-detail-tab"
                        >
                          <form onSubmit={ (e) => handleSubmit(e) }>
                            <div className="vehicle-detail-form">
                              <div className="row">
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                      type="text"
                                      name="firstName"
                                      className="form-control placeholder-dark"
                                      placeholder="First Name"
                                      value={form.firstName}
                                      onChange={ ( e ) =>
                                      {
                                        resetError( e );
                                        handleForm( e );
                                      } }
                                    />
                                    <span style={ { color: "red", fontSize: '10px' } }>
                                      { errors && Array.isArray( errors )
                                        ? errors.map( ( error: any ) =>
                                        {
                                          return error.firstName;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                      type="text"
                                      name="lastName"
                                      className="form-control placeholder-dark"
                                      placeholder="Last Name"
                                      value={form.lastName}
                                      onChange={ ( e ) =>
                                      {
                                        resetError( e );
                                        handleForm( e );
                                      } }
                                    />
                                    <span style={ { color: "red", fontSize: '10px' } }>
                                      { errors && Array.isArray( errors )
                                        ? errors.map( ( error: any ) =>
                                        {
                                          return error.lastName;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Email</label>
                                    <input
                                      type="text"
                                      className="form-control placeholder-dark"
                                      placeholder="Email"
                                      name="email"
                                      value={pageInfo.customer.email}
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                      type="text"
                                      name="phoneNumber"
                                      className="form-control placeholder-dark"
                                      placeholder="Phone Number"
                                      value={formatPhoneNumber( pageInfo.customer.phoneNumber ) || ""}
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Nick Name</label>
                                    <input
                                      type="text"
                                      name="nickname"
                                      className="form-control placeholder-dark"
                                      placeholder="Nick Name"
                                      value={form.nickname}
                                      onChange={ ( e ) =>
                                      {
                                        resetError( e );
                                        handleForm( e );
                                      } }
                                    />
                                    <span style={ { color: "red", fontSize: '10px' } }>
                                      { errors && Array.isArray( errors )
                                        ? errors.map( ( error: any ) =>
                                        {
                                          return error.nickname;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                  <label className="date-label date-new-label">Date of birth
                                  </label>
                                  <div className="calendar-input">
                                      <DatePicker
                                        ref={(c) => dobCalRef.current = c}
                                        dateFormat="MM/dd/yyyy"
                                        className="form-control placeholder-dark"
                                        selected={
                                          form?.dob ? form.dob : null
                                        }
                                        onChange={ ( date: Date ) =>
                                        {
                                          resetDateFieldError( "dob" );
                                          handleDateForm( "dob", date );
                                        } }
                                        showYearDropdown
                                        showMonthDropdown
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={ 100 }
                                        useShortMonthInDropdown
                                        maxDate={maxDOB}
                                      />
                                      <span style={ { color: "red", fontSize: '10px' } }>
                                        { errors && Array.isArray( errors )
                                          ? errors.map( ( error: any ) =>
                                          {
                                            return error.buyDate;
                                          } )
                                          : "" }
                                      </span>
                                      <span className="btn calendar-btn"  onClick={()=>openCalender(dobCalRef)}>
                                        <i
                                          className="fa fa-calendar"
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                  </div>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Customer Number</label>
                                    <input
                                      type="text"
                                      name="nickname"
                                      className="form-control placeholder-dark"
                                      placeholder="ATL 12345"
                                      value={form.id}
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Address Line 1</label>
                                    <input
                                      type="text"
                                      name="addressLine1"
                                      className="form-control placeholder-dark"
                                      placeholder="Address Line 1"
                                      value={form.addressLine1}
                                      onChange={ ( e ) =>
                                      {
                                        resetError( e );
                                        handleForm( e );
                                      } }
                                    />
                                    <span style={ { color: "red", fontSize: '10px' } }>
                                      { errors && Array.isArray( errors )
                                        ? errors.map( ( error: any ) =>
                                        {
                                          return error.addressLine1;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Address Line 2</label>
                                    <input
                                      type="text"
                                      name="addressLine2"
                                      className="form-control placeholder-dark"
                                      placeholder="Address Line 2"
                                      value={form.addressLine2 || undefined}
                                      onChange={ ( e ) =>
                                      {
                                        resetError( e );
                                        handleForm( e );
                                      } }
                                    />
                                    <span style={ { color: "red", fontSize: '10px' } }>
                                      { errors && Array.isArray( errors )
                                        ? errors.map( ( error: any ) =>
                                        {
                                          return error.addressLine2;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>City</label>
                                    <input
                                      type="text"
                                      name="city"
                                      className="form-control placeholder-dark"
                                      placeholder="City"
                                      value={form.city}
                                      onChange={ ( e ) =>
                                      {
                                        resetError( e );
                                        handleForm( e );
                                      } }
                                    />
                                    <span style={ { color: "red", fontSize: '10px' } }>
                                      { errors && Array.isArray( errors )
                                        ? errors.map( ( error: any ) =>
                                        {
                                          return error.city;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>State</label>
                                    <CustomDropdown
                                      type={ DROP_DOWN_TYPES.STATE.toString() }
                                      name={ "state" }
                                      allowEdit={ false }
                                      value={ form?.state ? form.state : "" }
                                      placeholder={ "Choose a state..." }
                                      onChange={ ( name, value ) =>
                                      {
                                        resetDropdownError( "state" );
                                        handleDropdownForm(
                                          name,
                                          value
                                        );
                                      } }
                                    />
                                    <span style={ { color: "red", fontSize: '10px' } }>
                                      { errors && Array.isArray( errors )
                                        ? errors.map( ( error: any ) =>
                                        {
                                          return error.state;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Zip Code</label>
                                    <input
                                      type="text"
                                      name="zipCode"
                                      className="form-control placeholder-dark"
                                      placeholder="Zip code"
                                      value={form.zipCode}
                                      onChange={ ( e ) =>
                                      {
                                        resetError( e );
                                        handleForm( e );
                                      } }
                                    />
                                    <span style={ { color: "red", fontSize: '10px' } }>
                                      { errors && Array.isArray( errors )
                                        ? errors.map( ( error: any ) =>
                                        {
                                          return error.zipCode;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Driver License Number</label>
                                    <input
                                      type="text"
                                      name="drivingLicenseNumber"
                                      className="form-control placeholder-dark"
                                      placeholder="DL Number"
                                      value={form.drivingLicenseNumber}
                                      onChange={ ( e ) =>
                                      {
                                        resetError( e );
                                        handleForm( e );
                                      } }
                                    />
                                    <span style={ { color: "red", fontSize: '10px' } }>
                                      { errors && Array.isArray( errors )
                                        ? errors.map( ( error: any ) =>
                                        {
                                          return error.drivingLicenseNumber;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Issuing State</label>
                                    <input
                                      type="text"
                                      name="drivingLicenseState"
                                      className="form-control placeholder-dark"
                                      placeholder="DL Issuing Date"
                                      value={form.drivingLicenseState}
                                      onChange={ ( e ) =>
                                      {
                                        resetError( e );
                                        handleForm( e );
                                      } }
                                    />
                                    <span style={ { color: "red", fontSize: '10px' } }>
                                      { errors && Array.isArray( errors )
                                        ? errors.map( ( error: any ) =>
                                        {
                                          return error.drivingLicenseState;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                  <label className="date-label date-new-label">Issue Date
                                  </label>
                                  <div className="calendar-input">
                                      <DatePicker
                                        ref={(c) => issueDateCalRef.current = c}
                                        dateFormat="MM/dd/yyyy"
                                        className="form-control placeholder-dark"
                                        selected={
                                          form?.issueDate ? form.issueDate : null
                                        }
                                        onChange={ ( date: Date ) =>
                                        {
                                          resetDateFieldError( "issueDate" );
                                          handleDateForm( "issueDate", date );
                                        } }
                                        showYearDropdown
                                        showMonthDropdown
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={ 100 }
                                        useShortMonthInDropdown
                                        maxDate={new Date()}
                                      />
                                      <span style={ { color: "red", fontSize: '10px' } }>
                                        { errors && Array.isArray( errors )
                                          ? errors.map( ( error: any ) =>
                                          {
                                            return error.issueDate;
                                          } )
                                          : "" }
                                      </span>
                                      <span className="btn calendar-btn"  onClick={()=>openCalender(issueDateCalRef)}>
                                        <i
                                          className="fa fa-calendar"
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                  </div>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                  <label className="date-label date-new-label">Expiration Date
                                  </label>
                                  <div className="calendar-input">
                                      <DatePicker
                                        ref={(c) => expDateCalRef.current = c}
                                        dateFormat="MM/dd/yyyy"
                                        className="form-control placeholder-dark"
                                        selected={
                                          form?.expDate ? form.expDate : null
                                        }
                                        onChange={ ( date: Date ) =>
                                        {
                                          resetDateFieldError( "expDate" );
                                          handleDateForm( "expDate", date );
                                        } }
                                        showYearDropdown
                                        showMonthDropdown
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={ 100 }
                                        useShortMonthInDropdown
                                        minDate={form?.issueDate ? new Date(form?.issueDate?.setDate(form?.issueDate.getDate() + 1)) : null}
                                      />
                                      <span style={ { color: "red", fontSize: '10px' } }>
                                        { errors && Array.isArray( errors )
                                          ? errors.map( ( error: any ) =>
                                          {
                                            return error.expDate;
                                          } )
                                          : "" }
                                      </span>
                                      <span className="btn calendar-btn"  onClick={()=>openCalender(expDateCalRef)}>
                                        <i
                                          className="fa fa-calendar"
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                  </div>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Background Status</label>
                                    <input
                                      type="text"
                                      name="status"
                                      className="form-control placeholder-dark"
                                      value={pageInfo.customer.digisureStatus ?  (BackgroundChecksStatus as any)[pageInfo.customer.digisureStatus] : ""}
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Argyle Account</label>
                                    <input
                                      type="text"
                                      name="status"
                                      className="form-control placeholder-dark"
                                      value={pageInfo.customer?.argyleData?.map((data) => `${data.linkItemId} `)}
                                      disabled
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="form-action text-right mt-2 mb-2">
                                    <button
                                      className="btn btn-orange"
                                      type="submit"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
          </Layout>
        </>
    )
}

export default CustomerEdit