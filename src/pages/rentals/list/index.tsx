import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Layout from "../../../shared/components/layout/layout";
import DatePicker from "react-datepicker";
import { fetchRentals } from "../../../store/rentals/action";
import { StoreInterface } from "../../../store/index";
import { Rental, RentalsPage } from "../../../store/rentals/model";
import Pagination from "../../../shared/components/pagination/pagination";
import { convertTime12to24, exportData } from "../../../utils";
import { RentalsExportHeader, RentalStatus } from "../../../shared/models/index";
import Sorter from "../../../shared/components/sorting/sorter";
import axios from '../../../Api';
var moment = require('moment-timezone');

const Rentals = () => {
  const dispatch = useDispatch();
  const pageInfo: RentalsPage = useSelector(
    (state: StoreInterface) => state.rentalsPage
  );

  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pickStartDate, setPickStartDate] = useState<Date | null>(null);
  const [pickEndDate, setPickEndDate] = useState<Date | null>(null);
  const [returnStartDate, setReturnStartDate] = useState<Date | null>(null);
  const [returnEndDate, setReturnEndDate] = useState<Date | null>(null);
  const [rentalNumber, setRentalNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [isFilterReset, setIsFilterReset] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [sortType, setSortType] = useState('DESC');
  const [sortBy, setSortBy] = useState('r.createdAt');
  const [filters, setFilters] = useState<any>(null);
  const [filterError, setFilterError] = useState<
    Array<{
      [key: string]: string;
    }>
  >([]);
  useEffect(() => {
    dispatch(fetchRentals(pageSize, pageNumber, { sortBy, sortType }));
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    searchRentals(pageNumber, pageSize);
    // eslint-disable-next-line
  }, [sortBy, sortType]);
  
  useEffect(() => {
    isFilterReset && searchRentals(0, pageSize);
    setIsFilterReset(false);
    // eslint-disable-next-line
  }, [isFilterReset]);

  const filterAction = () => {
    let valid = true;
    var filterErr = [];
    if (pickStartDate && !pickEndDate) {
      filterErr.push({
        pickup: "Please select end date",
      });
      valid = false;
    }
    if (returnStartDate && !returnEndDate) {
      filterErr.push({
        return: "Please select end date",
      });
      valid = false;
    }
    if (!valid) {
      setFilterError(filterErr);
      return false;
    }
    setPageNumber(0);
    searchRentals(0, pageSize);
  };

  const changePage = (page_no: number) => {
    setPageNumber(page_no);
    searchRentals(page_no, pageSize);
  };

  const changePageSize = (page_size: number) => {
    setPageSize(page_size);
    searchRentals(pageNumber, page_size);
  };
  const handleExport = async () => {
    let ids: number[] = []
    pageInfo.rentalsList && pageInfo.rentalsList.map((rental: Rental) => rental.id ? ids.push(rental.id) : "")
    try {
      const response = await axios.post('/api/v1/export/rental', {
        filters
      })
      exportData(
        response.data.data,
        "Rentals-" + moment().format("MMMM-Do-YYYY-HH-mm") + ".xlsx",
        RentalsExportHeader,
        'rentals'
      ); 
    } catch(err) {
      
    }
  };
  const searchRentals = (page: number, size: number) => {
    const searchObject: any = {};
    if (vehicleNumber) {
      searchObject.vehicleNumber = vehicleNumber;
    }
    if (status) {
      searchObject.status = status;
    }
    if (rentalNumber) {
      searchObject.rentalNumber = rentalNumber;
    }
    if (firstName) {
      searchObject.firstName = firstName;
    }
    if (lastName) {
      searchObject.lastName = lastName;
    }

    if (pickStartDate) {
      searchObject.pickupStartDate = pickStartDate;
    }

    if (pickEndDate) {
      if (moment(pickStartDate).isSame(moment(pickEndDate))) {
        searchObject.pickupEndDate = moment(pickEndDate).add(24, "hours");
      } else {
        searchObject.pickupEndDate = pickEndDate;
      }
    }

    if (returnStartDate) {
      searchObject.returnStartDate = returnStartDate;
    }

    if (returnEndDate) {
      if (moment(returnStartDate).isSame(moment(returnEndDate))) {
        searchObject.returnEndDate = moment(returnEndDate).add(24, "hours");
      } else {
        searchObject.returnEndDate = returnEndDate;
      }
    }
    setFilters(searchObject)
    dispatch(fetchRentals(size, page, { ...searchObject, sortBy, sortType }));
  };

  const changeDate = (dates: [Date | null, Date | null], isPickup: boolean) => {
    const [start, end] = dates;
    if (isPickup) {
      setPickStartDate(start);
      setPickEndDate(end);
      if (end) {
        filterError.splice(filterError.findIndex((e) => e.pickup));
      }
    } else {
      setReturnStartDate(start);
      setReturnEndDate(end);
      if (end) {
        filterError.splice(filterError.findIndex((e) => e.return));
      }
    }
  };

  const resetFilter = async () => {
    setRentalNumber("");
    setFirstName("");
    setLastName("");
    setStatus("");
    setVehicleNumber("");
    setPageNumber(0);
    setIsFilterReset(true);
    setPickStartDate(null);
    setPickEndDate(null);
    setReturnStartDate(null);
    setReturnEndDate(null);
  };
  const convertedDateTime = (rental: Rental, utcDate: any, utcTime: any) => {
    if(utcDate && utcTime){
      const date: any = utcDate;
      const hours24 = convertTime12to24(utcTime)
      const fullDate = `${date.split('-')[2]}-${date.split('-')[1]}-${date.split('-')[0]} ${hours24}`
      let tz = ""
      if(rental?.city?.toLowerCase() === "atlanta") {
        tz = "America/New_York"
      }
      if(rental?.city?.toLowerCase() === "dallas") {
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
      // if(rental.rentalNumber && rental.rentalNumber === "JAXRENTAL144") {
      //   console.log(fullDate)
      //   console.log(tz)
      //   console.log(moment.utc(fullDate).tz(tz).format('hh:mm A'))
      //   console.log(moment.tz.guess())
      // }
      return `${formattedDate} | ${time}`
    }
  }
  return (
    <>
      <Layout>
        <section className="content-body">
          <header className="page-header">
            <div className="page_title">
              <h2>Rentals</h2>
            </div>
          </header>

          <div className="page_content">
            <div className="white-box">
              <section className="card mb20">
                <header className="card-header card-head-icon">
                  <h2 className="card-title">Filter</h2>
                  <div className="card-head-actions">
                    <span
                      className="btn arrow-circle-up"
                      onClick={() => setShowFilter(!showFilter)}
                    >
                      {showFilter ? (
                        <i className="fa fa-chevron-up" aria-hidden="true"></i>
                      ) : (
                        <i
                          className="fa fa-chevron-down"
                          aria-hidden="true"
                        ></i>
                      )}
                    </span>
                  </div>
                </header>
                {showFilter ? (
                  <div className="card-body">
                    <div className="row row-column-5">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Vehicle Number</label>
                          <input
                            type="text"
                            className="form-control"
                            name="vehicleNumber"
                            value={vehicleNumber}
                            onChange={(e) => setVehicleNumber(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                        <label className="date-label">Pickup Date
                          <div className="calendar-input">
                            <DatePicker
                              startDate={pickStartDate}
                              endDate={pickEndDate}
                              selectsRange
                              dateFormat="MM/dd/yyyy"
                              className="form-control"
                              selected={pickStartDate}
                                onChange={ ( dates ) => changeDate( dates, true ) }
                                showYearDropdown
                                showMonthDropdown
                                scrollableYearDropdown
                                yearDropdownItemNumber={ 100 }
                                useShortMonthInDropdown
                            />
                            <span className="btn calendar-btn">
                              <i className="fa fa-calendar" aria-hidden="true"></i>
                            </span>
                            </div>
                            </label>
                          <span style={{ color: "red", fontSize: '10px' }}>
                            {filterError && Array.isArray(filterError)
                              ? filterError.map((error: any) => {
                                  return error.pickup;
                                })
                              : ""}
                          </span>
                        </div>
                        
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                        <label className="date-label">Return Date
                          <div className="calendar-input">
                            <DatePicker
                              startDate={returnStartDate}
                              endDate={returnEndDate}
                              selectsRange
                              dateFormat="MM/dd/yyyy"
                              className="form-control"
                              selected={returnStartDate}
                              onChange={ ( dates ) => changeDate( dates, false ) }
                              showYearDropdown
                              showMonthDropdown
                              scrollableYearDropdown
                              yearDropdownItemNumber={ 100 }
                              useShortMonthInDropdown
                            />
                            <span className="btn calendar-btn">
                              <i className="fa fa-calendar" aria-hidden="true"></i>
                            </span>
                            </div>
                            </label>
                          <span style={{ color: "red", fontSize: '10px' }}>
                            {filterError && Array.isArray(filterError)
                              ? filterError.map((error: any) => {
                                  return error.return;
                                })
                              : ""}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Status</label>
                          <select
                            className="form-control"
                            name="status"
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            <option value={ "" } selected={ status === '' }>All</option>
                            {Object.keys(RentalStatus).map((key: string) => {
                              return (
                                <>
                                  <option value={key} selected={status ===key}>
                                    {(RentalStatus as any)[key]}
                                  </option>
                                </>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Renter First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Renter Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Rental Number</label>
                          <input
                            type="text"
                            className="form-control"
                            name="rentalNumber"
                            value={rentalNumber}
                            onChange={(e) => setRentalNumber(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-action text-right mt-2 mb-2">
                          <button
                            className="btn btn-orange mr-1"
                            type="submit"
                            onClick={(e) => filterAction()}
                          >
                            Filter
                          </button>
                          <button
                            className="btn btn-orange"
                            type="reset"
                            onClick={resetFilter}
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </section>
              <section className="card mb20">
                <div className="card-body pb-0">
                  <div className="table-head">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h3 className="mb-0">Rental Details</h3>
                      </div>
                      <div className="col-md-6">
                        <div className="head-page-action">
                          <div className="page-size">
                            <label>Page Size</label>
                            <select
                              className="form-control"
                              onChange={(e) =>
                                changePageSize(Number(e.target.value))
                              }
                            >
                              <option selected={pageSize === 5 ? true : false}>
                                5
                              </option>
                              <option selected={pageSize === 10 ? true : false}>
                                10
                              </option>
                              <option selected={pageSize === 20 ? true : false}>
                                20
                              </option>
                              <option selected={pageSize === 50 ? true : false}>
                                50
                              </option>
                            </select>
                          </div>
                          <div className="export-btn ml-2">
                            <button
                              className="btn btn-orange"
                              onClick={handleExport}
                            >
                              <img
                                className="mr-1"
                                src="static/images/icon-excel.png"
                                alt=""
                              />
                              Export to Excel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="jax-table-outer ml-1rem mr-1rem">
                    <div className="table-responsive jax-table">
                      <table className="table mb-0 table-striped">
                        <thead>
                          <tr>
                            <th style={{ width: "10%" }} onClick={()=>{ setSortBy('rentalNumber'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>Rental No.
                            <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'rentalNumber'} />
                            </th>
                            <th style={{ width: "15%" }} onClick={()=>{setSortBy('make'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC');}}>Vehicle
                            <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'make'} /></th>
                            <th style={{ width: "12%" }} onClick={()=>{setSortBy('number');setSortType( sortType === 'ASC' ? 'DESC' : 'ASC');}}>Vehicle No.
                            <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'number'} /></th>
                            <th style={{ width: "13%" }} onClick={()=>{ setSortBy('firstName'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                              Renter Name
                              <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'firstName'} />
                            </th>
                            <th style={{ width: "16%" }} onClick={()=>{ setSortBy('returnAt'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                              Booked Date &amp; Time
                              <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'returnAt'} />
                            </th>
                            <th style={{ width: "16%" }} onClick={()=>{ setSortBy('pickupAt'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                              Pickup Date &amp; Time
                              <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'pickupAt'} />
                            </th>
                            <th style={{ width: "16%" }} onClick={()=>{ setSortBy('returnAt'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                              Return Date &amp; Time
                              <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'returnAt'} />
                            </th>
                            <th style={{ width: "13%" }} onClick={()=>{ setSortBy('status'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                              Status
                              <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'status'} />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {pageInfo &&
                            pageInfo?.rentalsList?.map((rental) => {
                              return (
                                <>
                                  <tr>
                                    <td>
                                      <a
                                        className="text-primary"
                                        href={`/rental-details/${rental.id}`}
                                      >
                                        {rental.rentalNumber}
                                      </a>
                                    </td>
                                    <td>
                                      {moment(rental.year).format("YYYY") +
                                        " " +
                                        rental.make +
                                        " " +
                                        rental.model}
                                    </td>
                                    <td>{rental.number}</td>
                                    <td>
                                      {rental.firstName + " " + rental.lastName}
                                    </td>
                                    <td>
                                      {
                                        rental.bookedDate && rental.bookedSlot &&
                                        convertedDateTime(rental, rental.bookedDate, rental.bookedSlot)
                                        // moment(rental.bookedDate, 'DD-MM-YYYY').format("LL") +
                                        // " | " +
                                        // rental.bookedSlot
                                      } 
                                    </td>
                                    <td>
                                      {convertedDateTime(rental, rental.formattedPickDate, rental.pickupTime)
                                      // moment(rental.formattedPickDate, 'DD-MM-YYYY').format("LL") +
                                      //   " | " +
                                      //   rental.slot
                                      }
                                    </td>
                                    <td>
                                      {convertedDateTime(rental, rental.formattedReturnDate, rental.returnTime)
                                      // moment(rental.formattedReturnDate, 'DD-MM-YYYY').format("LL") +
                                      //   " | " +
                                      //   rental.slot
                                      }
                                    </td>
                                    <td>
                                        {(RentalStatus as any)[rental.status]}
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>
              <div className="table-paging">
                <Pagination
                  totalItems={pageInfo?.count || 5}
                  totalPageSize={pageSize}
                  pageNumber={pageNumber}
                  changePageNumber={(page) => changePage(page)}
                />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Rentals;
