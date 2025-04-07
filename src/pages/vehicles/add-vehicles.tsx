import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Vehicle } from "../../store/vehicles/interface";
import { fetchDropdownValues } from "../../store/dropdownValues/action";
import Api from "../../Api";
import DatePicker, { ReactDatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { openCalender } from "../../utils/index";
import VehicleImages from "./shared/add-images";
import CustomDropdown from "../../shared/components/custom-dropdown/custom-dropdown";
import { ResponseSuccess, ResponseError } from "../../store/shared/model";
import Layout from "../../shared/components/layout/layout";
import
{
  DROP_DOWN_TYPES
} from "../../shared/models/index";
import VehicleTypesDropDown from "../../shared/components/vehicle-types/vehicle-types-dropdown";
import { StoreInterface } from "../../store";
import { DropdownValuesState } from '../../store/dropdownValues/model';
import FeatureSelection from "./shared/feature-selection";
import GeoLocation from "./shared/geo-location";

interface FormInterface
{
  features: string;
  number: string;
  make: string;
  model: string;
  year: Date | null;
  vin: string;
  color: string;
  vehicleTypeId: number | null;
  city: string;
  state: string;
  transmission: string;
  fuelType: string;
  lastOilChangeDate: Date | null;
  vehicleCost: number;
  odometer: number;
  door: number;
  vehicleSalePrice: number;
  buyer: string;
  status: string;
  description: string;
  registrationExpDate: Date | null;
  sellDate: Date | null;
  buyDate: Date | null;
  odometerDate: Date | null;
  primaryImageUrl: string;
  tagNumber: string;
  gasTankSize: number;
  priceAdjustment: number;
  registrationDocument: string;
  DayRate: number;
  priceDecrement: number | null;
  priceIncrement: number | null;
  latitude: string | null;
  longitude: string | null;
  addressTitle: string | null;
  address: string | null;
}

const initialForm = {
  features: "",
  number: "",
  make: "",
  model: "",
  year: null,
  vin: "",
  color: "",
  vehicleTypeId: null,
  city: "",
  state: "",
  transmission: "",
  fuelType: "",
  lastOilChangeDate: null,
  vehicleCost: 0,
  odometer: 0,
  door: 2,
  vehicleSalePrice: 0,
  buyer: "",
  status: 'PENDING_DELIVERY',
  description: "",
  registrationExpDate: null,
  sellDate: null,
  buyDate: null,
  primaryImageUrl: "",
  tagNumber: "",
  gasTankSize: 0,
  priceAdjustment: 0,
  registrationDocument: "",
  DayRate: 0,
  odometerDate: null,
  priceDecrement: 0,
  priceIncrement: 0,
  latitude: "",
  longitude: "",
  addressTitle: "",
  address: "",
};

const AddVehicles = () =>
{
  const [ activeTab, setActiveTab ] = useState( "data" );
  // form fields
  const [ errors, setErrors ] = useState<any>( [] );
  const [ form, setForm ] = useState<FormInterface>( initialForm );
  const [ newVehicleId, setNewVehicleId ] = useState<number | undefined>();
  const dispatch = useDispatch();
  const odometerRef = useRef<ReactDatePicker<never, undefined> | null>(null);
  const lastOilChangeDateCalRef = useRef<ReactDatePicker<never, undefined> | null>(null);
  const buyDateCalRef = useRef<ReactDatePicker<never, undefined> | null>(null);
  const sellDateCalRef = useRef<ReactDatePicker<never, undefined> | null>(null);
  const registrationExpDate = useRef<ReactDatePicker<never, undefined> | null>(null);
  const dropdownValues: DropdownValuesState = useSelector(
    ( state: StoreInterface ) => state.dropdownValues
  );

  useLayoutEffect(() => {
    dispatch( fetchDropdownValues( [
      DROP_DOWN_TYPES.VEHICLE_MAKE.toString(),
      DROP_DOWN_TYPES.VEHICLE_MODEL.toString(),
      DROP_DOWN_TYPES.VEHICLE_COLOR.toString(),
      DROP_DOWN_TYPES.STATE.toString(),
      DROP_DOWN_TYPES.VEHICLE_TRANSMISSION.toString(),
      DROP_DOWN_TYPES.FUEL_TYPE.toString(),
    ] ) );
    // eslint-disable-next-line
  }, [])

  useEffect( () =>
  {
    if(!dropdownValues.dropdownValues) {
      dispatch( fetchDropdownValues( [
        DROP_DOWN_TYPES.VEHICLE_MAKE.toString(),
        DROP_DOWN_TYPES.VEHICLE_MODEL.toString(),
        DROP_DOWN_TYPES.VEHICLE_COLOR.toString(),
        DROP_DOWN_TYPES.STATE.toString(),
        DROP_DOWN_TYPES.VEHICLE_TRANSMISSION.toString(),
        DROP_DOWN_TYPES.FUEL_TYPE.toString(),
      ] ) );
    }
    // eslint-disable-next-line
  }, [dropdownValues] );

  
  const validate = () =>
  {
    let valid = true;
    let errorArr = [];
    if ( !form.make )
    {
      errorArr.push( {
        make: "Please provide vehicle maker!",
      } );
      valid = false;
    }
    if ( !form.model )
    {
      errorArr.push( {
        model: "Please provide vehicle model!",
      } );
      valid = false;
    }

    if ( !form.year )
    {
      errorArr.push( {
        year: "Please provide year of your vehicle!",
      } );
      valid = false;
    }

    if ( !form.vin )
    {
      errorArr.push( {
        vin: "Please provide VIN of your vehicle!",
      } );
      valid = false;
    }

    if ( !form.tagNumber )
    {
      errorArr.push( {
        tagNumber: "Please provide Tag number of your vehicle!",
      } );
      valid = false;
    }

    if ( !form.number )
    {
      errorArr.push( {
        number: "Please provide vehicle number!",
      } );
      valid = false;
    }

    if ( !form.vehicleTypeId || !Number( form.vehicleTypeId ) )
    {
      errorArr.push( {
        vehicleTypeId: "Please provide type of the vehicle!",
      } );
      valid = false;
    }

    if ( form.odometer && !form.odometerDate )
    {
      errorArr.push( {
        odometerDate: "Please provide date of odometer check!",
      } );
      valid = false;
    }

    if ( !form.color )
    {
      errorArr.push( {
        color: "Please provide color of your vehicle!",
      } );
      valid = false;
    }

    if ( form.description && form.description.length > 280)
    {
      errorArr.push( {
        description: "Description length cannot be more then 280 characters",
      } );
      valid = false;
    }

    if (
      form.registrationExpDate &&
      form.registrationExpDate.getTime() < new Date().getTime()
    )
    {
      errorArr.push( {
        registrationExpDate: "Registration has been expired!",
      } );
      valid = false;
    }
    
    if ( !valid )
    {
      setErrors( [...errors, ...errorArr] );
      window.scrollTo( 0, 0 );
      dispatch(
        new ResponseError( "Please provide all necessary details." ).action()
      );
    }
    return valid;
  };

  const handleKeyDown = (event: any, callback: any) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();
    }
  }
  
  const handleSubmit = async ( event: any ) =>
  {
    try
    {
      event.preventDefault();
      const validData: boolean = validate();
      if ( validData )
      {
        // if(errors?.length) {
        //   return dispatch(
        //     new ResponseError( "Please fix below errors." ).action()
        //   );
        // }
        form.priceIncrement = !form.priceIncrement || isNaN(form.priceIncrement) ? 0 : parseFloat(`${form.priceIncrement}`)
        form.priceDecrement = !form.priceDecrement || isNaN(form.priceDecrement) ? 0 : parseFloat(`${form.priceDecrement}`)
        const vehicle: Vehicle = form;
        const data: Vehicle = await (
          await Api.post( "/api/v1/vehicles/create", vehicle )
        ).data.data;
        setNewVehicleId( data.id );
        setActiveTab( "images" );
        dispatch( new ResponseSuccess( "Vehicle added successfully." ).action() );
        // eslint-disable-next-line no-restricted-globals
        history.pushState( null, "", "#vehicledetail" );
      }
    } catch ( err: any )
    {
      if ( err.response && err.response.status === 400 )
        dispatch( new ResponseError( err.response.data.message ).action() )
      throw err.message;
    }
  };

  const handleForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) =>
  {
    const name = e.target.name;
    const value = e.target.value
    if(name === 'priceDecrement' && form.priceIncrement && value && parseInt(value) !== 0) {
      if(errors.length) {
        const updatedError = errors.map((error: any) => {
          return ('priceDecrement' in error) ? {[name]: "Price decrease could not be added at a time."} : {...error}
        })
        setErrors(updatedError)
      } else {
        setErrors([{priceDecrement: "Price decrease could not be added at a time."}])
      }
      return
    }
    if(name === 'priceIncrement' && form.priceDecrement && value && parseInt(value) !== 0) {
      if(errors.length) {
        const updatedError = errors.map((error: any) => {
          return ('priceIncrement' in error) ? {[name]: "Price increase could not be added at a time."} : {...error}
        })
        setErrors(updatedError)
      } else {
       setErrors([{priceIncrement: "Price increase could not be added at a time."}]) 
      }
      return 
    }
    setForm( {
      ...form,
      [ name ]: name === 'odometer' ? Number( e.target.value ) : (name === 'priceDecrement' || name === 'priceIncrement') ?  parseFloat(e.target.value) : e.target.value,
    } );
  };

  const handleBlur = (
   name: string,value: string
  ) =>
  {
    setForm( {
      ...form,
      [ name ]: value,
    } );
  };

  const handleDropdownForm = ( name: string, value: string ) =>
  {
    setForm( {
      ...form,
      [ name ]: value,
    } );
  };

  const handleDateForm = ( name: string, value: Date ) =>
  {
    setForm( {
      ...form,
      [ name ]: value,
    } );
  };

  const resetError = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) =>
  {
    const name = e.target.name;
    let oldErrors = errors;
    const updatedErrors = oldErrors.filter( ( error: any, index: number ) => !(name in error))
    setErrors( updatedErrors );
  };

  const resetDropdownError = ( name: string ) =>
  {
    let oldErrors = errors;
    const updatedErrors = oldErrors.filter( ( error: any, index: number ) => !(name in error))
    setErrors( updatedErrors );
  };

  const resetDateFieldError = ( name: string ) =>
  {
    let oldErrors = errors;
    const updatedErrors = oldErrors.filter( ( error: any, index: number ) => !(name in error))
    setErrors( updatedErrors );
  };

  const handleFeatures = (value: any) => {
    setForm( {
      ...form,
      features: value,
    } );
  }
  const onSelecting = (result: any) => {
    setForm((preForm) => ({
      ...preForm,
      latitude: result.lat,
      longitude: result.lng,
      address: result.add
    }))
  }
  console.log(form)
  // console.log(errors)
  return ( <>
    <Layout>
          <section className="content-body">
            <header className="page-header">
              <div className="page_title">
                <h2>Vehicle</h2>
              </div>
            </header>

            <div className="page_content">
              <div className="white-box">
                <section className="card mb20 border-none">
                  <div className="card-body p-0">
                    <div className="table-head table-single-heading">
                      <h3 className="mb-0">Add Vehicle</h3>
                      <div className="head-page-action">
                        {/* <div className="export-btn">
                          <a
                            href="#"
                            className="btn orange-circle radius-sm"
                            data-toggle="modal"
                            data-target="#addVehiclesModal"
                          >
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                          </a>
                        </div> */}
                      </div>
                    </div>
                    <div className="tabs-column">
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                          <a
                            className={
                              "nav-link " +
                              ( activeTab === "data" ? "active" : "" )
                            }
                            id="vehicle-detail-tab"
                            data-toggle="tab"
                            href="#vehicledetail"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                            onClick={ ( e ) => setActiveTab( "data" ) }
                          >
                            Vehicle Details
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={
                              "nav-link " +
                              ( activeTab === "images" ? "active" : "" )
                            }
                            id="vehicle-image-tab"
                            data-toggle="tab"
                            href="#vehicleimage"
                            role="tab"
                            aria-controls="profile"
                            aria-selected="false"
                            onClick={ ( e ) => newVehicleId ? setActiveTab( "images" ) : dispatch( new ResponseError( "Please add new vehicle first!" ).action() ) }
                          >
                            Images
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div
                          className={
                            "tab-pane " +
                            ( activeTab === "data" ? "fade show active" : "" )
                          }
                          id="vehicledetail"
                          role="tabpanel"
                          aria-labelledby="vehicle-detail-tab"
                        >
                          <form onSubmit={ (e) => handleSubmit(e) } onKeyDown={e => { handleKeyDown(e, handleSubmit) }}>
                            <div className="vehicle-detail-form">
                              <div className="row">
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Vehicle Number</label>
                                    <input
                                      type="text"
                                      name="number"
                                      className="form-control placeholder-dark"
                                      placeholder="ATL 12345"
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
                                          return error.number;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Make</label>
                                    <CustomDropdown
                                      type={ DROP_DOWN_TYPES.VEHICLE_MAKE.toString() }
                                      name={ "make" }
                                      allowEdit={ true }
                                      value={ form?.make ? form.make : "" }
                                      placeholder={ "Choose a Vehicle Make..." }
                                      onChange={ ( name, value ) =>
                                      {
                                        resetDropdownError( "make" );
                                        handleDropdownForm(
                                          "make",
                                          value
                                        );
                                      } }
                                    />
                                    <span style={ { color: "red", fontSize: '10px' } }>
                                      { errors && Array.isArray( errors )
                                        ? errors.map( ( error: any ) =>
                                        {
                                          return error.make;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Model</label>
                                    <CustomDropdown
                                      type={ DROP_DOWN_TYPES.VEHICLE_MODEL.toString() }
                                      name={ "model" }
                                      allowEdit={ true }
                                      value={ form?.model ? form.model : "" }
                                      placeholder={ "Choose a Vehicle Model..." }
                                      onChange={ ( name, value ) =>
                                      {
                                        resetDropdownError( "model" );
                                        handleDropdownForm(
                                          "model",
                                          value
                                        );
                                      } }
                                    />
                                    <span style={ { color: "red", fontSize: '10px' } }>
                                      { errors && Array.isArray( errors )
                                        ? errors.map( ( error: any ) =>
                                        {
                                          return error.model;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                <label className="date-label date-new-label">Year
                                  </label>
                                  <div className="calendar-input">
                                    <DatePicker
                                      selected={ form?.year ? form.year : null }
                                      className="form-control"
                                      onChange={ ( date: Date ) =>
                                      {
                                        resetDateFieldError( "year" );
                                        var followingDay = new Date( date.getTime() + 86400000);
                                        handleDateForm( "year", followingDay );
                                      } }
                                      showYearPicker
                                      dateFormat="yyyy"
                                    />
                                    <span className="btn calendar-btn">
                                      <i className="fa fa-calendar" aria-hidden="true"></i>
                                    </span>
                                    <span style={ { color: "red", fontSize: '10px' } }>
                                      { errors && Array.isArray( errors )
                                        ? errors.map( ( error: any ) =>
                                        {
                                          return error.year;
                                        } )
                                        : "" }
                                  </span>
                                  </div>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Tag Number</label>
                                    <input
                                      type="text"
                                      className="form-control placeholder-dark"
                                      placeholder="12345678"
                                      name="tagNumber"
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
                                          return error.tagNumber;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>VIN</label>
                                    <input
                                      type="text"
                                      className="form-control placeholder-dark"
                                      placeholder="RJC5245"
                                      name="vin"
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
                                          return error.vin;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Color</label>
                                    <CustomDropdown
                                      type={ DROP_DOWN_TYPES.VEHICLE_COLOR.toString() }
                                      name={ "color" }
                                      allowEdit={ true }
                                      value={ form?.color ? form.color : "" }
                                      placeholder={ "Choose a Color..." }
                                      onChange={ ( name, value ) =>
                                      {
                                        resetDropdownError( "color" );
                                        handleDropdownForm(
                                          "color",
                                          value
                                        );
                                      } }
                                    />
                                    <span style={ { color: "red", fontSize: '10px' } }>
                                      { errors && Array.isArray( errors )
                                        ? errors.map( ( error: any ) =>
                                        {
                                          return error.color;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Vehicle Type</label>
                                      <VehicleTypesDropDown
                                      name={ "vehicleTypeId" }
                                      allowEdit={ false }
                                      value={ form.vehicleTypeId ? String(form.vehicleTypeId) : '' }
                                      placeholder={ "Choose a Vehicle Type..." }
                                      onChange={ ( name, value ) =>
                                      {
                                        resetDropdownError( "vehicleTypeId" );
                                        handleDropdownForm(
                                          "vehicleTypeId",
                                          value
                                        );
                                      } }
                                    />
                                    <span style={ { color: "red", fontSize: '10px' } }>
                                      { errors && Array.isArray( errors )
                                        ? errors.map( ( error: any ) =>
                                        {
                                          return error.vehicleTypeId;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Location (City)</label>
                                    <input
                                          type="text"
                                          className="form-control placeholder-dark"
                                          placeholder="Enter city name"
                                          name="city"
                                          value={ form?.city ? form.city : "" }
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
                                    <label>Location (State)</label>
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
                                {/* <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Address Title</label>
                                    <input
                                      type="text"
                                      className="form-control placeholder-dark"
                                      placeholder="Address Title"
                                      name="addressTitle"
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
                                          return error.addressTitle;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="form-group">
                                    <label>Address on Google Map</label>
                                    <GeoLocation onSelecting={(result: any) => onSelecting(result)} />
                                  </div>
                                </div> */}
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Transmission</label>
                                    <CustomDropdown
                                      type={ DROP_DOWN_TYPES.VEHICLE_TRANSMISSION.toString() }
                                      name={ "transmission" }
                                      allowEdit={ true }
                                      value={ form?.transmission ? form.transmission : "" }
                                      placeholder={ "Choose a transmission..." }
                                      onChange={ ( name, value ) =>
                                      {
                                        resetDropdownError( "transmission" );
                                        handleDropdownForm(
                                          "transmission",
                                          value
                                        );
                                      } }
                                    />
                                    <span style={ { color: "red", fontSize: '10px' } }>
                                      { errors && Array.isArray( errors )
                                        ? errors.map( ( error: any ) =>
                                        {
                                          return error.transmission;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Odometer (Miles)</label>
                                    <input
                                      type="number"
                                      className="form-control placeholder-dark"
                                      placeholder="120"
                                      name="odometer"
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
                                          return error.odometer;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                  <label className="date-label date-new-label">Odometer Date
                                  </label>
                                  <div className="calendar-input">
                                      <DatePicker
                                        ref={(c) => odometerRef.current = c}
                                        dateFormat="MM/dd/yyyy"
                                        className="form-control placeholder-dark"
                                        selected={
                                          form?.odometerDate ? form.odometerDate : null
                                        }
                                        onChange={ ( date: Date ) =>
                                        {
                                          resetDateFieldError( "odometerDate" );
                                          handleDateForm( "odometerDate", date );
                                        } }
                                        maxDate={ new Date() }
                                        showYearDropdown
                                        showMonthDropdown
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={ 100 }
                                        useShortMonthInDropdown
                                      />
                                      <span style={ { color: "red", fontSize: '10px' } }>
                                        { errors && Array.isArray( errors )
                                          ? errors.map( ( error: any ) =>
                                          {
                                            return error.odometerDate;
                                          } )
                                          : "" }
                                      </span>
                                      <span className="btn calendar-btn" onClick={()=>openCalender(odometerRef)}>
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
                                    <label>Door</label>
                                    <select
                                      className="form-control"
                                      name="door"
                                      value={ form?.door ? form.door : 2 }
                                      onChange={ ( e ) =>
                                      {
                                        resetError( e );
                                        handleForm( e );
                                      } }
                                    >
                                      <option selected={ form.door === 2 }>
                                        2
                                      </option>
                                      <option selected={ form.door === 3 }>
                                        3
                                      </option>
                                      <option selected={ form.door === 4 }>
                                        4
                                      </option>
                                      <option selected={ form.door === 5 }>
                                        5
                                      </option>
                                    </select>
                                    <span style={ { color: "red", fontSize: '10px' } }>
                                      { errors && Array.isArray( errors )
                                        ? errors.map( ( error: any ) =>
                                        {
                                          return error.door;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Gas Tank Size (Gallons)</label>
                                    <input
                                      type="number"
                                      className="form-control placeholder-dark"
                                      placeholder="20"
                                      name="gasTankSize"
                                  step="0.1"
                                  value={ form.gasTankSize }
                                  onChange={ ( e ) =>
                                      {
                                        resetError( e );
                                        handleForm( e );
                                  } }
                                  onBlur={ ( e ) =>
                                  { 
                                    resetError( e );
                                    handleBlur(e.target.name, Number( e.target.value ).toFixed( 1 ))
                                  }}
                                    />
                                    <span style={ { color: "red", fontSize: '10px' } }>
                                      { errors && Array.isArray( errors )
                                        ? errors.map( ( error: any ) =>
                                        {
                                          return error.gasTankSize;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Fuel Type</label>
                                    <CustomDropdown
                                      type={ DROP_DOWN_TYPES.FUEL_TYPE.toString() }
                                      name={ "fuelType" }
                                      allowEdit={ true }
                                      value={ form?.fuelType ? form.fuelType : "" }
                                      placeholder={ "Choose a Fuel Type..." }
                                      onChange={ ( name, value ) =>
                                      {
                                        resetDropdownError( "fuelType" );
                                        handleDropdownForm(
                                          "fuelType",
                                          value
                                        );
                                      } }
                                    />
                                    <span style={ { color: "red", fontSize: '10px' } }>
                                      { errors && Array.isArray( errors )
                                        ? errors.map( ( error: any ) =>
                                        {
                                          return error.fuelType;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                  <label className="date-label date-new-label">Last Oil Change Date
                                  </label>
                                  <div className="calendar-input">
                                      <DatePicker
                                        ref={(c) => lastOilChangeDateCalRef.current = c}
                                        dateFormat="MM/dd/yyyy"
                                        className="form-control placeholder-dark"
                                        selected={
                                          form?.lastOilChangeDate
                                            ? form.lastOilChangeDate
                                            : null
                                        }
                                        onChange={ ( date: Date ) =>
                                        {
                                          resetDateFieldError(
                                            "lastOilChangeDate"
                                          );
                                          handleDateForm(
                                            "lastOilChangeDate",
                                            date
                                          );
                                        } }
                                        maxDate={ new Date() }
                                        showYearDropdown
                                        showMonthDropdown
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={ 100 }
                                        useShortMonthInDropdown
                                      />
                                      <span style={ { color: "red", fontSize: '10px' } }>
                                        { errors && Array.isArray( errors )
                                          ? errors.map( ( error: any ) =>
                                          {
                                            return error.lastOilChangeDate;
                                          } )
                                          : "" }
                                      </span>
                                      <span className="btn calendar-btn" onClick={()=>openCalender(lastOilChangeDateCalRef)}>
                                        <i
                                          className="fa fa-calendar"
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                  </div>
                                  </div>
                                </div>
                                {/* <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Price Adjustment</label>
                                    <input
                                      type="number"
                                      className="form-control placeholder-dark"
                                      placeholder="$5,000"
                                      name="priceAdjustment"
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
                                          return error.priceAdjustment;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div> */}
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Price Increase (%)</label>
                                    <input
                                      type="number"
                                      className="form-control placeholder-dark"
                                      placeholder="0"
                                      name="priceIncrement"
                                      min={0}
                                      step="0.01"
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
                                          return error.priceIncrement;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Price Decrease (%)</label>
                                    <input
                                      type="number"
                                      className="form-control placeholder-dark"
                                      placeholder="0"
                                      name="priceDecrement"
                                      min={0}
                                      step="0.01"
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
                                          return error.priceDecrement;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Vehicle Cost</label>
                                    <input
                                      type="number"
                                      className="form-control placeholder-dark"
                                      placeholder="$5,000"
                                      name="vehicleCost"
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
                                          return error.vehicleCost;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Vehicle Vendor</label>
                                    <input
                                      type="text"
                                      className="form-control placeholder-dark"
                                      placeholder="John Doe"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Vehicle Sale Price</label>
                                    <input
                                      type="number"
                                      className="form-control placeholder-dark"
                                      placeholder="$3,000"
                                      name="vehicleSalePrice"
                                      onChange={ ( e ) =>
                                      {
                                        handleForm( e );
                                        resetError( e );
                                      } }
                                    />
                                    <span style={ { color: "red", fontSize: '10px' } }>
                                      { errors && Array.isArray( errors )
                                        ? errors.map( ( error: any ) =>
                                        {
                                          return error.vehicleSalePrice;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Vehicle Buyer</label>
                                    <input
                                      type="text"
                                      className="form-control placeholder-dark"
                                      placeholder="Mike Tim"
                                      name="buyer"
                                      onChange={ ( e ) => handleForm( e ) }
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                  <label className="date-label date-new-label">Purchase Date
                                  </label>
                                  <div className="calendar-input">
                                      <DatePicker
                                        ref={(c) => buyDateCalRef.current = c}
                                        dateFormat="MM/dd/yyyy"
                                        className="form-control placeholder-dark"
                                        selected={
                                          form?.buyDate ? form.buyDate : null
                                        }
                                        onChange={ ( date: Date ) =>
                                        {
                                          resetDateFieldError( "buyDate" );
                                          handleDateForm( "buyDate", date );
                                        } }
                                        showYearDropdown
                                        showMonthDropdown
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={ 100 }
                                        useShortMonthInDropdown
                                      />
                                      <span style={ { color: "red", fontSize: '10px' } }>
                                        { errors && Array.isArray( errors )
                                          ? errors.map( ( error: any ) =>
                                          {
                                            return error.buyDate;
                                          } )
                                          : "" }
                                      </span>
                                      <span className="btn calendar-btn"  onClick={()=>openCalender(buyDateCalRef)}>
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
                                  <label className="date-label date-new-label">Sale Date
                                  </label>
                                  <div className="calendar-input">
                                      <DatePicker
                                        ref={(c) => sellDateCalRef.current = c}
                                        dateFormat="MM/dd/yyyy"
                                        className="form-control placeholder-dark"
                                        selected={
                                          form?.sellDate ? form.sellDate : null
                                        }
                                        onChange={ ( date: Date ) =>
                                        {
                                          resetDateFieldError( "sellDate" );
                                          handleDateForm( "sellDate", date );
                                        } }
                                        showYearDropdown
                                        showMonthDropdown
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={ 100 }
                                        useShortMonthInDropdown
                                      />
                                      <span style={ { color: "red", fontSize: '10px' } }>
                                        { errors && Array.isArray( errors )
                                          ? errors.map( ( error: any ) =>
                                          {
                                            return error.sellDate;
                                          } )
                                          : "" }
                                      </span>
                                      <span className="btn calendar-btn" onClick={()=>openCalender(sellDateCalRef)}>
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
                                  <label className="date-label date-new-label">Registration Expiration
                                  </label>
                                  <div className="calendar-input">
                                      <DatePicker
                                        ref={(c) => registrationExpDate.current = c}
                                        dateFormat="MM/dd/yyyy"
                                        className="form-control placeholder-dark"
                                        selected={
                                          form?.registrationExpDate
                                            ? form.registrationExpDate
                                            : null
                                        }
                                        onChange={ ( date: Date ) =>
                                        {
                                          resetDateFieldError(
                                            "registrationExpDate"
                                          );
                                          handleDateForm(
                                            "registrationExpDate",
                                            date
                                          );
                                        } }
                                        showYearDropdown
                                        showMonthDropdown
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={ 100 }
                                        useShortMonthInDropdown
                                      />
                                      <span style={ { color: "red", fontSize: '10px' } }>
                                        { errors && Array.isArray( errors )
                                          ? errors.map( ( error: any ) =>
                                          {
                                            return error.registrationExpDate;
                                          } )
                                          : "" }
                                      </span>
                                      <span className="btn calendar-btn" onClick={()=>openCalender(registrationExpDate)}>
                                        <i
                                          className="fa fa-calendar"
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                  </div>
                                  </div>
                                </div>
                                {/* <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Features</label>
                                    <input
                                      type="text"
                                      className="form-control placeholder-dark"
                                      placeholder=""
                                      name="features"
                                      onChange={ ( e ) => handleForm( e ) }
                                    />
                                  </div>
                                </div> */}
                                <div className="col-lg-6 col-md-8">
                                  <div className="form-group">
                                    <label>Description</label>
                                    <input
                                      type="text"
                                      className="form-control placeholder-dark"
                                      placeholder="Description of the vehicle."
                                      name="description"
                                      onChange={ ( e ) => handleForm( e ) }
                                    />
                                    <span style={ { color: "red", fontSize: '10px' } }>
                                      { errors && Array.isArray( errors )
                                        ? errors.map( ( error: any ) =>
                                        {
                                          return error.description;
                                        } )
                                        : "" }
                                    </span>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="form-group">
                                    <label>Features</label>
                                    <FeatureSelection handleFeatures={(value: any) => handleFeatures(value)}/>
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

                        <div
                          className={
                            "tab-pane " +
                            ( activeTab === "images" ? "fade show active" : "" )
                          }
                          id="vehicleimage"
                          role="tabpanel"
                          aria-labelledby="vehicle-image-tab"
                        >
                          <VehicleImages newVehicleId={ newVehicleId } />
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
  );
};

export default AddVehicles;
