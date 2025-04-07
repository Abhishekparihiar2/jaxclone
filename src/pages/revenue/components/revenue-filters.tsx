import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import MultiRangeSlider from "../../../shared/components/multi-range-slider/multi-range-slider";
import { revenueFilter } from "../revenue";

const RevenueFilter = ({
  filterError,
  pageSize,
  form,
  setForm,
  setPageNumber,
  setFilterError,
  revenueSearch,
  handleDateChange,
  handleRangeInput
}: {
  filterError: { [key: string]: string } | null;
  pageSize: number;
  form: revenueFilter;
  setForm: React.Dispatch<React.SetStateAction<revenueFilter>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setFilterError: React.Dispatch<React.SetStateAction<{ [key: string]: string } | null>>;
  revenueSearch: (page: number, size: number) => void;
  handleDateChange: (s: Date | null, e: Date | null) => void;
  handleRangeInput: (minFieldName:string, minFieldValue:number, maxFieldName:string, maxFieldValue:number) => void;
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [isFilterReset, setIsFilterReset] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const changeDate = async ([start, end]: [
    start: Date | null,
    end: Date | null
  ]) => {
    if (end) {
      setFilterError(null);
    }
    setStartDate(start);
    setEndDate(end);
  };

  const resetFilter = () => {
    setForm({
      startDateFilter: null,
      endDateFilter: null,
      vehicleNumberFilter: '',
      rentalNumber: '',
      firstName: '',
      lastName: '',
      maxAmmount: 100000,
      minAmmount: 0
    });
    setStartDate(null);
    setEndDate(null);
    setFilterError(null);
    setIsFilterReset(true);
  }

  useEffect(() => {
    setPageNumber(0);
    isFilterReset && revenueSearch(0, pageSize);
    setIsFilterReset(false);
    // eslint-disable-next-line
  }, [isFilterReset]);

  useEffect(() => {
    handleDateChange(startDate, endDate);
    // eslint-disable-next-line
  }, [startDate, endDate]);

  return (
    <section className="card mb20">
      <header className="card-header">
        <div className="card-head-actions">
          <span className="btn arrow-circle-up" onClick={() => setShowFilter(!showFilter)}>
            <i className={`fa ${showFilter ? 'fa-chevron-up' : 'fa-chevron-down'}`} aria-hidden="true"></i>
          </span>
        </div>
      </header>
      {showFilter && <div className="card-body">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="form-group">
              <label>Rental Number</label>
              <input
                name="rentalNumber"
                type="text"
                className="form-control"
                value={form.rentalNumber}
                onChange={e => setForm({ ...form, rentalNumber: e.target.value })}
                placeholder=""
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="form-group">
              <label>Vehicle Number</label>
              <input
                name="vehicleNumberFilter"
                type="text"
                className="form-control"
                value={form.vehicleNumberFilter}
                onChange={e => setForm({ ...form, vehicleNumberFilter: e.target.value })}
                placeholder=""
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="form-group">
              <label>Customer First Name</label>
              <input
                name="firstName"
                type="text"
                className="form-control"
                value={form.firstName}
                onChange={e => setForm({ ...form, firstName: e.target.value })}
                placeholder=""
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="form-group">
              <label>Customer Last Name</label>
              <input
                name="lastName"
                type="text"
                className="form-control"
                value={form.lastName}
                onChange={e => setForm({ ...form, lastName: e.target.value })}
                placeholder=""
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="form-group">
            <label className="date-label">Payment Date
              <div className="calendar-input">
                <DatePicker
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  dateFormat="MM/dd/yyyy"
                  className="form-control"
                  onChange={ ( dates ) => changeDate( dates ) }
                  showYearDropdown
                  showMonthDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={ 100 }
                  useShortMonthInDropdown
                  />
                  <span className="btn calendar-btn">
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                  </span>
                  <span style={{ color: "red", fontSize: '10px' }}>
                    {filterError && filterError['date'] 
                      ? filterError['date'] : ""}
                  </span>
                </div>
                </label>
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="form-group">
              <label>Amount</label>
              <div className="range-slider">$0 - $1,00000</div>
              <MultiRangeSlider
                  min={ 0 }
                  max={ 100000 }
                  minVal={ form.minAmmount}
                  maxVal={ form.maxAmmount}
                  onChange={ ( min: number, max: number ) => handleRangeInput( 'minAmmount', min, 'maxAmmount', max ) } />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-action text-right mt-2 mb-2">
              <button className="btn btn-orange mr-1" type="submit" onClick={()=>revenueSearch(0,pageSize)}>
                Filter
              </button>
              <button className="btn btn-orange" type="submit" onClick={()=>resetFilter()}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>}
    </section>
  );
};

export default RevenueFilter;
