import React, { useEffect, useState } from 'react'
import Layout from '../../../shared/components/layout/layout';
import JAXModal from '../../../shared/components/modal/jax-modal';
import Pagination from '../../../shared/components/pagination/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import moment from 'moment';
import axios from '../../../Api';
import { exportData } from '../../../utils';
import { fetchVehiclesRegistrations } from '../../../store/vehicles/action';
import { VehicleExpirationsExportHeader } from '../../../shared/models';
import { Link } from 'react-router-dom';

const VehicleRegistrations = () => { 
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [sortType, setSortType] = useState('DESC');
    const [sortBy, setSortBy] = useState('createdAt');
    const [addBlackOutDates, setAddBlackOutDates] = useState(false)
    const [edit, setEdit] = useState(false)
    const [blackoutDateId, setblackoutDateId] = useState<any>(null)
    const dispatch = useDispatch()
    const vehicles = useSelector((state: RootState) => state.vehiclesPage.vehiclesRegistrationList)
    const vehicleRegistrationsCount = useSelector((state: RootState) => state.vehiclesPage.count)
    useEffect(() => {
      // dispatch(fetchBlackoutDates({paginate: pageSize, pageNumber, sortBy: sortBy, sortType: sortType}))
      searchVehicles(pageNumber, pageSize)
    }, [])
    useEffect(() => {
      searchVehicles(pageNumber, pageSize);
      // eslint-disable-next-line
    }, [sortBy, sortType]);
    const changePageSize = (page_size: number) => {
        setPageSize(page_size);
        searchVehicles(pageNumber, page_size);
    };

    const searchVehicles = (pageNumber: number, size: number) => {
      dispatch(fetchVehiclesRegistrations(
        {
            pageSize: size,
            pageNumber
        }
    ))
    }
    const changePage = (page_no: number) => {
        setPageNumber(page_no);
        searchVehicles(page_no, pageSize);
    };
    const handleDate = (date: any) => {
      const localDate = moment(date).local().format('MMM DD,YYYY')
      return localDate
    }
    const handleExport = async () => {
      try {
        const response = await axios.post('/api/v1/export/registrations')
        exportData(
          response.data.data,
          "Vehicle-Expirations" + moment().format("MMMM-Do-YYYY-HH-mm") + ".xlsx",
          VehicleExpirationsExportHeader,
          'expirations'
        );
      } catch (err) {
  
      }
    };
    return (
        <>
    <Layout>
        <section className="content-body">
          <header className="page-header">
            <div className="page_title">
              <h2>Vehicle Expiration</h2>
            </div>
          </header>

          <div className="page_content">
            <div className="white-box">
              <section className="card mb20">
                <div className="card-body pb-0">
                  <div className="table-head">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h3 className="mb-0">Vehicle Expiration Detail</h3>
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
                            <th style={{ width: "20%" }} onClick={()=>{ setSortBy('date'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>Vehicle Numner
                            {/* <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'date'} /> */}
                            </th>
                            <th style={{ width: "10%" }} onClick={()=>{setSortBy('name'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC');}}>YEAR
                            {/* <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'name'} /> */}
                            </th>
                            <th style={{ width: "10%" }} onClick={()=>{setSortBy('name'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC');}}>MAKE
                            {/* <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'name'} /> */}
                            </th>
                            <th style={{ width: "10%" }} onClick={()=>{setSortBy('name'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC');}}>MODEL
                            {/* <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'name'} /> */}
                            </th>
                            <th style={{ width: "20%" }} onClick={()=>{setSortBy('name'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC');}}>VIN
                            {/* <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'name'} /> */}
                            </th>
                            <th style={{ width: "15%" }} onClick={()=>{setSortBy('name'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC');}}>EXPIRATION DATE
                            {/* <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'name'} /> */}
                            </th>
                            <th style={{ width: "20%" }} onClick={()=>{setSortBy('name'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC');}}>FLEET NO.
                            {/* <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'name'} /> */}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            vehicles?.map((data, index) => (
                              <tr key={index}>
                                  <td>
                                    <Link to={`/vehicle-detail/${data.id}`} className="text-primary">
                                        {data.number}
                                    </Link>
                                  </td>
                                  <td>
                                    {moment(data.year).format("YYYY")}
                                  </td>
                                  <td>
                                    {data.make}
                                  </td>
                                  <td>
                                    {data.model}
                                  </td>
                                  <td>
                                    {data.vin}
                                  </td>
                                  <td>
                                    {moment( data.registrationExpDate  ).format( "MM/DD/YYYY" )}
                                  </td>
                                  <td>
                                  </td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>
              <div className="table-paging">
                <Pagination
                  totalItems={vehicleRegistrationsCount}
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
    )
}

export default VehicleRegistrations