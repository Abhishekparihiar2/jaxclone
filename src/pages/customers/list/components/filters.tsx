import React, { FC, useState } from "react";
import { UserFilters } from "../../../../store/customers/model";
import DatePicker from "react-datepicker";
import CustomDropdown from "../../../../shared/components/custom-dropdown/custom-dropdown"
import { DROP_DOWN_TYPES } from "../../../../shared/models"
import MultiRangeSlider from "../../../../shared/components/multi-range-slider/multi-range-slider";
import {RentalStatus, BackgroundChecksStatus} from "../../../../shared/models"
import { formatDate } from '../../../../utils/index';

type FiltersInterface = {
  filters: UserFilters;
  onResetFilters: () => void;
  onFilterResults: () => void;
  onUpdateFilters: ( userFilters: UserFilters ) => void;
};

const Filters: FC<FiltersInterface> = ( props: FiltersInterface ) =>
{
  const { filters, onResetFilters, onFilterResults, onUpdateFilters } = props;
  const [ expandFilters, setExpandFilters ] = useState<boolean>( false );
  const [ startDate, setStartDate ] = useState( null );
  const [ endDate, setEndDate ] = useState( null );

  const handleResetFilters = () =>
  {
    setStartDate(null);
    setEndDate(null);
    onResetFilters();
  };
  const handleFilterResults = () =>
  {
    onFilterResults();
  };

  const handleUpdateFilters = ( name: string, value: any ) =>
  {
    onUpdateFilters( new UserFilters( { ...filters, [ name ]: value && value.length > 0 ? value : null } ) );
  };

  const handleUpdateRangeFilters = ( minFieldName: string, minFieldValue: number, maxFieldName: string, maxFieldValue: number ) =>
  {
    onUpdateFilters( new UserFilters( { ...filters, [ minFieldName ]: minFieldValue, [maxFieldName]:maxFieldValue } ) );
  };

  const onChange = ( dates: any ) =>
  {
    const [ start, end ] = dates;
    setStartDate( start );
    setEndDate( end );
    onUpdateFilters( new UserFilters( 
      { 
        ...filters, 
        startDob: formatDate(start), 
        endDob: formatDate(end) 
      } ) );
  };
  return (
    <>
      <section className="card mb20">
        <header className="card-header card-head-icon">
          <div className="card-head-actions">
            { expandFilters ? (
              <span
                className="btn arrow-circle-up"
                onClick={ () => setExpandFilters( false ) }
              >
                <i className="fa fa-chevron-up" aria-hidden="true"></i>
              </span>
            ) : (
              <span
                className="btn arrow-circle-up"
                onClick={ () => setExpandFilters( true ) }
              >
                <i className="fa fa-chevron-down" aria-hidden="true"></i>
              </span>
            ) }
          </div>
        </header>
        <div
          className="card-body"
          style={ { display: expandFilters ? "block" : "none" } }
        >
          <div className="row row-column-5">
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="firstName"
                  value={ filters.firstName ? filters.firstName : "" }
                  onChange={ ( e ) =>
                    handleUpdateFilters( e.target.name, e.target.value )
                  }
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="lastName"
                  value={ filters.lastName ? filters.lastName : "" }
                  onChange={ ( e ) =>
                    handleUpdateFilters( e.target.name, e.target.value )
                  }
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>Nickname</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="nickname"
                  value={ filters.nickname ? filters.nickname : "" }
                  onChange={ ( e ) =>
                    handleUpdateFilters( e.target.name, e.target.value )
                  }
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="email"
                  value={ filters.email ? filters.email : "" }
                  onChange={ ( e ) =>
                    handleUpdateFilters( e.target.name, e.target.value )
                  }
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="phoneNumber"
                  value={ filters.phoneNumber ? filters.phoneNumber : "" }
                  onChange={ ( e ) =>
                    handleUpdateFilters( e.target.name, e.target.value )
                  }
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="city"
                  value={ filters.city ? filters.city : "" }
                  onChange={ ( e ) =>
                    handleUpdateFilters( e.target.name, e.target.value )
                  }
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>State</label>
                <CustomDropdown
                  type={ DROP_DOWN_TYPES.STATE.toString() }
                  name={ "state" }
                  allowEdit={ false }
                  value={ filters?.state ? filters.state : "" }
                  placeholder={ "Choose a state..." }
                  onChange={ ( name, value ) =>
                  {
                    handleUpdateFilters(
                      "state",
                      value
                    );
                  } }
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>DL Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="dlno"
                  value={ filters.dlno ? filters.dlno : "" }
                  onChange={ ( e ) =>
                    handleUpdateFilters( e.target.name, e.target.value )
                  }
                />
              </div>
            </div>

            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>BG Check Status</label>
                <select
                  className="form-control"
                  name="digiSureStatus"
                  value={ filters.digiSureStatus ? filters.digiSureStatus : "" }
                  onChange={ ( e ) =>
                    handleUpdateFilters( e.target.name, e.target.value )
                  }
                >
                <option value={ "" } selected={ filters.digiSureStatus === '' }>All</option>
                {Object.keys(BackgroundChecksStatus).map((key: string) => {
                  return (
                    <>
                      <option value={key} selected={filters.digiSureStatus ===key}>
                        {(BackgroundChecksStatus as any)[key]}
                      </option>
                    </>
                  );
                })}

                </select>
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>Card Number (Last Four Digits)</label>
                <input type="text" name="last4" value={ filters.last4 ? filters.last4 : "" } className="form-control" onChange={ ( e ) =>
                    handleUpdateFilters( e.target.name, e.target.value )
                  } placeholder="" />
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
              <label className="date-label date-new-label">Date of Birth</label>
              <div className="calendar-input">
                  <DatePicker
                    dateFormat="MM/dd/yyyy"
                    className="form-control placeholder-dark"
                    selected={ startDate }
                    startDate={ startDate }
                    endDate={ endDate }
                    onChange={onChange}
                    showYearDropdown
                    showMonthDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={ 100 }
                    useShortMonthInDropdown
                    selectsRange
                    maxDate={ new Date() }
                    />
                    <span className="btn calendar-btn">
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                </span>
                  </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>Rental Status</label>
                <select className="form-control"
                  name="rentalStatus"
                  value={ filters.rentalStatus }
                  onChange={ ( e ) =>
                    handleUpdateFilters( e.target.name, e.target.value )
                  }>
                <option value={ "" } selected={ filters.rentalStatus === '' }>All</option>
                {Object.keys(RentalStatus).map((key: string) => {
                  return (
                    <>
                      <option value={key} selected={filters.rentalStatus ===key}>
                        {(RentalStatus as any)[key]}
                      </option>
                    </>
                  );
                })}
                </select>
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>Total Rental Days</label>
                <div className="range-slider">0 - 365+</div>
                <MultiRangeSlider
                  min={ 0 }
                  max={ 365 }
                  minVal={ filters.minTotalRentalDays}
                  maxVal={ filters.maxTotalRentalDays }
                  onChange={ ( min: number, max: number ) => handleUpdateRangeFilters( 'minTotalRentalDays', min, 'maxTotalRentalDays', max ) } />
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>Total Rental Revenue</label>
                <div className="range-slider">$0 - $25,000</div>
                <MultiRangeSlider
                  min={ 0 }
                  max={ 25000 }
                  minVal={ filters.minTotalRevenue}
                  maxVal={ filters.maxTotalRevenue }
                  onChange={ ( min: number, max: number ) => handleUpdateRangeFilters( 'minTotalRevenue', min, 'maxTotalRevenue', max ) } />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-action text-right mt-2 mb-2">
                <button
                  className="btn btn-orange mr-1"
                  type="submit"
                  onClick={ handleFilterResults }
                >
                  Filter
                </button>
                <button
                  className="btn btn-orange"
                  type="submit"
                  onClick={ handleResetFilters }
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Filters;
