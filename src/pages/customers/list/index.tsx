import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../../store/index";
import Layout from "../../../shared/components/layout/layout";
import Filters from "./components/filters";
import Results from "./components/results";
import Pagination from "../../../shared/components/pagination/pagination";
import { UserFilters, CustomersPage, User } from "../../../store/customers/model";
import { fetchUsers } from "../../../store/customers/action";
import { fetchDropdownValues } from "../../../store/dropdownValues/action";
import { exportData } from "../../../utils";
import moment from "moment";
import { CustomerExportHeader, DROP_DOWN_TYPES } from "../../../shared/models"
import axios from '../../../Api';

const Customers = () =>
{
  const [ filters, setFilters ] = useState( new UserFilters( null ) );
  const [ pageNumber, setPageNumber ] = useState( 0 );
  const [ pageSize, setPageSize ] = useState( 10 );
  const [sortType, setSortType] = useState('DESC');
  const [sortBy, setSortBy] = useState('u.updatedAt');
  const dispatch = useDispatch();
  const pageInfo: CustomersPage = useSelector(
    ( state: StoreInterface ) => state.customersPage
  );
  useEffect(() => {
    dispatch(fetchUsers(pageSize, pageNumber, {...filters, sortBy, sortType}));
    // eslint-disable-next-line
  }, [sortBy, sortType]);

  useEffect( () =>
  {
    dispatch( fetchDropdownValues( [
      DROP_DOWN_TYPES.STATE.toString()
    ] ) );
    dispatch( fetchUsers( pageSize, pageNumber, {...filters, sortBy, sortType} ) );
    // eslint-disable-next-line
  }, [] );

  const updateFilters = ( filtersData: UserFilters ) =>
  {
    setFilters( new UserFilters( { ...filtersData } ) );
  };

  const changePageNumber = ( newPageNumber: number ) =>
  {
    setPageNumber( newPageNumber );
    dispatch( fetchUsers( pageSize, newPageNumber, filters ) );
  };
  const changePageSize = ( newPageSize: number ) =>
  {
    setPageSize( newPageSize );
    setPageNumber( 0 );
    dispatch( fetchUsers( newPageSize, 0, filters ) );
  };

  const handleExport = async () =>
  {
    let ids: number[] = []
    pageInfo?.usersList && pageInfo.usersList.map((user: User) => user.id ? ids.push(user.id) : "")
    try {
      const response = await axios.post('/api/v1/export/customer', {
        filters
      })
      exportData(
        response.data.data,
        "Customers-" + moment().format( "MMMM-DD-YYYY-HH-mm" ) + ".xlsx",
        CustomerExportHeader,
        'customer'
      );
    } catch(err) {

    }
  };

  const resetFilters = () =>
  {
    setPageNumber( 0 );
    setFilters( new UserFilters( null ) );
    dispatch( fetchUsers( pageSize, 0, new UserFilters( null ) ) );
  };
  const filterResults = () =>
  {
    setPageNumber( 0 );
    dispatch( fetchUsers( pageSize, 0, filters ) );
  };

  return (
    <>
      <Layout>
        <section className="content-body">
          <header className="page-header">
            <div className="page_title">
              <h2>Customers</h2>
            </div>
          </header>

          <div className="page_content">
            <div className="white-box">
              <Filters
                filters={ filters }
                onResetFilters={ resetFilters }
                onFilterResults={ filterResults }
                onUpdateFilters={ updateFilters }
              />
              <Results
                setSortBy={setSortBy} sortBy={sortBy} sortType={sortType} setSortType={setSortType} 
                results={ pageInfo?.usersList }
                count={ pageInfo?.count }
                pageSize={ pageSize }
                onChangePageSize={ changePageSize }
                onHandleExport={ handleExport }
              />
              <div className="table-paging">
                <Pagination
                  totalItems={ pageInfo?.count ? pageInfo.count : 0 }
                  totalPageSize={ pageSize }
                  pageNumber={ pageNumber }
                  changePageNumber={ ( page ) => changePageNumber( page ) }
                />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Customers;
