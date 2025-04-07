import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { searchVehicles } from "../../../store/vehicles/action";
import { StoreInterface } from "../../../store/index";
import { exportData} from "../../../utils/index";
import Pagination from "../../../shared/components/pagination/pagination";
import VehicleFilter from "../list/filter";
import VehicleListHeader from "../list/list-header";
import VehicleList from "../list/list";
import { fetchDropdownValues } from "../../../store/dropdownValues/action"
import moment from "moment";
import Layout from "../../../shared/components/layout/layout";
import { FilterInterface } from "../interface";
import
{
  DROP_DOWN_TYPES, VehicleExportHeader
} from "../../../shared/models/index";
import { ResponseError } from "../../../store/shared/model";
import { DropdownValuesState } from '../../../store/dropdownValues/model';
import axios from '../../../Api';
import { Vehicle } from "../../../store/vehicles/interface";

const initialFilter = {
  vehicleNumber: null,
  make: [],
  tag: null,
  vin: null,
  model: [],
  year: {
    startYear: null,
    endYear: null
  },
  type: [],
  purchase: {
    startDate: null,
    endDate: null,
  },
  customer: null,
  status: [],
  minDailyRate: 0,
  maxDailyRate: 150,
  minVehicleCost: 0,
  maxVehicleCost: 25000,
  minOdometer: 0,
  maxOdometer: 5000000,
}
const Vehicles = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [make, setMake] = useState("");
  const [tag, setTag] = useState("");
  const [vin, setVIN] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<Date | null>(null);
  const [type, setType] = useState("");
  const [customer, setCustomer] = useState("");
  const [purchase, setPurchase] = useState<Date | null>(null);
  const [totalPageSize, setTotalPageSize] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [sortType, setSortType] = useState('DESC');
  const [sortBy, setSortBy] = useState('updatedAt');
  const [filters, setFilters] = useState<FilterInterface | any>(initialFilter);
  const [expandFilters, setExpandFilters] = useState<boolean>(false);
  const [filtersObj, setFiltersObj] = useState<any>(null);

  const dispatch = useDispatch();
  const pageInfo = useSelector((state: StoreInterface) => state.vehiclesPage);
  const totalCount = pageInfo?.count ? pageInfo.count : 0;
  useEffect(() => {
    dispatch(searchVehicles(createSearchObject(), totalPageSize, pageNumber));
  // eslint-disable-next-line
  }, [sortBy, sortType]);
  const handleFilters = (e: any) => {
    const name = e.target.name
    setFilters({
      ...filters,
      [name]: e.target.value,
    });
  };

  const dropdownValues: DropdownValuesState = useSelector(
    ( state: StoreInterface ) => state.dropdownValues
  );

  const handleRangeInput = ( minFieldName: string, minFieldValue: number, maxFieldName: string, maxFieldValue: number ) =>
  {
    setFilters({
      ...filters,
      [minFieldName]: minFieldValue,
      [maxFieldName]: maxFieldValue
    });
  };

  const handleDropDown = (
    name:any, value:[]
  ) => {
    console.log(filters[name], filters, name)
    setFilters({
      ...filters,
      [name]: [...value]
    });
  };

  // const handleYearFilters = (date: Date, type: string) =>
  //   setFilters({ ...filters, year: date });
  const handlePurchaseFilters = (dates: any) => {
    const { start, end } = dates;
    setFilters({
      ...filters,
      purchase: {
        ...purchase,
        startDate: start ? start : null,
        endDate: end ? end : null,
      },
    });
  };
  const handleYears = (dates: any) => {
    const { start, end } = dates;
    console.log(dates)
    setFilters({
      ...filters,
      year: {
        ...year,
        startYear: start ? start : null,
        endYear: end ? end : null,
      },
    });
  };

  const createSearchObject = () => {
    const searchObj: any = {};
    if (filters.vehicleNumber) {
      searchObj.number = filters.vehicleNumber;
    }
    if (filters.make) {
      searchObj.make = filters.make.map((data: any) => data.value);
    }
    if (filters.model) {
      searchObj.model = filters.model.map((data: any) => data.value);
    }
    if (filters.status) {
      searchObj.status = filters.status.map((data: any) => data.value);
    }
    if (filters.tag) {
      searchObj.tagNumber = filters.tag;
    }
    if (filters.vin) {
      searchObj.vin = filters.vin;
    }
    if (filters.type) {
      searchObj.vehicleTypeId = filters.type.map((data: any) => data.value);
    }
    if (filters.purchase) {
      searchObj.buyDate = filters.purchase;
    }
    if (filters.year) {
      searchObj.year = filters.year;
    }
    if (filters.year) {
      // searchObj.year = filters.year.getFullYear();
    }
    if((filters.minOdometer > 0 || filters.maxOdometer > 0)) {
      if((filters.minOdometer > 0 && filters.maxOdometer < filters.minOdometer)) {
        return dispatch(new ResponseError("MaxOdometer range should be greater then min odometer range").action())
      }
      searchObj.minOdometer = filters.minOdometer;
      searchObj.maxOdometer = filters.maxOdometer;
    }
    if(filters.minDailyRate > 0 || filters.maxDailyRate) {
      if((filters.minDailyRate > 0 && filters.maxDailyRate < filters.minDailyRate)) {
        return dispatch(new ResponseError("Max daily rate range should be greater then min daily rate range").action())
      }
      searchObj.minDailyRate = filters.minDailyRate;
      searchObj.maxDailyRate = filters.maxDailyRate;
    }
    if(filters.minVehicleCost > 0 || filters.maxVehicleCost) {
      if((filters.minVehicleCost > 0 && filters.maxVehicleCost < filters.minVehicleCost)) {
        return dispatch(new ResponseError("Max vehicle cost range should be greater then min vehicle cost range").action())
      }
      searchObj.minVehicleCost = filters.minVehicleCost;
      searchObj.maxVehicleCost = filters.maxVehicleCost;
    }

    if(filters.customer) {
      searchObj.customer = filters.customer;
    }
    setFiltersObj(searchObj)
    return { ...searchObj, sortBy, sortType};
  };

  useLayoutEffect(() => {
    dispatch( fetchDropdownValues( [
      DROP_DOWN_TYPES.VEHICLE_MODEL.toString(),
      DROP_DOWN_TYPES.VEHICLE_MAKE.toString(),
    ] ) );
    // eslint-disable-next-line
  }, [])

  useEffect( () =>
  {
    if(!dropdownValues.dropdownValues) {
      dispatch( fetchDropdownValues( [
        DROP_DOWN_TYPES.VEHICLE_MODEL.toString(),
        DROP_DOWN_TYPES.VEHICLE_MAKE.toString(),
      ] ) );
    }
    // eslint-disable-next-line
  }, [dropdownValues] );

  useEffect(() => {
    dispatch(searchVehicles(createSearchObject(), totalPageSize, pageNumber));
  // eslint-disable-next-line
  }, [])

  const searchHandler = () => {
    setPageNumber( 0 );
    dispatch(searchVehicles(createSearchObject(), totalPageSize, 0));
  };

  const changePageSize = (pageSizeToUpdate: number) => {
    setPageNumber( 0 );
    setTotalPageSize( pageSizeToUpdate );
    dispatch(searchVehicles(createSearchObject(), pageSizeToUpdate, 0));
  };

  const changePageNumber = (page_no: number) => {
    setPageNumber( page_no );
    dispatch(searchVehicles(createSearchObject(), totalPageSize, page_no));
  };

  const reset = () => {
    setPageNumber( 0 );
    setTotalPageSize( 10 );
    setVehicleNumber("");
    setMake("");
    setTag("");
    setVIN("");
    setModel("");
    setYear(null);
    setType("");
    setPurchase(null);
    setCustomer("");
    setFilters(initialFilter);
    dispatch(searchVehicles({}, 10, 0));
  };

  const handleExport = async () => {
    let ids: number[] = []
    pageInfo.vehiclesList && pageInfo.vehiclesList.map((vehicle: Vehicle) => vehicle.id ? ids.push(vehicle.id) : "")
    try {
      const response = await axios.post('/api/v1/export/vehicle', {
        filters: filtersObj
      })
      exportData(
        response.data.data,
        "Vehicles-" + moment().format("MMMM-Do-YYYY-HH-mm") + ".xlsx",
        VehicleExportHeader,
        'vehicles'
      ); 
    } catch(err) {

    }
  };
  
  console.log(filters)
  return ( <>
    <Layout>
          <section className="content-body">
            <header className="page-header">
              <div className="page_title">
                <h2>Vehicles</h2>
              </div>
            </header>

            <div className="page_content">
              <div className="white-box">
                <VehicleFilter
                  vehicleNumber={vehicleNumber}
                  setVehicleNumber={(value) => setVehicleNumber(value)}
                  make={make}
                  setMake={(value) => setMake(value)}
                  tag={tag}
                  setTag={(value) => setTag(value)}
                  vin={vin}
                  setVIN={(value) => setVIN(value)}
                  model={model}
                  setModel={(value) => setModel(value)}
                  handleYears={handleYears}
                  setYear={(value) => setYear(value)}
                  type={type}
                  setType={(value) => setType(value)}
                  purchase={purchase}
                  setPurchase={(value) => setPurchase(value)}
                  setCustomer={(value) => setCustomer(value)}
                  customer={customer}
                  filters={filters}
                  handleFilters={ handleFilters }
                  handleRangeInput={ handleRangeInput }
                  handleDropDown={handleDropDown}
                  handlePurchaseFilters={handlePurchaseFilters}
                  search={searchHandler}
                  reset={reset}
                  setExpandFilters={setExpandFilters}
                  expandFilters={expandFilters}
                />
                <section className="card mb20">
                  <div className="card-body pb-0">
                    <VehicleListHeader
                      totalPageSize={totalPageSize}
                      handleExport={handleExport}
                      changePageSize={(value) => changePageSize(value)}
                    />
                    <VehicleList setSortBy={setSortBy} sortBy={sortBy} sortType={sortType} setSortType={setSortType} pageInfo={pageInfo} />
                  </div>
                </section>
                <div className="table-paging">
                  <Pagination
                    totalItems={totalCount}
                    totalPageSize={totalPageSize}
                    pageNumber={pageNumber}
                    changePageNumber={(page) => changePageNumber(page)}
                  />
                </div>
              </div>
            </div>
          </section>
          </Layout>
      </>
  );
};

export default Vehicles;
