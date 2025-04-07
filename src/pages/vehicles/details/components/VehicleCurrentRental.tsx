import React, { useEffect, useLayoutEffect, useState } from 'react'
import { VehicleCurrentRentalInterface } from '../../interface'
import { convertTime12to24, dateDifference, formatDate, numberOfRentalDays } from '../../../../utils/index';
import JAXModal from '../../../../shared/components/modal/jax-modal';
import { useDispatch, useSelector } from 'react-redux';
import { StoreInterface } from '../../../../store';
import { addRentalNote, deleteRentalNote, editRentalNote, searchNotes } from '../../../../store/vehicles/action';
import { Notes, RentalInterface } from '../../../../store/vehicles/interface';
import {formatAmount} from '../../../../utils/index'
import { Note } from '../../../../store/notes/model';
import { Rental } from '../../../../store/rentals/model';
var moment = require('moment-timezone');

interface FormInterface {
    notes: string;
    author: string
}

const VehicleCurrentRental = ({currentRental, currentRentalTotal, vehicle}: VehicleCurrentRentalInterface) => {

    useLayoutEffect(() => {
        if(currentRental && currentRental?.id && (!currentRental.rentalNotes || currentRental.rentalNotes.length === 0))
          dispatch(searchNotes({rentalId: currentRental?.id}))
          // eslint-disable-next-line
    },[currentRentalTotal])

    const dispatch = useDispatch()
    const userId = useSelector( ( state: StoreInterface ) => state.login.userId )
    const loginState = useSelector((state: StoreInterface) => state.login);
    // const success = useSelector((state: StoreInterface) => state.response.successResponse)
    const initialForm = {
        notes: "",
        author: ""
    }

    const [showAddNote, setShowAddNote] = useState<boolean>(false)
    const [showeEditNote, setShowEditNote] = useState<boolean>(false)
    const [errors, setErrors] = useState<any>(null)
    const [form, setForm] = useState<FormInterface>(initialForm)
    const [editNoteId, setEditNoteId] = useState<number>()

    const [chunkedData, setChunkData] = useState<any[]>([])
    const [viewAll, setViewAll] = useState<boolean>(false)
    
    const sort = (array: Note[]) => {
        return array.sort((a: Note, b: Note) => {
            if(a && b && a.id && b.id){
                if(a.id < b.id)
                    return 1
                if((new Date(a.createdAt).getTime()) > (new Date(b.createdAt).getTime()))
                    return -1    
            }
            return 0    
        })
    }

    useEffect(() => {
        const chunks: any = []
        if(currentRental && currentRental.rentalNotes && currentRental.rentalNotes.length > 0){
            const sortedArray = sort(currentRental.rentalNotes)
            console.log(sortedArray)
            const firstChunk = sortedArray.slice(0, 5)
            const secondChunk = sortedArray.slice(5)
            chunks.push(firstChunk, secondChunk)
        }
        setChunkData(chunks)
    }, [currentRental])



    const handleForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const name = e.target.name
        setForm({
          ...form,
          [name]: e.target.value
        })
        resetError(e)
    }

    const resetError = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
        let oldErrors = errors;
        const updatedErrors = oldErrors && oldErrors.map((error: any) => {
          return name in error ? { [name]: "" } : { ...error };
        });
        setErrors(updatedErrors);
    };

    const validate = () => {
        let errorTexts = []
        let valid = true
        if(!form.notes || form.notes.length === 0 ) {
            errorTexts.push({
                notes: "Please provide note",
            });
            valid = false
        }

        if(!form.author || form.author.length === 0 ) {
            errorTexts.push({
                author: "Please provide author name",
            });
            valid = false
        }
        if(!valid) {
            setErrors(errorTexts)
        }
        return valid
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if(validate() && currentRental?.id && userId){
            dispatch(addRentalNote({rentalId: currentRental?.id, userId, ...form}))
            setForm(initialForm)
            setShowAddNote(false)
        }
    }

    const handleEditSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if(validate() && currentRental?.id && userId){
            dispatch(editRentalNote({rentalId: currentRental?.id, userId, ...form, id: editNoteId}))
            setForm(initialForm)
            setShowEditNote(false)
        }
    }

    const handleOpenEditNotes = (data: Notes) => {
        setForm({...form, notes: data.notes, author: data.author})
        setEditNoteId(data.id)
        setShowEditNote(true)
    }

    const handleOpenAddNotes = () => {
        setForm({...form, author: loginState.name ? loginState.name : 'Admin'})
        setShowAddNote(true)
    }

    const handleDeleteNote = (data: Notes) => {
        if(currentRental?.id)
            dispatch(deleteRentalNote({id: data.id, rentalId: currentRental?.id}))
        // setForm(initialForm)
    }
    const convertedDateTime = (utcDate: any, utcTime: any) => {
        if(utcDate && utcTime){
          // console.log(rental)
          const date: any = utcDate;
          const hours24 = convertTime12to24(utcTime)
          const fullDate = `${date.split('-')[2]}-${date.split('-')[1]}-${date.split('-')[0]} ${hours24}`
          // const time = moment.utc(fullDate).add(offsetDiff, 'minutes').local().format('hh:mm A')
          console.log(currentRental)
          let tz = ""
          if(vehicle?.city.toLowerCase() === "atlanta") {
            tz = "America/New_York"
          }
          if(vehicle?.city.toLowerCase() === "dallas") {
            tz = "America/Chicago"
          }
          let time = ""
          let formattedDate = ""
          if(tz) {
            time = moment.utc(fullDate).tz(tz).format('hh:mm A')
            formattedDate = moment.utc(fullDate).format('MMMM DD,YYYY')
          } else {
            time = moment.utc(fullDate).local().format('hh:mm A')
            formattedDate = moment.utc(fullDate).format('MMMM DD,YYYY')
          }
          return `${formattedDate} | ${time}`
        }
      }
    return (
        <section className="card mb20">
            {
                currentRental ?
                <>
                <header className="card-header">
                    <h2 className="card-title">Current Customer Info</h2>
                </header>
                <div className="card-body">
                    <div className="rental-cust-info">
                    <div className="rental-cust-pic">
                        <img src={currentRental.profileImage && currentRental.profileImage.length > 0 ? currentRental.profileImage : "/static/images/profile.png"} alt="" />
                    </div>
                    <div className="rental-cust-detail">
                        <ul className="info-list info-list2-col">
                        <li>
                            <div className="info-list-item">
                            <label className="info-label">
                                Rental Number
                            </label>
                            <div className="info-name">
                                <a href={ currentRental?.id ? `/rental-details/${ currentRental.id }` : "-" }>{ currentRental?.rentalNumber }</a>
                            </div>
                            </div>
                        </li>
                        <li>
                            <div className="info-list-item">
                            <label className="info-label">
                                Customer Name
                            </label>
                            <div className="info-name">
                                <a href={currentRental?.id ? `/customer-info/${currentRental.userId}` : "#"}>{currentRental.userFirstName} {currentRental.userLastName}</a>
                            </div>
                            </div>
                        </li>
                        <li>
                            <div className="info-list-item">
                            <label className="info-label">
                                Start Date/Time
                            </label>
                            <div className="info-name">
                                {currentRental?.pickupAt ? convertedDateTime(currentRental?.pickupFormattedAt, currentRental?.pickupTime) : ""}
                            </div>
                            </div>
                        </li>
                        <li>
                            <div className="info-list-item">
                            <label className="info-label">
                                End Date/Time
                            </label>
                            <div className="info-name">
                            {currentRental?.returnAt ? convertedDateTime(currentRental?.returnFormattedAt, currentRental?.returnTime) : ""}
                            </div>
                            </div>
                        </li>
                        <li>
                            <div className="info-list-item">
                            <label className="info-label">
                                Total Rental Days
                            </label>
                            <div className="info-name">{
                                // dateDifference(currentRental.pickupAt, currentRental.returnAt)
                                numberOfRentalDays( currentRental.pickupFormattedAt, currentRental.returnFormattedAt )  
                            } Days</div>
                            </div>
                        </li>
                        <li>
                            <div className="info-list-item">
                            <label className="info-label">
                                Total Rental Revenue
                            </label>
                            <div className="info-name">{formatAmount(currentRentalTotal)}</div>
                            </div>
                        </li>
                        </ul>
                    </div>
                    </div>
                    <>
                                        <div className="table-responsive notes-table mt20">
                                            <table className="table table-bordered mb-0">
                                                <thead>
                                                <tr>
                                                    <th style={{ width: "40%" }}>Notes</th>
                                                    <th style={{ width: "17%" }}>Created Date</th>
                                                    <th style={{ width: "15%" }}>Author</th>
                                                    <th
                                                    style={{ width: "13%" }}
                                                    className="th-action"
                                                    >
                                                    {/* eslint-disable-next-line  */}
                                                    <a
                                                        className="btn btn-orange btn-sm"
                                                        href="#"
                                                        onClick={() => handleOpenAddNotes()}
                                                    >
                                                        Add Notes
                                                    </a>
                                                    </th>
                                                </tr>
                                                </thead>
                                                {
                                                            chunkedData && chunkedData.length > 0 ? 
                                                            <tbody>
                                                            {
                                                                chunkedData.map((data, dataIndex) => {
                                                                    return (
                                                                        data.map((chunk: any, index: number) => <tr style={{display: dataIndex === 0 || (dataIndex > 0 && viewAll) ? "" : "none"}}>
                                                                            <td>
                                                                            {chunk.notes}
                                                                            </td>
                                                                            <td>
                                                                            {formatDate(chunk.createdAt)}
                                                                            </td>
                                                                            <td>{chunk.author}</td>
                                                                            <td className="td-action">
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-outline-secondary btn-xs mr-1"
                                                                                title="Edit"
                                                                                onClick={() => handleOpenEditNotes(chunk)}
                                                                            >
                                                                                <i
                                                                                className="fa fa-pencil"
                                                                                aria-hidden="true"
                                                                                ></i>
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-outline-danger btn-xs mr-1"
                                                                                onClick={() => handleDeleteNote(chunk)}
                                                                            >
                                                                                <i
                                                                                className="fa fa-trash-o"
                                                                                aria-hidden="true"
                                                                                ></i>
                                                                            </button>
                                                                            </td>
                                                                        </tr>)
                                                                    )
                                                                }
                                                                )
                                                            }
                                                        </tbody>
                                                            : 
                                                            <div className="card-body">No Notes Found.</div>
                                                }
                                            </table>
                                        </div>
                                        {
                                            chunkedData && chunkedData.length > 0 ? 
                                            <div className="text-right p-3 view-more">
                                            {
                                                viewAll ? /* eslint-disable-next-line  */
                                                <a className="btn btn-orange btn-sm" href="javascript:void(0);" onClick={() => setViewAll(false)}>
                                                    Hide
                                                </a> : /* eslint-disable-next-line  */
                                                <a className="btn btn-orange btn-sm" href="javascript:void(0);" onClick={() => setViewAll(true)}>
                                                    View More
                                                    </a>
                                            }
                                            </div> : ""
                                        }
                                </>
                </div>
                </>
                :
                ""
            }

            <JAXModal
                heading={`Edit Rental Note`} 
                show={showeEditNote} 
                handleClose={() => setShowEditNote(false)}
            >
                <form onSubmit={handleEditSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control placeholder-dark"
                                    placeholder="Note"
                                    name="notes"
                                    onChange={(e) => handleForm(e)}
                                    value={form.notes}
                                />
                                <span style={{ color: "red", fontSize: '10px' }}>
                                    {errors && Array.isArray(errors)
                                        ? errors.map((error: any) => {
                                            return error.notes;
                                        })
                                        : ""}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control placeholder-dark"
                                    placeholder="Author"
                                    disabled={true}
                                    name="author"
                                    value={form.author}
                                    onChange={(e) => handleForm(e)}
                                />
                                <span style={{ color: "red", fontSize: '10px' }}>
                                    {errors && Array.isArray(errors)
                                        ? errors.map((error: any) => {
                                            return error.author;
                                        })
                                        : ""}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group text-right">
                                <button className="btn btn-orange" type="submit">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </JAXModal>

            <JAXModal
                heading={`Add Rental Note`} 
                show={showAddNote} 
                handleClose={() => setShowAddNote(false)}
            >
                <form onSubmit={handleSubmit}>
                    <div className="row">
                         <div className="col-md-6">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control placeholder-dark"
                                    placeholder="Note"
                                    name="notes"
                                    onChange={(e) => handleForm(e)}
                                    value={form.notes}
                                />
                                <span style={{ color: "red", fontSize: '10px' }}>
                                    {errors && Array.isArray(errors)
                                        ? errors.map((error: any) => {
                                            return error.notes;
                                        })
                                        : ""}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control placeholder-dark"
                                    placeholder="Author"
                                    disabled={true}
                                    name="author"
                                    value={form.author}
                                    onChange={(e) => handleForm(e)}
                                />
                                <span style={{ color: "red", fontSize: '10px' }}>
                                    {errors && Array.isArray(errors)
                                        ? errors.map((error: any) => {
                                            return error.author;
                                        })
                                        : ""}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group text-right">
                                <button className="btn btn-orange" type="submit">
                                    Save
                                </button>
                            </div>
                        </div> 
                    </div>
                </form>
            </JAXModal>
        </section>
    )
}

export default VehicleCurrentRental