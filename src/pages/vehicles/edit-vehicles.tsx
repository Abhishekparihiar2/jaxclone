import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Vehicle } from "../../store/vehicles/interface";
import Api from "../../Api";
import DatePicker, { ReactDatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ResponseSuccess, ResponseError } from "../../store/shared/model";
import
{
  DROP_DOWN_TYPES
} from "../../shared/models/index";
import { useNavigate, useParams } from "react-router-dom";
import { openCalender } from '../../utils/index';
import CustomDropdown from "../../shared/components/custom-dropdown/custom-dropdown";
import Layout from "../../shared/components/layout/layout";
import { fetchDropdownValues } from "../../store/dropdownValues/action";
import VehicleTypesDropDown from "../../shared/components/vehicle-types/vehicle-types-dropdown";
import FeatureSelection from "./shared/feature-selection";
import GeoLocation from './shared/geo-location';

interface FormInterface
{
  features: string;
  number: string;
  make: string;
  model: string;
  year: Date | null;
  vin: string;
  color: string;
  vehicleTypeId: number;
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
  primaryImageUrl: string;
  tagNumber: string;
  gasTankSize: number;
  priceAdjustment: number;
  registrationDocument: string;
  DayRate: number;
  odometerDate: Date | null;
  priceDecrement: number | null;
  priceIncrement: number | null;
  latitude: string|null;
  longitude: string|null;
  addressTitle: string|null,
  address: string|null,
}

