import React, { useLayoutEffect, useState } from 'react'
import DatePicker  from 'react-datepicker';
import Api from "../../Api";
import { useDispatch, useSelector } from 'react-redux';
import { ResponseSuccess } from '../../store/shared/model';
import { AddBlackouts, BlackoutDates, BlackoutDatesPage, EditBlackouts } from '../../store/blackoutDates/model';
import { RootState } from '../../store';

interface Form {
    date: Date | null | undefined;
    name: string | null | undefined
}
const AddBlackOutDate = ({
    handleClose,
    edit,
    id
}: any) => {
    const initialForm: Form = {
        date : new Date(),
        name: null
    }
    const [errors, setErrors] = useState<any>(null)
    const [form, setForm] = useState<Form>(initialForm)
    const dispatch = useDispatch()
    const blackoutDataPage: BlackoutDatesPage = useSelector((state: RootState) => state.blackouts)
    useLayoutEffect(() => {
        if(id && edit) {
            const filteredBlackout = blackoutDataPage.blackoutDates.find((data) => data.id === id)
            console.log(filteredBlackout)
            if(filteredBlackout && filteredBlackout.date && filteredBlackout.name) {
                setForm((preForm) => ({
                    ...preForm, 
                    date: filteredBlackout.date ? new Date(filteredBlackout.date) : new Date(), 
                    name: filteredBlackout?.name
                }))
            }
        }
    }, [])
    const validate = () => {
        const errorArr: any = []
        let valid = true
        if(!form.date) {
            errorArr.push( {
                date: "Please provide date",
            } );
            valid = false
        }
        if(!form.name) {
            errorArr.push( {
                name: "Please provide name of the holiday",
            } );
            valid = false
        }
        if(!valid) {
            setErrors(errorArr)
        }
        return valid
    }
    const convertedDate = (date: Date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2){
        month = '0' + month;
        }
        if (day.length < 2) {
        day = '0' + day;
        }

        return [year, month, day].join('-');
      }
    const handleSubmit = async (e: any) => {
        const isValid = validate()
        e.preventDefault()
        console.log(form)
        if(isValid) {
            if(!edit) {
                const data: BlackoutDates = await (
                    await Api.post( `/api/v1/blackoutdates`, {
                        date: form.date ? convertedDate(form.date) : form.date,
                        name: form.name
                    } )
                ).data.data;
                console.log(data)
                dispatch( new ResponseSuccess( "Blackout Date added successfully." ).action() );
                dispatch( new AddBlackouts(data).action());
                handleClose()
            } else {
                const data: BlackoutDates = await (
                    await Api.put( `/api/v1/blackoutdates/${id}`, {
                        date: form.date ? convertedDate(form.date) : form.date,
                        name: form.name
                    } )
                ).data.data;
                console.log(data)
                dispatch( new ResponseSuccess( "Blackout Date updated successfully." ).action() );
                dispatch( new EditBlackouts({newDate: data,id}).action());
                handleClose()
            }
        }
    }
    const handleDateForm = (name: string, date: Date) => {
        console.log(date)
        setForm((prevForm) => ({...prevForm, [name]: date}))
    }
    const handleForm = (e: any) => {
        const updatedError = errors?.map((error: any) => error.date = null)
        setErrors(updatedError)
        setForm((prevForm) => ({...prevForm, [e.target.name]: e.target.value}))
    }
    return (
        <>
        <form name="add-edit-employee" onSubmit={(e) => handleSubmit(e)}>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="date-label date-new-label">
                            Date
                        </label>
                        <div className="calendar-input">
                            <DatePicker
                                dateFormat="MM/dd/yyyy"
                                className="form-control placeholder-dark"
                                selected={form.date}
                                onChange={(date: any) => {
                                date && handleDateForm( "date", date );
                                setErrors(errors?.filter((v: any) => !v["date"]));
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
                            {errors && Array.isArray(errors) ? (
                                <span style={{ color: "red", fontSize: "10px" }}>
                                {errors.map((err: any) => err.date)}
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Name of Holiday</label>
                        <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={form.name || ""}
                        onChange={(e) => {
                            handleForm(e);
                        }}
                        />
                        {errors && Array.isArray(errors) ? (
                            <span style={{ color: "red", fontSize: "10px" }}>
                            {errors.map((err: any) => err.name)}
                            </span>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <div className="row">
                <div className="col-md-12">
                    <button className="btn btn-orange pull-left" type="submit">
                    {
                        !edit ? "Add" : "Edit"
                    }
                    </button>
                </div>
            </div>
        </form>
        </>
    )
}

export default AddBlackOutDate