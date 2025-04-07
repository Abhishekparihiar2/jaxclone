import React, { useEffect, useLayoutEffect, useState } from 'react'
import DatePicker  from 'react-datepicker';
import { Rental, RentalDetailsPage } from '../../../../store/rentals/model';
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { StoreInterface } from '../../../../store';
import { fetchRentalDetails } from '../../../../store/rentals/action';
import Layout from '../../../../shared/components/layout/layout';
import Api from '../../../../Api'
import { ResponseError, ResponseSuccess } from '../../../../store/shared/model';
import { convertTime12to24 } from '../../../../utils';
import { useNavigate } from 'react-router-dom';
import { addDays, formattedUTCData } from '../../../../utils/index';
var moment = require('moment-timezone')

interface Form {
    pickpDateTime: Date;
    returnDateTime: Date
    returnTime: null | Date
    pickupTime: null | Date
}
interface RentalEditInterface {
    rental: Rental,
    close: () => void,
}
const RentalEdit = () => {
    const initialForm: Form = {
        pickpDateTime : new Date(),
        returnDateTime : new Date(),
        returnTime: null,
        pickupTime: null,
    }
    const [ errors, setErrors ] = useState<any>( [] );
    const [form, setForm] = useState<Form>(initialForm)
    const { id: rentalID } = useParams();
    const dispatch = useDispatch();
    
    const navigate = useNavigate()

    const pageInfo: RentalDetailsPage = useSelector(
        (state: StoreInterface) => state.rentalDetailsPage
    );

    useEffect(() => {
        dispatch(fetchRentalDetails(rentalID));
        // eslint-disable-next-line
    }, [] );

    useLayoutEffect(() => {
        if(pageInfo?.rental) {
            let tz = ""
            if(pageInfo?.rental.vehicleDetails.city.toLowerCase() === "atlanta") {
                tz = "America/New_York"
            }
            if(pageInfo?.rental.vehicleDetails.city.toLowerCase() === "dallas") {
                tz = "America/Chicago"
            }
            let returnTime = ""
            let pickupTime = ""
            let formattedPickupDate = ""
            let formattedReturnDate = ""
            const pickupHours24 = convertTime12to24(pageInfo.rental.pickupTime)
            const returnHours24 = convertTime12to24(pageInfo.rental.returnTime)
            if(pageInfo.rental.pickupAt && pageInfo.rental.returnAt) {
                const pickupAt: any = pageInfo.rental.pickupAt
                const returnAt: any = pageInfo.rental.returnAt
                const fullPickupDate = `${pickupAt.split('-')[2]}-${pickupAt.split('-')[1]}-${pickupAt.split('-')[0]} ${pickupHours24}`
                const fullReturnDate = `${returnAt.split('-')[2]}-${returnAt.split('-')[1]}-${returnAt.split('-')[0]} ${returnHours24}`
                if(tz) {
                    pickupTime = moment.utc(fullPickupDate).tz(tz).format('YYYY-M-D h:mm A')
                    returnTime = moment.utc(fullReturnDate).tz(tz).format('YYYY-M-D h:mm A')
                    formattedPickupDate = moment.utc(fullPickupDate).tz(tz).format('MMMM DD,YYYY')
                    formattedReturnDate = moment.utc(fullReturnDate).format('MMMM DD,YYYY')
                } else {
                    pickupTime = moment.utc(fullPickupDate).local().forma('YYYY-M-D h:mm A')
                    returnTime = moment.utc(fullReturnDate).local().forma('YYYY-M-D h:mm A')
                    formattedPickupDate = moment.utc(fullPickupDate).local().format('MMMM DD,YYYY')
                    formattedReturnDate = moment.utc(fullReturnDate).format('MMMM DD,YYYY')
                }
                setForm((preForm) => ({
                    ...preForm, 
                    pickpDateTime: new Date(formattedPickupDate),
                    returnDateTime: new Date(formattedReturnDate),
                    pickupTime: new Date(pickupTime),
                    returnTime: new Date(returnTime)
                }))
            }
        }
    }, [pageInfo.rental])

    const dateDiff = (fromDate: string, toDate: string) => {
        const date1: any = new Date(fromDate);
        const date2: any = new Date(toDate);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays
    }
    const validate = () =>
    {
        let valid = true;
        let errorArr = [];
        if (!form.pickpDateTime)
        {
        errorArr.push( {
            pickpDateTime: "Please provide pickup date",
        } );
        valid = false;
        }
        if (!form.returnDateTime)
        {
        errorArr.push( {
            returnDateTime: "Please provide return date",
        } );
        valid = false;
        }

        if (!form.pickupTime)
        {
        errorArr.push( {
            slot: "Please provide pickup time",
        } );
        valid = false;
        }
        if (!form.returnTime)
        {
        errorArr.push( {
            slot: "Please provide return time",
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
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const validData: boolean = validate();
        if(!validData) {
            return
        }
        try {
            let tz = ""
            if(pageInfo?.rental.vehicleDetails.city.toLowerCase() === "atlanta") {
                tz = "America/New_York"
            }
            if(pageInfo?.rental.vehicleDetails.city.toLowerCase() === "dallas") {
                tz = "America/Chicago"
            }
            let fmt   = "YYYY-MM-DD";  // must match the input
            const formattedPickupDate = moment(form.pickpDateTime).format(fmt)
            const formattedReturnDate = moment(form.returnDateTime).format(fmt)
            const formattedPickupTime = moment(form.pickupTime).format("YYYY-MM-DD hh:mm A")
            const formattedReturnTime = moment(form.returnTime).format("YYYY-MM-DD hh:mm A")
            let mPickup = moment.tz(formattedPickupDate, fmt, tz);
            let mReturn = moment.tz(formattedReturnDate, fmt, tz);
            let mPickupTime = moment.tz(formattedPickupTime, "YYYY-MM-DD hh:mm A", tz);
            let mReturnTime = moment.tz(formattedReturnTime, "YYYY-MM-DD hh:mm A", tz);
            mPickup.utc()
            mReturn.utc()
            mPickupTime.utc()
            mReturnTime.utc()
            const formattedReturnUTCDate: any = formattedUTCData(pageInfo.rental.vehicleDetails.city, `${mReturnTime.format("hh:mm A")}`, `${formattedReturnDate} ${mReturnTime.format("hh:mm A")}`)
            // console.log(moment(formattedReturnUTCDate).valueOf())
            // console.log(moment(`${mPickup.utc().format(fmt)} ${mPickupTime.utc().format("hh:mm A")}`).valueOf())
            // console.log(moment(formattedReturnUTCDate).valueOf() < moment(`${mPickup.utc().format(fmt)} ${mPickupTime.utc().format("hh:mm A")}`).valueOf())
            if(moment(formattedReturnUTCDate).valueOf() < moment(`${mPickup.utc().format(fmt)} ${mPickupTime.utc().format("hh:mm A")}`).valueOf())
             return dispatch(new ResponseError("Return date time cannot be less then pickup date time").action())
            // if(dateDiff(formattedPickupDate, formattedReturnDate) && dateDiff(formattedPickupDate, formattedReturnDate) < 2) {
            //     return dispatch(new ResponseError("Days should be more then or equal 2 days").action())
            // }
            console.log(
                {
                        pickpDateTime: mPickup.format(fmt),
                        returnDateTime: mReturn.format(fmt),
                        pickupTime: mPickupTime.format("hh:mm A"),
                        returnTime: mReturnTime.format("hh:mm A"),
                }
            )
            const res = await Api.put(`/api/v1/bookings/${rentalID}`, {
                pickpDateTime: mPickup.format(fmt),
                returnDateTime: mReturn.format(fmt),
                pickupTime: mPickupTime.format("hh:mm A"),
                returnTime: mReturnTime.format("hh:mm A"),
            })
            dispatch(new ResponseSuccess("Rental edited successfully!").action())
            navigate( `/rental-details/${rentalID}` )
        }catch(error: any){
            if(error?.response?.data?.message){
                dispatch(new ResponseError(error?.response?.data?.message).action())
            } else {
                dispatch(new ResponseError(error.message).action())
            }
        }
    }
    const handleDateForm = (name: string, date: Date) => {
        console.log(date)
        if(date) {
            setForm((prevForm) => ({...prevForm, [name]: date}))
        }
    }
    return (
        <>
        <Layout>
            <section className="content-body">
                <header className="page-header">
                <div className="page_title">
                <h2>Edit Rental</h2>
                </div>
            </header>
            <div className="page_content">
                <div className="white-box">
                <div className="row">
                    <div className="col-lg-12 col-xl-12">
                        <form name="add-edit-employee" onSubmit={(e) => handleSubmit(e)}>
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="date-label">
                                            Pickup Date
                                            <div className="calendar-input">
                                                <DatePicker
                                                    dateFormat="MM/dd/yyyy"
                                                    className="form-control placeholder-dark"
                                                    selected={form.pickpDateTime}
                                                    onChange={(date: any) => {
                                                    date && handleDateForm( "pickpDateTime", date );
                                                    setErrors(errors?.filter((v: any) => !v["pickpDateTime"]));
                                                    }}
                                                    showYearDropdown
                                                    scrollableYearDropdown
                                                    yearDropdownItemNumber={100}
                                                    useShortMonthInDropdown
                                                    minDate={new Date(form.pickpDateTime)}
                                                    disabled={true}
                                                />
                                                <span className="btn calendar-btn">
                                                    <i className="fa fa-calendar" aria-hidden="true"></i>
                                                </span>
                                                {errors && Array.isArray(errors) ? (
                                                    <span style={{ color: "red", fontSize: "10px" }}>
                                                    {errors.map((err: any) => err.pickpDateTime)}
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="date-label date-new-label">
                                            Pickup Time
                                        </label>
                                        <div className="calendar-input">
                                                <DatePicker
                                                    dateFormat="h:mm aa"
                                                    className="form-control placeholder-dark"
                                                    selected={form.pickupTime}
                                                    onChange={(date: any) => {
                                                        date && handleDateForm( "pickupTime", date );
                                                        setErrors(errors?.filter((v: any) => !v["pickupTime"]));
                                                    }}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={1}
                                                    disabled={true}
                                                />
                                                <span className="btn calendar-btn">
                                                    <i className="fa fa-clock-o" aria-hidden="true"></i>
                                                </span>
                                                {errors && Array.isArray(errors) ? (
                                                    <span style={{ color: "red", fontSize: "10px" }}>
                                                    {errors.map((err: any) => err.pickupTime)}
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="date-label date-new-label">
                                            Return Date
                                        </label>
                                        <div className="calendar-input">
                                                <DatePicker
                                                    dateFormat="MM/dd/yyyy"
                                                    className="form-control placeholder-dark"
                                                    selected={form.returnDateTime}
                                                    onChange={(date: any) => {
                                                    date && handleDateForm( "returnDateTime", date );
                                                    setErrors(errors?.filter((v: any) => !v["returnDateTime"]));
                                                    }}
                                                    showYearDropdown
                                                    scrollableYearDropdown
                                                    yearDropdownItemNumber={100}
                                                    useShortMonthInDropdown
                                                    minDate={new Date(form.pickpDateTime)}
                                                />
                                                <span className="btn calendar-btn">
                                                    <i className="fa fa-calendar" aria-hidden="true"></i>
                                                </span>
                                                {errors && Array.isArray(errors) ? (
                                                    <span style={{ color: "red", fontSize: "10px" }}>
                                                    {errors.map((err: any) => err.returnDateTime)}
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label className="date-label date-new-label">
                                            Return Time
                                        </label>
                                        <div className="calendar-input">
                                                <DatePicker
                                                    dateFormat="h:mm aa"
                                                    className="form-control placeholder-dark"
                                                    selected={form.returnTime}
                                                    onChange={(date: any) => {
                                                        date && handleDateForm( "returnTime", date );
                                                        setErrors(errors?.filter((v: any) => !v["returnTime"]));
                                                    }}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={15}
                                                />
                                                <span className="btn calendar-btn">
                                                    <i className="fa fa-clock-o" aria-hidden="true"></i>
                                                </span>
                                                {errors && Array.isArray(errors) ? (
                                                    <span style={{ color: "red", fontSize: "10px" }}>
                                                    {errors.map((err: any) => err.returnTime)}
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <br />
                            <div className="row">
                                <div className="col-md-12">
                                  <div className="form-action text-right mt-2 mb-2">
                                    <button className="btn btn-orange" type="submit">
                                        Update
                                    </button>
                                    <button className="btn btn-orange ml-2" onClick={() => navigate( `/rental-details/${rentalID}` )}>
                                        Cancel
                                    </button>
                                  </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            </div>
            </section>
        </Layout> 
        </>
    )
}

export default RentalEdit