const initialForm = {
  features: "",
  number: "",
  make: "",
  model: "",
  year: null,
  vin: "",
  color: "",
  vehicleTypeId: 1,
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
  status: "",
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


const EditVehicles = () =>
{
  const [ activeTab, setActiveTab ] = useState( "data" );
  const [ vehicleDetails, setVehicleDetails ] = useState<Vehicle | null>( null )
  const { id } = useParams();
  // form fields
  const [ errors, setErrors ] = useState<any>( [] );
  const [ form, setForm ] = useState<FormInterface>( initialForm );
  // const [ newVehicleId, setNewVehicleId ] = useState<number | undefined>();
  const dispatch = useDispatch();
  const odometerRef = useRef<ReactDatePicker<never, undefined> | null>(null);
  const lastOilChangeDateCalRef = useRef<ReactDatePicker<never, undefined> | null>(null);
  const buyDateCalRef = useRef<ReactDatePicker<never, undefined> | null>(null);
  const sellDateCalRef = useRef<ReactDatePicker<never, undefined> | null>(null);
  const registrationExpDate = useRef<ReactDatePicker<never, undefined> | null>(null);
  const navigate = useNavigate()
  useLayoutEffect( () =>
  {
    const fetchVehicle = async () =>
    {
      try
      {
        const details = await Api.get( `/api/v1/vehicles/show/${ id }` )
        if ( details.data.data )
        {
          console.log( details.data.data )
          setForm( {
            ...form,
            features: details.data.data.features,
            number: details.data.data.number,
            make: details.data.data.make,
            model: details.data.data.model,
            year: details.data.data.year ? new Date( details.data.data.year ) : null,
            vin: details.data.data.vin,
            color: details.data.data.color,
            vehicleTypeId: details.data.data.vehicleTypeId,
            city: details.data.data.city,
            state: details.data.data.state,
            transmission: details.data.data.transmission,
            fuelType: details.data.data.fuelType,
            lastOilChangeDate: details.data.data.lastOilChangeDate ? new Date( details.data.data.lastOilChangeDate ) : null,
            vehicleCost: details.data.data.vehicleCost,
            odometer: details.data.data.odometer,
            door: details.data.data.door,
            vehicleSalePrice: details.data.data.vehicleSalePrice,
            buyer: details.data.data.buyer,
            status: details.data.data.status,
            description: details.data.data.description,
            registrationExpDate: details.data.data.registrationExpDate ? new Date( details.data.data.registrationExpDate ) : null,
            sellDate: details.data.data.sellDate ? new Date( details.data.data.sellDate ) : null,
            buyDate: details.data.data.buyDate ? new Date( details.data.data.buyDate ) : null,
            primaryImageUrl: details.data.data.primaryImageUrl,
            tagNumber: details.data.data.tagNumber,
            gasTankSize: details.data.data.gasTankSize,
            priceAdjustment: details.data.data.priceAdjustment,
            registrationDocument: details.data.data.registrationDocument,
            odometerDate: details.data.data.odometerDate ? new Date( details.data.data.odometerDate ) : null,
            priceDecrement: details.data.data.priceDecrement ? details.data.data.priceDecrement : 0,
            priceIncrement: details.data.data.priceIncrement ? details.data.data.priceIncrement  : 0,
            addressTitle: details.data.data.addressTitle ? details.data.data.addressTitle  : "",
            address: details.data.data.address ? details.data.data.address  : "",
            DayRate: 0,
          } )
          setVehicleDetails( details.data.data )
        }
      } catch ( err )
      {
        throw err
      }
    }
    fetchVehicle()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] )

  useEffect( () =>
  {
    dispatch( fetchDropdownValues( [
      DROP_DOWN_TYPES.VEHICLE_MAKE.toString(),
      DROP_DOWN_TYPES.VEHICLE_MODEL.toString(),
      DROP_DOWN_TYPES.VEHICLE_COLOR.toString(),
      DROP_DOWN_TYPES.STATE.toString(),
      DROP_DOWN_TYPES.VEHICLE_TRANSMISSION.toString(),
      DROP_DOWN_TYPES.FUEL_TYPE.toString(),
    ] ) );
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

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

    if (vehicleDetails?.odometer && (form.odometer === 0 || form.odometer < vehicleDetails?.odometer)) {
      errorArr.push( {
        "odometer": "Please add correct odometer reading!",
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

    if ( form.description && form.description.length > 280)
    {
      errorArr.push( {
        description: "Description length cannot be more then 280 characters",
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
      if ( validData && vehicleDetails )
      {
        // if(errors?.length) {
        //   return dispatch(
        //     new ResponseError( "Please fix below errors." ).action()
        //   );
        // }
        form.priceIncrement = !form.priceIncrement || isNaN(form.priceIncrement) ? 0 : parseFloat(`${form.priceIncrement}`)
        form.priceDecrement = !form.priceDecrement || isNaN(form.priceDecrement) ? 0 : parseFloat(`${form.priceDecrement}`)
        const vehicle: Vehicle = form;
        await (
          await Api.put( `/api/v1/vehicles/update/${ vehicleDetails.id }`, vehicle )
        ).data.data;
        dispatch( new ResponseSuccess( "Vehicle details updated successfully." ).action() );
        navigate( `/vehicle-detail/${ vehicleDetails.id }` )
      }
    } catch ( err: any )
    {
      if ( err.response.status === 400 && err.response.data )
        dispatch( new ResponseError( err.response.data.message ).action() );
      throw err.message;
    }
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
 

  const handleForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) =>
  {
    const name = e.target.name;
    const type = e.target.type;
    let value: any = e.target.value
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
    if(name === 'priceIncrement' && form.priceDecrement && value) {
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
    if(type === 'number') {
      if(name === 'priceDecrement' || name === 'priceIncrement') {
        if(isNaN(value)){
          value = 0
        }else{
          value = !isNaN(value) ? value : parseFloat(value)
        }
      } else {
        value = Number(value)
      }
    }
    setForm( {
      ...form,
      [ name ]: value,
    } );
  };

  const handleDropdownForm = ( name: string, value: string ) =>
  {
    console.log( value, "value" )
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
                      <h3 className="mb-0">Edit Vehicle</h3>
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
                        {/* <li className="nav-item">
                          <a
                            className={
                              "nav-link " +
                              (activeTab === "images" ? "active" : "")
                            }
                            id="vehicle-image-tab"
                            data-toggle="tab"
                            href="#vehicleimage"
                            role="tab"
                            aria-controls="profile"
                            aria-selected="false"
                            onClick={(e) => setActiveTab("images")}
                          >
                            Images
                          </a>
                        </li> */}
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
                          <form onSubmit={ handleSubmit } onKeyDown={e => { handleKeyDown(e, handleSubmit) }}>
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
                                      value={ form.number }
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
                                <label className="date-label">Year
                                <div className="calendar-input">
                                    <DatePicker
                                      selected={ form?.year ? form.year : null }
                                      className="form-control"
                                      onChange={ ( date: Date ) =>
                                      {
                                        resetDateFieldError( "year" );
                                        var followingDay = new Date( date.getTime() + 86400000 );
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
                                  </label>
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
                                      value={ form.tagNumber }
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
                                      value={ form.vin }
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
                                  </div >
                                </div >
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                    <label>Location (City)</label>
                                    <input
                                          type="text"
                                          className="form-control placeholder-dark"
                                          placeholder="Enter city name"
                                          name="city"
                                          value={ form.city }
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
                                {/* <div className="col-lg-4 col-md-6">
                                  <div className="form-group">
                                    <label>Address Title</label>
                                    <input
                                      type="text"
                                      className="form-control placeholder-dark"
                                      placeholder="Address Title"
                                      name="addressTitle"
                                      value={form.addressTitle || ""}
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
                                    <GeoLocation onSelecting={(result: any) => onSelecting(result)} selectedAddress={form.address} 
                                    onChange={(value: any) => setForm((preform) => ({...preform, address: value}))} />
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
                                      type="text"
                                      className="form-control placeholder-dark"
                                      placeholder="120"
                                      name="odometer"
                                      value={ form.odometer }
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
                                  <label className="date-label">Odometer Date
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
                                  </label>
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
                                    <label>Gas Tank Size</label>
                                    <input
                                      type="number"
                                      className="form-control placeholder-dark"
                                  placeholder="20"
                                  step="0.1"
                                      name="gasTankSize"
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
                                      value={ form.gasTankSize }
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
                                  <label className="date-label">Last Oil Change Date
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
                                  </label>
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
                                      value={ form.priceAdjustment }
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
                                      // step="0.01"
                                      value={`${form.priceIncrement}`}
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
                                      // step="0.01"
                                      value={`${form.priceDecrement}`}
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
                                      value={ form.vehicleCost }
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
                                      value={ form.vehicleSalePrice }
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
                                      value={ form.buyer }
                                      onChange={ ( e ) => handleForm( e ) }
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                  <label className="date-label">Purchase Date
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
                                      <span onClick={()=>openCalender(buyDateCalRef)} className="btn calendar-btn">
                                        <i
                                          className="fa fa-calendar"
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                  </div>
                                  </label>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                  <label className="date-label">Sell Date
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
                                      <span onClick={()=>openCalender(sellDateCalRef)} className="btn calendar-btn">
                                        <i
                                          className="fa fa-calendar"
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                  </div>
                                  </label>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                  <div className="form-group">
                                  <label className="date-label">Registration Expiration
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
                                      <span onClick={()=>openCalender(registrationExpDate)} className="btn calendar-btn">
                                        <i
                                          className="fa fa-calendar"
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                  </div>
                                  </label>
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
                                      value={ form.features }
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
                                      value={ form.description }
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
                                    <FeatureSelection handleFeatures={(value: any) => handleFeatures(value)} initalData={form.features} />
                                  </div>
                                </div>
                              </div >
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="form-action text-right mt-2 mb-2">
                                    <button
                                      className="btn btn-orange"
                                      type="submit"
                                    >
                                      Save
                                    </button>
                                    <button
                                      className="btn btn-orange ml-2"
                                      type="reset"
                                      onClick={()=>navigate(`/vehicle-detail/${id}`)}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div >
                          </form >
                        </div >
                      </div >
                    </div >
                  </div >
                </section >
              </div >
            </div >
          </section >
       </Layout>
    </>
  );
};

export default EditVehicles;
