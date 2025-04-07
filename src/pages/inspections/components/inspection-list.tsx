import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Inspection, InspectionExportHeader } from "../../../shared/models";
import { RootState } from "../../../store";
import { fetchInspectionsList } from "../../../store/inspections/action";
import { exportData } from "../../../utils";
import InspectionListFilter from "./inspection-list-filters";
import InspectionListPagination from "./inspection-list-pagination";
import InspectionListTable from "./inspection-list-table";
import InspectionListTableHead from "./inspection-list-table-head";
import { formatDate } from '../../../utils/index';

export interface inspectionFilter {
  vehicleNumberFilter: string;
  vinFilter: string;
  makeFilter: string;
  modelFilter: string;
  yearFilter: Date | null;
  inspectorFilter: string;
  statusFilter: string;
  startDateFilter: string | null;
  endDateFilter: string | null;
}

const InspectionsList = () => {
  const dispatch = useDispatch();
  const inspections = useSelector((state: RootState) => state.inspectionListPage.inspectionList);
  const [form, setForm] = useState<inspectionFilter>({
    startDateFilter: null,
    endDateFilter: null,
    vehicleNumberFilter: '',
    vinFilter: '',
    makeFilter: '',
    modelFilter: '',
    yearFilter: null,
    inspectorFilter: '',
    statusFilter: '',
  });
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [sortType, setSortType] = useState('DESC');
  const [sortBy, setSortBy] = useState('i.updatedAt');
  const [filters, setFilters] = useState<any>(null);
  const [filterError, setFilterError] = useState<{
    [key: string]: string;
  } | null>({});
  useEffect(() => {
    searchInspections(pageNumber, pageSize);
    // eslint-disable-next-line
  }, [sortBy, sortType]);

  const handleExport = async () => {
    let ids: number[] = []
    inspections?.inspections && inspections?.inspections.map((inspection: Inspection) => inspection.id ? ids.push(inspection.id) : "")
    try {
      const response = await axios.post('/api/v1/export/inspections', {
        filters
      })
      exportData(
        response.data.data,
        "Inspections-" + moment().format("MMMM-Do-YYYY-HH-mm") + ".xlsx",
        InspectionExportHeader,
        'inspections'
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

  const searchInspections = (page: number, size: number) => {
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
      searchObject.number = form.vehicleNumberFilter;
    }

    if (form.vinFilter) {
      searchObject.vin = form.vinFilter;
    }

    if (form.makeFilter) {
      searchObject.make = form.makeFilter;
    }

    if (form.modelFilter) {
      searchObject.model = form.modelFilter;
    }

    if (form.yearFilter) {
      searchObject.year = form.yearFilter
    }

    if (form.inspectorFilter) {
      searchObject.inspector = form.inspectorFilter;
    }

    if (form.statusFilter) {
      searchObject.status = form.statusFilter;
    }
    setFilters(searchObject)
    dispatch(fetchInspectionsList(size, page, { ...searchObject, sortBy, sortType }));
  };

  const changePage = (page_no: number) => {
    setPageNumber(page_no);
    searchInspections(page_no, pageSize);
  };

  useEffect(() => {
    searchInspections(0, pageSize);
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    searchInspections(0, pageSize);
    // eslint-disable-next-line
  }, [pageSize]);

  return (
    <div
      className="tab-pane fade show active"
      id="inspectionsTabDetails"
      role="tabpanel"
      aria-labelledby="inspections-tab"
    >
      <InspectionListFilter
        filterError={filterError}
        pageSize={pageSize}
        form={form}
        setForm={setForm}
        setPageNumber={setPageNumber}
        setFilterError={setFilterError}
        searchInspections={searchInspections}
        handleDateChange={handleDateChange}
      />
      <section className="card mb20">
        <div className="card-body pb-0">
          <InspectionListTableHead pageSize={pageSize} handleExport={handleExport} setPageSize={setPageSize} />
          <InspectionListTable setSortBy={setSortBy} sortBy={sortBy} sortType={sortType} setSortType={setSortType} inspections={inspections.inspections || []} />
        </div>
      </section>
      <InspectionListPagination count={inspections.count} pageNumber={pageNumber} pageSize={pageSize} changePage={changePage} />
    </div>
  );
};

export default InspectionsList;
