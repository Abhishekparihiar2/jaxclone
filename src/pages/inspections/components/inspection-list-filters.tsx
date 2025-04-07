import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import Api from "../../../Api";
import CustomDropdown from "../../../shared/components/custom-dropdown/custom-dropdown";
import { DROP_DOWN_TYPES, InspectionStatus } from "../../../shared/models";
import { fetchDropdownValues } from "../../../store/dropdownValues/action";
import { inspectionFilter } from "./inspection-list";

const InspectionListFilter = ({
  filterError,
  pageSize,
  form,
  setForm,
  setPageNumber,
  setFilterError,
  searchInspections,
  handleDateChange
}: {
  filterError: { [key: string]: string} | null;
  pageSize: number;
  form:  inspectionFilter;
  setForm: React.Dispatch<React.SetStateAction<inspectionFilter>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  setFilterError: React.Dispatch<React.SetStateAction<{ [key: string]: string} | null>>;
  searchInspections: (page: number, size: number) => void;
  handleDateChange: (s: Date | null, e: Date | null)=>void;
}) => {
  const [showFilter, setShowFilter]  = useState(false);
  const [isFilterReset, setIsFilterReset] = useState<boolean>(false);
  const [inspector, setInspectorData] = useState<any>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const dispatch = useDispatch();
  const changeDate = async ([ start, end ]: [
    start: Date | null,
    end: Date | null
  ]) => {
    if(end){
      setFilterError(null);
    }
    setStartDate(start);
    setEndDate(end);
  };

  const fetchInspector = async () => {
    const {data: inspector } = await Api.get("/api/v1/inspections/inspector/list");
    setInspectorData({ inspector: inspector.data});
  }

  const resetFilter = () => {
    setForm({
      startDateFilter: null,
      endDateFilter: null,
      vehicleNumberFilter: '',
      vinFilter: '',
      makeFilter: '',
      modelFilter: '',
      yearFilter: null,
      inspectorFilter: '',
      statusFilter: ''
    });
    setStartDate(null);
    setEndDate(null);
    setFilterError(null);
    setIsFilterReset(true);
  }

  useEffect(() => {
    setPageNumber(0);
    isFilterReset && searchInspections(0, pageSize);
    setIsFilterReset(false);
    // eslint-disable-next-line
  }, [isFilterReset]);

  useEffect(()=>{
    handleDateChange(startDate, endDate);
    // eslint-disable-next-line
  }, [startDate, endDate]);

  useEffect( () =>
  {
    dispatch( fetchDropdownValues( [
      DROP_DOWN_TYPES.VEHICLE_MAKE.toString(),
      DROP_DOWN_TYPES.VEHICLE_MODEL.toString()
    ] ) );
    // fetchVehicleVin();
    fetchInspector();
    // eslint-disable-next-line
  }, [] );

  return (
      <section className="card mb20">
        <header className="card-header">
          <div className="card-head-actions">
            <span className="btn arrow-circle-up" onClick={()=>setShowFilter(!showFilter)}>
              <i className={`fa ${showFilter ? 'fa-chevron-up' : 'fa-chevron-down'}`} aria-hidden="true"></i>
            </span>
          </div>
        </header>
        {showFilter && <div className="card-body">
          <div className="row row-column-5">
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
              <label className="date-label date-new-label">Date
                </label>
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
                  onChange={e=>setForm({ ...form, vehicleNumberFilter: e.target.value})}
                  placeholder=""
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
              <label>VIN</label>
              <input
                  name="vinFilter"
                  type="text"
                  className="form-control"
                  value={form.vinFilter}
                  onChange={e=>setForm({ ...form, vinFilter: e.target.value})}
                  placeholder=""
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>Make</label>
                <CustomDropdown
                  type={ DROP_DOWN_TYPES.VEHICLE_MAKE.toString() }
                  name={ "make" }
                  allowEdit={ false }
                  value={ form?.makeFilter ? form?.makeFilter : "" }
                  placeholder={ "Choose a make..." }
                  onChange={ ( name, value ) =>
                  {
                    setForm({ ...form, makeFilter: value})
                  } }
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>Model</label>
                <CustomDropdown
                  type={ DROP_DOWN_TYPES.VEHICLE_MODEL.toString() }
                  name={ "model" }
                  allowEdit={ false }
                  value={ form?.modelFilter ? form?.modelFilter : "" }
                  placeholder={ "Choose a model..." }
                  onChange={ ( name, value ) =>
                  {
                    setForm({ ...form, modelFilter: value})
                  } }
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
              <label className="date-label date-new-label">Year
              </label>
                <div className="calendar-input">
                <DatePicker
                  selected={form.yearFilter}
                  className="form-control"
                  onChange={(date: Date) => setForm({...form, yearFilter: date})}
                  showYearPicker
                  dateFormat="yyyy"
                  />
                  <span className="btn calendar-btn">
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                </span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>Inspector</label>
                <select name="inspectorFilter"  className="form-control" value={form.inspectorFilter}
                  onChange={e=>setForm({ ...form, inspectorFilter: e.target.value})}>
                  <option value={''}>All</option>
                  {inspector?.inspector && inspector.inspector.length > 0 && inspector.inspector.map((v: any)=><option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div className="col-lg-3 col-md-4">
              <div className="form-group">
                <label>Status</label>
                <select name="statusFilter" className="form-control" value={form.statusFilter}
                  onChange={e=>setForm({ ...form, statusFilter: e.target.value})}>
                  <option value={''}>All</option>
                  {Object.keys(InspectionStatus).map((key: string) => {
                    return (
                      <>
                        <option value={key}>
                          {(InspectionStatus as any)[key]}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-action text-right mt-2 mb-2">
                <button
                  className="btn btn-orange mr-1"
                  type="submit"
                  onClick={()=>searchInspections(0,pageSize)}
                >
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
  
  export default InspectionListFilter;
  