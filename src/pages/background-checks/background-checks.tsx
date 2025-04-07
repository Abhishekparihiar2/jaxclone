import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../shared/components/layout/layout";
import { BackgroundCheckExportHeader } from "../../shared/models";
import { RootState } from "../../store";
import { fetchBackgroundCheckList } from "../../store/backgroundChecks/action";
import { BackgroundChecksData } from "../../store/backgroundChecks/models";
import { exportData } from "../../utils";
import BackgroundCheckFilter from "./components/background-check-filters";
import BackgroundCheckPagination from "./components/background-check-pagination";
import BackgroundCheckTable from "./components/background-check-table";
import BackgroundCheckTableHead from "./components/background-check-table-head";
import { formatDate } from '../../utils/index';

export interface backgroundCheckFilter {
  firstName: string;
  lastName: string;
  dlNumber: string;
  status: string;
  startDateFilter: string | null;
  endDateFilter: string | null;
}
const BackgroundChecks = () => {
  const dispatch = useDispatch();
  const backgroundChecks = useSelector((state: RootState)=> state.backgroundCheckPage.backgroundChecks);
  const [form, setForm] = useState<backgroundCheckFilter>({
    firstName: '',
    lastName: '',
    dlNumber: '',
    status: '',
    startDateFilter: null,
    endDateFilter: null,
  });
  const [sortType, setSortType] = useState('DESC');
  const [sortBy, setSortBy] = useState('bc.updatedAt');
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [filters, setFilters] = useState<any>(null);
  const [filterError, setFilterError] = useState<{
    [key: string]: string;
  } | null>({});
  useEffect(() => {
    searchBackgroundChecks(pageNumber, pageSize);
    // eslint-disable-next-line
  }, [sortBy, sortType]);
  const handleExport = async () => {
    let ids: number[] = []
    backgroundChecks.backgroundCheckList && backgroundChecks.backgroundCheckList.map((backgroundCheck: BackgroundChecksData) => backgroundCheck.id ? ids.push(backgroundCheck.id) : "")
    try {
      const response = await axios.post('/api/v1/export/backgroundChecks', {
        filters
      })
      exportData(
        response.data.data,
        "Background-checks-" + moment().format("MMMM-Do-YYYY-HH-mm") + ".xlsx",
        BackgroundCheckExportHeader,
        'background'
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

  const searchBackgroundChecks = (page: number, size: number) => {
    const searchObject: any = {};
    if (form.startDateFilter && !form.endDateFilter) {
      setFilterError({
        "date": "Please select end date",
      });
      return false;
    }
    if (form.firstName) {
      searchObject.firstName = form.firstName;
    }

    if (form.lastName) {
      searchObject.lastName = form.lastName;
    }

    if (form.dlNumber) {
      searchObject.dlNumber = form.dlNumber;
    }

    if (form.status) {
      searchObject.status = form.status;
    }

    if (form.startDateFilter) {
      searchObject.startDate = form.startDateFilter;
    }

    if (form.endDateFilter) {
      searchObject.endDate = form.endDateFilter;
    }
    setFilters(searchObject)
    dispatch(fetchBackgroundCheckList(size, page, {...searchObject, sortBy, sortType}));
  };
  
  const changePage = (page_no: number) => {
    setPageNumber(page_no);
    searchBackgroundChecks(page_no, pageSize);
  };

  useEffect(()=>{
    searchBackgroundChecks(0, pageSize);
    // eslint-disable-next-line
  }, [])

  useEffect(()=>{
    searchBackgroundChecks(0, pageSize);
    // eslint-disable-next-line
  }, [pageSize]);

  return (
    <>
      <Layout>
        <section className="content-body">
          <header className="page-header">
            <div className="page_title">
              <h2>Background Checks</h2>
            </div>
          </header>

          <div className="page_content">
            <div className="white-box">
              <BackgroundCheckFilter 
                filterError={filterError}
                pageSize={pageSize}
                form={form}
                setForm={setForm}
                setPageNumber={setPageNumber}
                setFilterError={setFilterError}
                searchBackgroundChecks={searchBackgroundChecks}
                handleDateChange={handleDateChange} />
              <section className="card mb20">
                <div className="card-body pb-0">
                  <BackgroundCheckTableHead pageSize={pageSize} handleExport={handleExport} setPageSize={setPageSize} />
                  <BackgroundCheckTable  setSortBy={setSortBy} sortBy={sortBy} sortType={sortType} setSortType={setSortType}  backgroundChecks={backgroundChecks.backgroundCheckList as any} searchBackgroundChecks={searchBackgroundChecks} pageSize={pageSize} setPageNumber={setPageNumber} />
                </div>
              </section>
              <BackgroundCheckPagination count={backgroundChecks.count} pageNumber={pageNumber} pageSize={pageSize} changePage={changePage} />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default BackgroundChecks;
