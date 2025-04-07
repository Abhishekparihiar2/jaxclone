import React, { useEffect, useState } from 'react'
import Layout from '../../../shared/components/layout/layout';
import JAXModal from '../../../shared/components/modal/jax-modal';
import Pagination from '../../../shared/components/pagination/pagination';
import Sorter from '../../../shared/components/sorting/sorter';
import AddBlackOutDate from '../add';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlackoutDates, fetchBlackoutDates } from '../../../store/blackoutDates/action';
import { RootState } from '../../../store';
import { BlackoutDatesPage } from '../../../store/blackoutDates/model';
import moment from 'moment';
import axios from '../../../Api';
import { exportData } from '../../../utils';
import { BlackoutDateExportHeader } from '../../../shared/models';

const BlackOutDates = () => { 
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [sortType, setSortType] = useState('DESC');
    const [sortBy, setSortBy] = useState('createdAt');
    const [addBlackOutDates, setAddBlackOutDates] = useState(false)
    const [edit, setEdit] = useState(false)
    const [blackoutDateId, setblackoutDateId] = useState<any>(null)
    const dispatch = useDispatch()
    const blackoutDataPage: BlackoutDatesPage = useSelector((state: RootState) => state.blackouts)
    useEffect(() => {
      // dispatch(fetchBlackoutDates({paginate: pageSize, pageNumber, sortBy: sortBy, sortType: sortType}))
      searchBlackouts(pageNumber, pageSize)
    }, [])
    useEffect(() => {
      searchBlackouts(pageNumber, pageSize);
      // eslint-disable-next-line
    }, [sortBy, sortType]);
    const changePageSize = (page_size: number) => {
        setPageSize(page_size);
        searchBlackouts(pageNumber, page_size);
    };

    const searchBlackouts = (pageNumber: number, size: number) => {
      dispatch(fetchBlackoutDates({paginate: size, pageNumber, sortBy: sortBy, sortType: sortType}))
    }
    const changePage = (page_no: number) => {
        setPageNumber(page_no);
        searchBlackouts(page_no, pageSize);
    };
    const handleDate = (date: any) => {
      const localDate = moment(date).local().format('MMM DD,YYYY')
      return localDate
    }
    const handleDelete = (id: number) => {
      dispatch(deleteBlackoutDates(id))
    }
    const handleExport = async () => {
      try {
        const response = await axios.post('/api/v1/export/blackout')
        exportData(
          response.data.data,
          "Blackout-Dates" + moment().format("MMMM-Do-YYYY-HH-mm") + ".xlsx",
          BlackoutDateExportHeader,
          'blackout'
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
              <h2>Blackout Dates</h2>
            </div>
          </header>

          <div className="page_content">
            <div className="white-box">
              <section className="card mb20">
                <header className="card-header card-head-icon">
                <div className="card-head-actions-left">
                  <a className="btn btn-orange btn-sm" style={{float: 'right'}} href="javascript:void(0);" onClick={() => setAddBlackOutDates(true)}>
                    <i className="fa fa-plus mr-1" aria-hidden="true"></i>
                    Add
                  </a>
                </div>
                </header>
              </section>
              <section className="card mb20">
                <div className="card-body pb-0">
                  <div className="table-head">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h3 className="mb-0">Blackout Dates Details</h3>
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
                            <th style={{ width: "45%" }} onClick={()=>{ setSortBy('date'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>Dates
                            <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'date'} />
                            </th>
                            <th style={{ width: "45%" }} onClick={()=>{setSortBy('name'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC');}}>Name of holiday
                            <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'name'} /></th>
                            <th style={{ width: "10%" }} className='pointer'>
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            blackoutDataPage.blackoutDates?.map((data, index) => (
                              <tr key={index}>
                                  <td>
                                    {handleDate(data.date)}
                                  </td>
                                  <td>
                                    {data.name}
                                  </td>
                                  <td>
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-xs mr-1"
                                    title="Edit"
                                    onClick={() => {
                                      setEdit(true)
                                      setblackoutDateId(data.id)
                                    }}
                                    >
                                        <i
                                            className="fa fa-pencil"
                                            aria-hidden="true"
                                        ></i>
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-outline-danger btn-xs mr-1"
                                      data-toggle="modal"
                                      data-target="#deleteModal"
                                      title="Delete"
                                      onClick={() => {
                                        if(data.id)
                                          handleDelete(data.id)
                                      }}
                                      >
                                          <i
                                              className="fa fa-trash-o"
                                              aria-hidden="true"
                                          ></i>
                                    </button>
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
                  totalItems={blackoutDataPage.count}
                  totalPageSize={pageSize}
                  pageNumber={pageNumber}
                  changePageNumber={(page) => changePage(page)}
                />
              </div>
            </div>
          </div>
        </section>
      </Layout>
      <JAXModal
        heading={addBlackOutDates ? `Add Blackout Dates` : `Edit Blackout Dates`}
        show={addBlackOutDates || edit}
        handleClose={ () => {
          setAddBlackOutDates(false)
          setEdit(false)
        } }
        bodyClassName="modal-body-scroll"
        backdrop="static"
      >
        <AddBlackOutDate handleClose={() => {
          setAddBlackOutDates(false)
          setEdit(false)
        }} edit={edit} id={blackoutDateId} />
      </JAXModal>
      </>
    )
}

export default BlackOutDates