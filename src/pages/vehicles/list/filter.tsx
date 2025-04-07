import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { VehilceFilterInterface } from "../interface";
import { VehicleStatus } from "../../../shared/models/index";
import CustomDropdown from "../../../shared/components/custom-dropdown/custom-dropdown";
import {
DROP_DOWN_TYPES
} from "../../../shared/models/index";
import MultiRangeSlider from "../../../shared/components/multi-range-slider/multi-range-slider"
import { useDispatch, useSelector } from "react-redux";
import { RootState, StoreInterface } from "../../../store";
import { fetchVehicleTypes } from "../../../store/vehicleTypes/action";
import Select from 'react-select'
import { DropdownValuesState } from '../../../store/dropdownValues/model';

const VehicleFilter = ({
  handleYears,
  filters,
  handleFilters,
  handleRangeInput,
  handlePurchaseFilters,
  // handleYearFilters,
  handleDropDown,
  search,
  reset,
  setExpandFilters,
  expandFilters,
}: VehilceFilterInterface) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const dispatch = useDispatch();
  const vehicleTypes = useSelector((state: RootState) => state.vehicleTypesValues.vehicleTypes);
  const dropdownValues: DropdownValuesState = useSelector(
    ( state: StoreInterface ) => state.dropdownValues
  );
  useEffect(() => {
      dispatch(fetchVehicleTypes());
      // eslint-disable-next-line
  }, []);
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const onChangeYear = (dates: any) => {
    const [start, end] = dates;
    setStartYear(start);
    setEndYear(end);
  };
  useEffect(() => {
    const range = {
      start: startDate,
      end: endDate,
    };
    handlePurchaseFilters(range);
    // eslint-disable-next-line
  }, [startDate, endDate]);

  useEffect(() => {
    if(startYear && endYear) {
      const range = {
        start: new Date(startYear).getFullYear(),
        end: new Date(endYear).getFullYear(),
      };
      handleYears(range);
    }
    // eslint-disable-next-line
  }, [startYear, endYear]);


  const resetHandler = () => {
    setStartDate(null);
    setEndDate(null);
    setStartYear(null);
    setEndYear(null);
    reset();
  };
  const options = (type: string | null, listItems?: any) => {
    let selectOptions: any = []
    if(type !== 'type' && type !== 'status') {
      const list = dropdownValues?.dropdownValues?.length
      ? dropdownValues.dropdownValues.filter( ( item ) => item.type === type ).sort((item, itemB)=>(item.title.toUpperCase() < itemB.title.toUpperCase()) ? -1 : (item.title.toUpperCase() > itemB.title.toUpperCase()) ? 1 : 0)
      : [];
      selectOptions = list.map((item) => ({value: item.title, label: item.title}))  
    } else {
      if(type === 'type')
        selectOptions = listItems.map((key: any) => ({value: key, label: vehicleTypes[key]}))  
      else  
        selectOptions = listItems.map((key: any) => ({value: key, label: (VehicleStatus as any)[key]}))  
    }
    return selectOptions  
  }

  const changeSelect = (name:string, selection: any) => {
    console.log(selection)
    handleDropDown(name, selection)
  }
  return (
    <>
      <section className="card mb20">
        <header className="card-header card-head-icon">
          <div className="card-head-actions-left">
            <Link className="btn btn-orange btn-sm" to="/add-vehicles">
              <i className="fa fa-plus mr-1" aria-hidden="true"></i>
              Add New Vehicle
            </Link>
          </div>
          <div className="card-head-actions card-head-arrow">
            {expandFilters ? (
              <span
                className="btn arrow-circle-up"
                onClick={() => setExpandFilters(false)}
              >
                <i className="fa fa-chevron-up" aria-hidden="true"></i>
              </span>
            ) : (
              <span
                className="btn arrow-circle-up"
                onClick={() => setExpandFilters(true)}
              >
                <i className="fa fa-chevron-down" aria-hidden="true"></i>
              </span>
            )}
          </div>
        </header>
        <div
          className="card-body"
          style={{ display: expandFilters ? "block" : "none" }}
        >
          <div className="row row-column-5">
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>Vehicle Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Vehicle Number"
                  name="vehicleNumber"
                  autoComplete="off"
                  value={
                    filters.vehicleNumber ? filters.vehicleNumber : ""
                  }
                  onChange={(e) => handleFilters(e)}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>VIN</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Vehicle VIN"
                  name="vin"
                  autoComplete="off"
                  value={filters.vin ? filters.vin : ""}
                  onChange={(e) => handleFilters(e)}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>Tag Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="tag"
                  value={filters.tag ? filters.tag : undefined}
                  onChange={(e) => handleFilters(e)}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>Make</label>

                {/* <CustomDropdown
                  type={DROP_DOWN_TYPES.VEHICLE_MAKE.toString()}
                  name={"make"}

                  allowEdit={false}
                  value={filters.make ? filters.make : ""}
                  placeholder={"Choose a Vehicle Make..."}
                  onChange={(name, value) => {
                    handleDropDown(
                      "make",
                      value
                    );
                  }}
                /> */}
                <Select 
                  options={options(DROP_DOWN_TYPES.VEHICLE_MAKE.toString())}
                  value={filters.make ? filters.make : []}
                  classNamePrefix={"multi-select"}
                  onChange={(selection: any) => changeSelect('make', selection)}
                  isMulti={true}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>Model</label>

                {/* <CustomDropdown
                  type={DROP_DOWN_TYPES.VEHICLE_MODEL.toString()}
                  name={"model"}
                  allowEdit={false}
                  value={filters?.model ? filters.model : ""}
                  placeholder={"Choose a Vehicle Model..."}
                  onChange={(name, value) => {
                    handleDropDown(
                      "model",
                      value
                    );
                  }}
                /> */}
                <Select 
                  options={options(DROP_DOWN_TYPES.VEHICLE_MODEL.toString())}
                  value={filters.model ? filters.model : []}
                  classNamePrefix={"multi-select"}
                  onChange={(selection: any) => changeSelect('model', selection)}
                  isMulti={true}
                />
              </div>
            </div>
            {/* <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label className="date-label">Year
                <div className="calendar-input">
                <DatePicker
                  selected={filters.year ? new Date(filters.year) : null}
                  className="form-control"
                  onChange={(date: Date) => handleYearFilters(date, "year")}
                  startDate={startDate}
                  endDate={endDate}
                  showYearPicker
                  dateFormat="yyyy"
                    />
                  <span className="btn calendar-btn">
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                  </span>
                  </div>
                  </label>
              </div>
            </div> */}
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label className="date-label">Year
                <div className="calendar-input">
                <DatePicker
                  selected={startYear}
                  className="form-control"
                  onChange={onChangeYear}
                  startDate={startYear}
                  endDate={endYear}
                  showYearPicker
                  selectsRange
                  dateFormat="yyyy"
                    />
                  <span className="btn calendar-btn">
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                  </span>
                  </div>
                  </label>
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>Vehicle Type</label>
                <Select 
                  options={options('type', Object.keys(vehicleTypes || {}))}
                  value={filters.type ? filters.type : []}
                  classNamePrefix={"multi-select"}
                  onChange={(selection: any) => changeSelect('type', selection)}
                  isMulti={true}
                />
                {/* <select
                  className="form-control"
                  name="type"
                  onChange={(e) => handleFilters(e)}
                >
                  <option value="" selected={filters.type === ''}>All</option>
                  {Object.keys(vehicleTypes || {})?.map((key: any) => {
                    return (
                      <>
                        <option value={key} selected={filters.type === key}>
                          {vehicleTypes[key]}
                        </option>
                      </>
                    );
                  }
                  )}
                </select> */}

              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>Vehicle Status</label>
                <Select 
                  options={options('status', Object.keys(VehicleStatus))}
                  value={filters.status ? filters.status : []}
                  classNamePrefix={"multi-select"}
                  onChange={(selection: any) => changeSelect('status', selection)}
                  isMulti={true}
                />
                {/* <select
                  className="form-control"
                  name="status"
                  onChange={(e) => handleFilters(e)}
                >
                  <option value="" selected={filters.status === ''}>All</option>
                  {Object.keys(VehicleStatus).map((key: string) => {
                    return (
                      <>
                        <option value={key} selected={filters.status === key}>
                          {(VehicleStatus as any)[key]}
                        </option>
                      </>
                    );
                  })}
                </select> */}
              </div>
            </div>

            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>Customer Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  name="customer"
                  value={filters.customer ? filters.customer : undefined}
                  onChange={(e) => handleFilters(e)}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
              <label className="date-label">Purchase Date
                <div className="calendar-input">
                  <DatePicker
                    className="form-control"
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="MM/dd/yyyy"
                    selectsRange
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
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>Odometer</label>
                <div className="range-slider">0 Miles - 5,000,000 Miles</div>
                <MultiRangeSlider
                  min={0}
                  max={5000000}
                  minVal={filters.minOdometer}
                  maxVal={filters.maxOdometer}
                  onChange={(min: number, max: number) => handleRangeInput('minOdometer', min, 'maxOdometer', max)} />
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>Minimum Daily Rate</label>
                <div className="range-slider">$0 - $150+</div>
                <MultiRangeSlider
                  min={0}
                  max={150}
                  minVal={filters.minDailyRate}
                  maxVal={filters.maxDailyRate}
                  onChange={(min: number, max: number) => handleRangeInput('minDailyRate', min, 'maxDailyRate', max)} />
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>Minimum Vehicle Cost</label>
                <div className="range-slider">$0 - $25,000</div>
                <MultiRangeSlider
                  min={0}
                  max={25000}
                  minVal={filters.minVehicleCost}
                  maxVal={filters.maxVehicleCost}
                  onChange={(min: number, max: number) => handleRangeInput('minVehicleCost', min, 'maxVehicleCost', max)} />

              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-action text-right mt-2 mb-2">
                <button
                  className="btn btn-orange mr-1"
                  type="submit"
                  onClick={search}
                >
                  Filter
                </button>
                <button
                  className="btn btn-orange"
                  type="submit"
                  onClick={resetHandler}
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

export default VehicleFilter;
