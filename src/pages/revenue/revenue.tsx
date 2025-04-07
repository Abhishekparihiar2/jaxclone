import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../shared/components/layout/layout";
import { RevenueExportHeader } from "../../shared/models";
import { RootState } from "../../store";
import { fetchRevenueList } from "../../store/revenue/action";
import { PaymentTransaction, ResponseError } from "../../store/shared/model";
import { exportData } from "../../utils";
import RevenueFilter from "./components/revenue-filters";
import RevenuePagination from "./components/revenue-pagination";
import RevenueTable from "./components/revenue-table";
import RevenueTableHead from "./components/revenue-table-head";
import { formatDate } from '../../utils/index';
export interface revenueFilter {
  vehicleNumberFilter: string;
  firstName: string;
  lastName: string;
  rentalNumber: string;
  startDateFilter: string | null;
  endDateFilter: string | null;
  minAmmount: number;
  maxAmmount: number;
}
const Revenue = () => {
  
  const dispatch = useDispatch();
  const revenueList = useSelector((state: RootState)=> state.revenueList);
  const [form, setForm] = useState<revenueFilter>({
    startDateFilter: null,
    endDateFilter: null,
    vehicleNumberFilter: '',
    firstName: '',
    lastName: '',
    rentalNumber: '',
    minAmmount: 0,
    maxAmmount: 100000
  });
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [sortType, setSortType] = useState('DESC');
  const [sortBy, setSortBy] = useState('pt.updatedAt');
  const [filters, setFilters] = useState<any>(null);
  const [filterError, setFilterError] = useState<{
    [key: string]: string;
  } | null>({});

  useEffect(() => {
    revenueSearch(pageNumber, pageSize);
    // eslint-disable-next-line
  }, [sortBy, sortType]);

  const handleExport = async () => {
    let ids: number[] = []
    revenueList.revenueList && revenueList.revenueList.map((inspection: PaymentTransaction) => inspection.id ? ids.push(inspection.id) : "")
    try {
      const response = await axios.post('/api/v1/export/revenue', {
        filters
      })
      exportData(
        response.data.data,
        "Revenue-" + moment().format("MMMM-Do-YYYY-HH-mm") + ".xlsx",
       RevenueExportHeader
      );
    } catch (err) {

    }
  };

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setForm({
      ...form,
      startDateFilter: start ? formatDate(start) : null,
      endDateFilter: end ? formatDate(end) : null
    });
  }

  const revenueSearch = (page: number, size: number) => {
    const searchObject: any = {};
    if (form.startDateFilter && !form.endDateFilter) {
      setFilterError({
        "date": "Please select end date",
      });
      return false;
    }
    if (form.startDateFilter) {
      searchObject.startDate = form.startDateFilter;
    }

    if (form.endDateFilter) {
      searchObject.endDate = form.endDateFilter;
    }

    if (form.vehicleNumberFilter) {
      searchObject.vehicleNumber = form.vehicleNumberFilter;
    }

    if (form.firstName) {
      searchObject.firstName = form.firstName;
    }

    if (form.lastName) {
      searchObject.lastName = form.lastName;
    }

    if (form.rentalNumber) {
      searchObject.rentalNumber = form.rentalNumber;
    }

    if((form.minAmmount > 0 || form.maxAmmount > 0)) {
      if((form.minAmmount > 0 && form.maxAmmount < form.minAmmount)) {
        return dispatch(new ResponseError("Max Ammount range should be greater then min amount range").action())
      }
      searchObject.minAmmount = form.minAmmount;
      searchObject.maxAmmount = form.maxAmmount;
    }
    setFilters(searchObject)
    dispatch(fetchRevenueList(size, page, {...searchObject, sortBy, sortType}));
  };
  
  const changePage = (page_no: number) => {
    setPageNumber(page_no);
    revenueSearch(page_no, pageSize);
  };

  useEffect(()=>{
    revenueSearch(0, pageSize);
    // eslint-disable-next-line
  }, [])

  useEffect(()=>{
    revenueSearch(0, pageSize);
    // eslint-disable-next-line
  }, [pageSize]);

  const handleRangeInput = ( minFieldName: string, minFieldValue: number, maxFieldName: string, maxFieldValue: number ) =>
  {
    setForm({
      ...form,
      [minFieldName]: minFieldValue,
      [maxFieldName]: maxFieldValue
    });
  };

  return (
    <>
      <Layout>
        {" "}
        <section className="content-body">
          <header className="page-header">
            <div className="page_title">
              <h2>Revenue</h2>
            </div>
          </header>
          <div className="page_content">
            <div className="white-box">
            <RevenueFilter 
              filterError={filterError}
              pageSize={pageSize}
              form={form}
              setForm={setForm}
              setPageNumber={setPageNumber}
              setFilterError={setFilterError}
              revenueSearch={revenueSearch}
              handleDateChange={handleDateChange}
              handleRangeInput={handleRangeInput}
            />
              <section className="card mb20">
                <div className="card-body pb-0">
                <RevenueTableHead pageSize={pageSize} handleExport={handleExport} setPageSize={setPageSize} />
                <RevenueTable  setSortBy={setSortBy} sortBy={sortBy} sortType={sortType} setSortType={setSortType} revenueList={revenueList.revenueList} />
                </div>
              </section>
              <RevenuePagination changePage={changePage} count={revenueList.count} pageNumber={pageNumber} pageSize={pageSize}  />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Revenue;
