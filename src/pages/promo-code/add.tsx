import moment from 'moment';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, StoreInterface } from '../../store';
import { PromoCode, PromoCodePage } from '../../store/promoCode/models';
import Api from "../../Api";
import { ResponseError, ResponseSuccess } from '../../store/shared/model';
import { addDays } from '../../utils/index';


export interface Form {
  codeName: string|null|undefined,
  startDate: Date|null|undefined,
  expirationDate: Date|null|undefined,
  type: string|null|undefined,
  value: number|null|undefined,
  isExtension: number|null|undefined,
  totalCount: number|null|undefined,
  rentalTerm: number|null|undefined,
  isActive: number|null|undefined,
  vehicleTypeId: number|null|undefined,
  useType: string|null|undefined,
  firstTimeRenter: any,
}
const AddPromoCode = ({handleClose, isEditable, id}: any) => {
    const pageInfo: PromoCodePage = useSelector(
      (state: StoreInterface) => state.promoCodeReducer
    );
    const initialForm = {
        codeName: "",
        startDate: new Date(),
        expirationDate: null,
        type: null,
        value: null,
        isExtension: null,
        useType: null,
        totalCount: null,
        rentalTerm: null,
        isActive: null,
        vehicleTypeId: null,
        firstTimeRenter: false,
    }
    const vehicleTypes = useSelector((state: RootState)=>state.vehicleTypesValues.vehicleTypes);
    const [error, setError] = useState<any>([])
    const [form, setForm] = useState<Form>(initialForm)
    const [promoCodeDetails, setPromoCodeDetails] = useState<PromoCode | null>(null)
    const [firstRental, setFirstRental] = useState<any>(promoCodeDetails?.firstTimeRenter ? promoCodeDetails?.firstTimeRenter : false)
    const dispatch = useDispatch()

    useLayoutEffect(() => {
      console.log(id)
      if(isEditable && id) {
        const filteredPromoCode = pageInfo.promoList.find((code) => {
          console.log(code)
          return code.id === id
        })
        if(filteredPromoCode)
          setPromoCodeDetails(filteredPromoCode)
      }
    }, [id])

    useEffect(() => {
      console.log(promoCodeDetails)
      setForm((prevForm) => ({
        ...prevForm,
        codeName: promoCodeDetails?.codeName,
        startDate: promoCodeDetails?.startDate ? new Date(promoCodeDetails?.startDate) : new Date(),
        expirationDate: promoCodeDetails?.expirationDate ? new Date(promoCodeDetails?.expirationDate) : addDays(new Date(), 1),
        type: promoCodeDetails?.codeType,
        useType: promoCodeDetails?.useType,
        value: promoCodeDetails?.offer ? parseFloat(promoCodeDetails.offer) : null,
        isExtension: promoCodeDetails?.extension,
        totalCount: promoCodeDetails?.totalCount,
        rentalTerm: promoCodeDetails?.rentalTerm,
        isActive: promoCodeDetails?.isActive,
        vehicleTypeId: promoCodeDetails?.vehicleType || promoCodeDetails?.vehicleType === 0 ? promoCodeDetails?.vehicleType : undefined,
        firstTimeRenter: promoCodeDetails?.firstTimeRenter,
      }))
      setFirstRental(promoCodeDetails?.firstTimeRenter)
    }, [promoCodeDetails])

    const handleSubmit = async (e: any) => {
      e.preventDefault()
      const addData: any = form
      addData.expirationDate = moment(form.expirationDate).local().format('YYYY-MM-DD')
      addData.startDate = moment(form.startDate).local().format('YYYY-MM-DD')
      addData.codeType = form.type
      addData.offer = parseFloat(`${form.value}`)
      addData.extension = form.isExtension
      addData.firstTimeRenter = firstRental
      const isValid = validate()
      if(isValid) {
        try {
          if(!isEditable) {
            const data: PromoCode = await (
              await Api.post( "/api/v1/promocode", addData )
            ).data.data;
            console.log(data)
            dispatch( new ResponseSuccess( "Promo Code added successfully." ).action() );
            handleClose()
          } else {
            const data: PromoCode = await (
              await Api.post( `/api/v1/promocode/${id}`, addData )
            ).data.data;
            console.log(data)
            dispatch( new ResponseSuccess( "Promo Code updated successfully." ).action() );
            handleClose()
          }
        }catch(err: any){
          if(err?.response?.data?.message)
            dispatch( new ResponseError( err?.response?.data?.message ).action() );
        }
      }
    }
    const validate = () =>
    {
      let valid = true;
      let errorArr = [];
      if ( !form.codeName )
      {
        errorArr.push( {
          codeName: "Please provide code name!",
        } );
        valid = false;
      }
      // if ( !form.startDate )
      // {
      //   errorArr.push( {
      //     startDate: "Please provide start date",
      //   } );
      //   valid = false;
      // }

      // if ( !form.expirationDate )
      // {
      //   errorArr.push( {
      //     expirationDate: "Please provide expiration date!",
      //   } );
      //   valid = false;
      // }
      if ( !form.useType )
      {
        errorArr.push( {
          useType: "Please provide use type!",
        } );
        valid = false;
      }

      if ( !form.type )
      {
        errorArr.push( {
          type: "Please provide offer type",
        } );
        valid = false;
      }


      if ( !form.value )
      {
        errorArr.push( {
          value: "Please provide offer value!",
        } );
        valid = false;
      }
      if ( form.type && form.value && form.type === "PERCENTAGE_OFF" &&  form.value > 100 )
      {
        errorArr.push( {
          value: "Offer value cannot be more than 100",
        } );
        valid = false;
      }
      
      if ( form.isExtension && isNaN(form.isExtension) )
      {
        errorArr.push( {
          isExtension: "Please check for extension",
        } );
        valid = false;
      }

      if ( !form.totalCount )
      {
        errorArr.push( {
          totalCount: "Please provide number of use",
        } );
        valid = false;
      }

      if ( !form.vehicleTypeId && form.vehicleTypeId !== 0)
      {
        errorArr.push( {
          vehicleTypeId: "Please provide vehicle type",
        } );
        valid = false;
      }

      if (form.isActive && isNaN(form.isActive) )
      {
        errorArr.push( {
          isActive: "Please provide status",
        } );
        valid = false;
      }
      
      if ( !valid )
      {
        setError( [...error, ...errorArr] );
        window.scrollTo( 0, 0 );
        dispatch(
          new ResponseError( "Please provide all necessary details." ).action()
        );
      }
      return valid;
    };
    const resetError = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) =>
    {
      const name = e.target.name;
      let oldErrors = error;
      const updatedErrors = oldErrors.filter( ( errorData: any, index: number ) => !(name in errorData))
      setError( updatedErrors );
    };

    const resetDateFieldError = ( name: string ) =>
    {
      let oldErrors = error;
      const updatedErrors = oldErrors.filter( ( errorData: any, index: number ) => !(name in errorData))
      setError( updatedErrors );
    };
    const handleForm = (e: any) => {
      let value = e.target.value
      if(
        e.target.name === 'isActive' || 
        e.target.name === 'isExtension' || 
        e.target.name === 'rentalTerm' || 
        e.target.name === 'totalCount' || 
        e.target.name === 'vehicleTypeId'
      ) {
        value = isNaN(parseInt(value)) ? 0 : parseInt(value)
      }
      if(e.target.name === "firstTimeRenter") {
        value = value === '0' || 'false' ? false : true
      }
      if(e.target.name === 'value') {
        console.log(parseFloat(value), value)
        value = isNaN(parseFloat(value)) ? 0 : value
      }
      setForm((prevForm: Form) => ({...prevForm, [e.target.name]: value}))
    }
    const handleDateForm = ( name: string, value: Date ) =>
    {
      setForm( {
        ...form,
        [ name ]: value,
      } );
    };
    return (
        <form name="add-edit-employee" onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Code Name</label>
              <input
                type="text"
                name={"codeName"}
                value={form.codeName || ""}
                onChange={(e) => {
                  resetError(e)
                  handleForm(e)
                }}
                className="form-control"
                placeholder="John Doe"
              />
              {error && Array.isArray(error) ? (
                <span style={{ color: "red", fontSize: "10px" }}>
                  {error.map((error: any) => {
                    return error.codeName;
                  })}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="date-label date-new-label">
                Start Date
              </label>
              <div className="calendar-input">
                  <DatePicker
                    dateFormat="MM/dd/yyyy"
                    className="form-control placeholder-dark"
                    selected={form.startDate ? new Date(form.startDate) : new Date()}
                    onChange={(date: any) => {
                      date && handleDateForm( "startDate", date );
                      setError(error?.filter((v: any) => !v["startDate"]));
                    }}
                    showYearDropdown
                    showMonthDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    useShortMonthInDropdown
                    minDate={new Date()}
                  />
                  <span className="btn calendar-btn">
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                  </span>
                  {error && Array.isArray(error) ? (
                    <span style={{ color: "red", fontSize: "10px" }}>
                      {error.map((err: any) => err.startDate)}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="date-label date-new-label">
                Expiration Date
              </label>
              <div className="calendar-input">
                  <DatePicker
                    dateFormat="MM/dd/yyyy"
                    className="form-control placeholder-dark"
                    selected={form.expirationDate ? new Date(form.expirationDate) : addDays(new Date(), 1)}
                    onChange={(date: any) => {
                      date && date && handleDateForm( "expirationDate", date );
                      setError(error?.filter((v: any) => !v["expirationDate"]));
                    }}
                    showYearDropdown
                    showMonthDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    useShortMonthInDropdown
                    minDate={addDays(new Date(), 1)}
                  />
                  <span className="btn calendar-btn">
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                  </span>
                  {error && Array.isArray(error) ? (
                    <span style={{ color: "red", fontSize: "10px" }}>
                      {error.map((err: any) => err.expirationDate)}
                    </span>
                  ) : (
                    ""
                  )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
                <label>Use Type (Per User)</label>
                <select
                className="form-control"
                name="useType"
                id="useType"
                value={form.useType || ""}
                onChange={(e) => {
                  resetError(e)
                  handleForm(e)
                }}
                >
                  <option value={""}>
                                    --Select Use Type--
                  </option>
                  <option value={"SINGLE"}>
                  SINGLE
                  </option>
                  <option value={"MULTIPLE"}>
                  MULTIPLE
                  </option>
                </select>
                {error && Array.isArray(error) ? (
                    <span style={{ color: "red", fontSize: "10px" }}>
                      {error.map((err: any) => err.useType)}
                    </span>
                  ) : (
                    ""
                  )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
                <label>Offer Type</label>
                <select
                className="form-control"
                name="type"
                id="type"
                value={form.type || ""}
                onChange={(e) => {
                  resetError(e)
                  handleForm(e)
                }}
                >
                  <option value={""}>
                                    --Select Offer Type--
                  </option>
                  <option value={"AMOUNT_OFF"}>
                          Amount Off
                  </option>
                  <option value={"PERCENTAGE_OFF"}>
                          Percentage Off
                  </option>
                </select>
                {error && Array.isArray(error) ? (
                    <span style={{ color: "red", fontSize: "10px" }}>
                      {error.map((err: any) => err.type)}
                    </span>
                  ) : (
                    ""
                  )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
                <label>Offer Value</label>
                <input
                type="text"
                className="form-control"
                name="value"
                value={form.value || ""}
                onChange={(e) => {
                  resetError(e)
                  handleForm(e)
                }}
                />
                {error && Array.isArray(error) ? (
                    <span style={{ color: "red", fontSize: "10px" }}>
                      {error.map((err: any) => err.value)}
                    </span>
                  ) : (
                    ""
                  )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
                <label>Rental Extensions</label>
                <select
                className="form-control"
                name="isExtension"
                id="isExtension"
                value={`${form.isExtension}` || ""}
                onChange={(e) => {
                  resetError(e)
                  handleForm(e)
                }}
                >
                  <option value={""}>
                          --Select Extension--
                  </option>
                  <option value={"1"}>
                          Yes
                  </option>
                  <option value={"0"}>
                          No
                  </option>
                </select>
                {error && Array.isArray(error) ? (
                    <span style={{ color: "red", fontSize: "10px" }}>
                      {error.map((err: any) => err.isExtension)}
                    </span>
                  ) : (
                    ""
                  )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
                <label>Total Number of Uses</label>
                <input
                type="text"
                className="form-control"
                name="totalCount"
                value={form.totalCount || ""}
                onChange={(e) => {
                  resetError(e)
                  handleForm(e)
                }}
                />
                {error && Array.isArray(error) ? (
                    <span style={{ color: "red", fontSize: "10px" }}>
                      {error.map((err: any) => err.totalCount)}
                    </span>
                  ) : (
                    ""
                  )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
                <label>Rental Term</label>
                <input
                type="text"
                className="form-control"
                name="rentalTerm"
                value={form.rentalTerm || ""}
                onChange={(e) => {
                  resetError(e)
                  handleForm(e)
                }}
                />
                {error && Array.isArray(error) ? (
                    <span style={{ color: "red", fontSize: "10px" }}>
                      {error.map((err: any) => err.rentalTerm)}
                    </span>
                  ) : (
                    ""
                  )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Vehicle Type</label>
              <select
                className="form-control"
                name="vehicleTypeId"
                id="vehicleTypeId"
                value={form.vehicleTypeId || form.vehicleTypeId === 0 ? form.vehicleTypeId : undefined}
                onChange={(e) => {
                  resetError(e)
                  handleForm(e)
                }}
              >
                <option value="">--Select Vehicle Type--</option>
                <option value={0}>All</option>
                {Object.keys(vehicleTypes || {})?.map((key: any) => {
                  return (
                    <>
                      <option value={key}>
                        {vehicleTypes[key]}
                      </option>
                    </>
                  );
                }
                )}
              </select>
              {error && Array.isArray(error) ? (
                    <span style={{ color: "red", fontSize: "10px" }}>
                      {error.map((err: any) => err.vehicleTypeId)}
                    </span>
                  ) : (
                    ""
                  )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
                <label>Status</label>
                <select
                className="form-control"
                name="isActive"
                id="isActive"
                value={`${form.isActive}` || ""}
                onChange={(e) => {
                  resetError(e)
                  handleForm(e)
                }}
                >
                  <option value={""}>
                          --Select Status--
                  </option>
                  <option value={"1"}>
                          Active
                  </option>
                  <option value={"0"}>
                          Inactive
                  </option>
                </select>
                {error && Array.isArray(error) ? (
                    <span style={{ color: "red", fontSize: "10px" }}>
                      {error.map((err: any) => err.isActive)}
                    </span>
                  ) : (
                    ""
                  )}
            </div>
          </div>
          <div className="col-md-12">
          {/* <div className="control_inline">
              <label className="form-control">
              First time Renter
                <input
                  type="checkbox"
                  checked={firstRental}
                  value={firstRental}
                  name={"firstTimeRenter"}
                  onChange={(e: any) => {
                      setFirstRental(!firstRental)
                    }
                  }
                />
              </label>
            </div> */}
            <div className="form-group">
                <label className="control control--checkbox">
                  First time Renter
                  <input
                    name={"firstTimeRenter"}
                    checked={firstRental}
                    value={firstRental}
                    onChange={(e: any) => {
                        setFirstRental(!firstRental)
                      }
                    }
                    type="checkbox"
                    className="form-check-input"
                  />
                  <div className="control__indicator"></div>
                </label>
                {/* {error && Array.isArray(error) ? (
                    <span style={{ color: "red", fontSize: "10px" }}>
                      {error.map((err: any) => err.firstTimeRenter)}
                    </span>
                  ) : (
                    ""
                  )} */}
            </div>
          </div>
          <div className="col-md-12">
            <button className="btn btn-orange pull-left" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    )
}

export default AddPromoCode