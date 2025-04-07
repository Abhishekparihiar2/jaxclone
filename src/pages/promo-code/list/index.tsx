import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Layout from "../../../shared/components/layout/layout";
import DatePicker from "react-datepicker";
import { fetchRentals } from "../../../store/rentals/action";
import { RootState, StoreInterface } from "../../../store/index";
import { Rental, RentalsPage } from "../../../store/rentals/model";
import Pagination from "../../../shared/components/pagination/pagination";
import { convertTime12to24, exportData } from "../../../utils";
import { PromoCodeExportHeader, RentalsExportHeader, RentalStatus } from "../../../shared/models/index";
import Sorter from "../../../shared/components/sorting/sorter";
import axios from '../../../Api';
import JAXModal from "../../../shared/components/modal/jax-modal";
import AddPromoCode from "../add";
import { PromoCode, PromoCodePage } from '../../../store/promoCode/models';
import { fetchPromoCodes } from "../../../store/promoCode/action";
import { fetchVehicleTypes } from "../../../store/vehicleTypes/action";
import { ResponseSuccess } from '../../../store/shared/model';
import Api from "../../../Api";
var moment = require('moment-timezone');

const PromoCodes = () => {
  const dispatch = useDispatch();
  const pageInfo: PromoCodePage = useSelector(
    (state: StoreInterface) => state.promoCodeReducer
  );
  const vehicleTypes = useSelector((state: RootState)=>state.vehicleTypesValues.vehicleTypes);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [codeType, setCodeType] = useState("");
  const [codeName, setCodeName] = useState("");
  const [extension, setExtension] = useState<null | number>(null);
  const [useType, setUseType] = useState<null | number>(null);
  const [isActive, setIsActive] = useState<null | number>(null);
  const [vehicleTypeId, setvehicleTypeId] = useState<null | number>(null);
  const [offer, setOffer] = useState<null | number>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [isFilterReset, setIsFilterReset] = useState(false);
  const [addPromoCode, setAddPromoCode] = useState(false);
  const [editPromoCode, setEditPromoCode] = useState(false);
  const [promoCodeId, setPromoCodeId] = useState<number | null>(null);
  const [sortType, setSortType] = useState('DESC');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [expireDate, setExpireDate] = useState<Date | null>(null);
  const [sortBy, setSortBy] = useState('pc.createdAt');
  const [filters, setFilters] = useState<any>(null);
  const [promoCodePopup, setPromoCodePopup] = useState(true)
  const [filterError, setFilterError] = useState<
    Array<{
      [key: string]: string;
    }>
  >([]);

  useLayoutEffect(() => {
    dispatch(fetchVehicleTypes())
  }, [])

  useEffect(() => {
    searchPromoCodes(pageNumber, pageSize);
    // eslint-disable-next-line
  }, [sortBy, sortType]);

  useEffect(() => {
    isFilterReset && searchPromoCodes(0, pageSize);
    setIsFilterReset(false);
    // eslint-disable-next-line
  }, [isFilterReset]);

  useEffect(() => {
    dispatch(fetchPromoCodes({paginate: pageSize, pageNumber, sortBy: sortBy, sortType: sortType}));
    // eslint-disable-next-line
  }, []);
  const changePageSize = (page_size: number) => {
    setPageSize(page_size);
    searchPromoCodes(pageNumber, page_size);
  };
  
  const filterAction = () => {
    setPageNumber(0);
    searchPromoCodes(0, pageSize);
  }
  const searchPromoCodes = (pageNumber: number, size: number) => {
    const searchObject: any = {};
    if (codeName) {
      searchObject.name = codeName;
    }
    if (startDate) {
      // searchObject.startDate = startDate;
      searchObject.startDate = moment(startDate).format('YYYY-MM-DD');
    }
    if (expireDate) {
      // searchObject.expirationDate = expireDate;
      searchObject.expirationDate = moment(expireDate).format('YYYY-MM-DD');
    }
    if (codeType) {
      searchObject.codeType = codeType;
    }
    if (offer) {
      searchObject.offer = offer;
    }

    if (vehicleTypeId) {
      searchObject.vehicleTypeId = vehicleTypeId;
    }

    if (extension || extension === 0) {
      searchObject.extension = extension;
    }
    if (useType) {
      searchObject.totalCount = useType;
    }
    if (isActive || isActive === 0) {
      searchObject.isActive = isActive;
    }
    setFilters(searchObject)
    dispatch(fetchPromoCodes({paginate: size, pageNumber, sortBy: sortBy, sortType: sortType, ...searchObject}));
  }

  const resetFilter = async () => {
    setCodeName("");
    setCodeType("");
    setExpireDate(null);
    setUseType(null)
    setStartDate(null);
    setvehicleTypeId(null);
    setExtension(null);
    setIsActive(null);
    setIsFilterReset(true)
    setOffer(null);
  };

  const changePage = (page_no: number) => {
    setPageNumber(page_no);
    searchPromoCodes(page_no, pageSize);
  };
  const closePopup = () => {
    setAddPromoCode(false)
    setEditPromoCode(false)
    searchPromoCodes(0, pageSize)
  }
  const deletePromoCode = async (id: number | null) => {
    if(id) {
      await (
        await Api.delete( `/api/v1/promocode/${id}`)
      ).data.data;
      dispatch( new ResponseSuccess( "Promo Code deleted successfully." ).action() );
      searchPromoCodes(0, pageSize)
    }
  }
  console.log(pageInfo.promoList)
  const handleDate = (date: any) => {
    const localDate = moment(date).local().format('MM/DD/YYYY')
    return localDate
  }
  const handleExport = async () => {
    let ids: number[] = []
    pageInfo.promoList && pageInfo.promoList.map((promo: PromoCode) => promo.id ? ids.push(promo.id) : "")
    try {
      const response = await axios.post('/api/v1/export/promo', {
        filters: filters
      })
      exportData(
        response.data.data,
        "Promocode-" + moment().format("MMMM-Do-YYYY-HH-mm") + ".xlsx",
        PromoCodeExportHeader,
        'promo'
      ); 
    } catch(err) {
      throw err
    }
  };
  console.log(promoCodeId)
  return (
    <>
      <Layout>
        <section className="content-body">
          <header className="page-header">
            <div className="page_title">
              <h2>Promo Codes</h2>
            </div>
          </header>

          <div className="page_content">
            <div className="white-box">
              <section className="card mb20">
                <header className="card-header card-head-icon">
                <div className="card-head-actions-left">
                  <a className="btn btn-orange btn-sm" href="javascript:void(0);" onClick={() => setAddPromoCode(true)}>
                    <i className="fa fa-plus mr-1" aria-hidden="true"></i>
                    Add Promo Code
                  </a>
                </div>
                  {/* <h2 className="card-title">Filter</h2> */}
                  <div className="card-head-actions">
                    <span
                      className="btn arrow-circle-up"
                      onClick={() => setShowFilter(!showFilter)}
                    >
                      {showFilter ? (
                        <i className="fa fa-chevron-up" aria-hidden="true"></i>
                      ) : (
                        <i
                          className="fa fa-chevron-down"
                          aria-hidden="true"
                        ></i>
                      )}
                    </span>
                  </div>
                </header>
                {showFilter ? (
                  <div className="card-body">
                    <div className="row row-column-5">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Promo Code</label>
                          <input
                            type="text"
                            className="form-control"
                            name="codeName"
                            value={codeName}
                            onChange={(e: any) => setCodeName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                        <label className="date-label">Start Date
                          <div className="calendar-input">
                            <DatePicker
                              startDate={startDate}
                              dateFormat="MM/dd/yyyy"
                              className="form-control"
                              selected={startDate}
                              onChange={ ( date: Date ) =>
                                {
                                  setStartDate(date)
                                } }
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
                          {/* <span style={{ color: "red", fontSize: '10px' }}>
                            {filterError && Array.isArray(filterError)
                              ? filterError.map((error: any) => {
                                  return error.pickup;
                                })
                              : ""}
                          </span> */}
                        </div>
                        
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                        <label className="date-label">Expiration Date
                          <div className="calendar-input">
                            <DatePicker
                              startDate={expireDate || null}
                              dateFormat="MM/dd/yyyy"
                              className="form-control"
                              selected={expireDate || null}
                              onChange={(date: any) => setExpireDate(date)}
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
                          {/* <span style={{ color: "red", fontSize: '10px' }}>
                            {filterError && Array.isArray(filterError)
                              ? filterError.map((error: any) => {
                                  return error.return;
                                })
                              : ""}
                          </span> */}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Offer Type</label>
                          <select
                            className="form-control"
                            name="type"
                            id="type"
                            value={codeType}
                            onChange={(e) => setCodeType(e.target.value)}
                          >
                            <option value={""}>
                                    --Select Offer Type--
                            </option>
                            <option value={"AMOUNT_OFF"}>
                                    Amount Off
                            </option>
                            <option value={"PERCENTAGE_OFF"}>
                                    Percentage Off
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Offer Value (Add $ or %with value)</label>
                          <input
                            type="text"
                            className="form-control"
                            name="value"
                            value={offer || undefined}
                            onChange={(e) => setOffer(isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value))}
                          />
                        </div>
                      </div>
                      
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Vehicle Type</label>
                          <select
                            className="form-control"
                            name="vehicleType"
                            id="vehicleType"
                            value={vehicleTypeId || undefined}
                            onChange={(e) => setvehicleTypeId(parseInt(e.target.value))}
                          >
                            <option value="" selected={vehicleTypeId === null}>All</option>
                            {Object.keys(vehicleTypes || {})?.map((key: any) => {
                              return (
                                <>
                                  <option value={key} selected={vehicleTypeId === key}>
                                    {vehicleTypes[key]}
                                  </option>
                                </>
                              );
                            }
                            )}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Rental Extensions</label>
                          <select
                            className="form-control"
                            name="isExtension"
                            id="isExtension"
                            value={extension || undefined}
                            onChange={(e) => setExtension(parseInt(e.target.value))}
                          >
                            <option value={""}>
                                    --Select Extension--
                            </option>
                            <option value={1}>
                                    Yes
                            </option>
                            <option value={0}>
                                    No
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Number of use</label>
                          <input
                            type="text"
                            className="form-control"
                            name="use"
                            value={useType || undefined}
                            onChange={(e) => setUseType(isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value))}
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Status</label>
                          <select
                            className="form-control"
                            name="status"
                            id="status"
                            value={isActive || undefined}
                            onChange={(e) => setIsActive(parseInt(e.target.value))}
                          >
                            <option value={""}>
                                    --Select Status--
                            </option>
                            <option value={1}>
                                    Active
                            </option>
                            <option value={0}>
                                    Inactive
                            </option>
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
                            onClick={(e) => filterAction()}
                          >
                            Filter
                          </button>
                          <button
                            className="btn btn-orange"
                            type="reset"
                            onClick={resetFilter}
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </section>
              <section className="card mb20">
                <div className="card-body pb-0">
                  <div className="table-head">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h3 className="mb-0">Rental Details</h3>
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
                            <th style={{ width: "12%" }} onClick={()=>{ setSortBy('codeName'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>Promo Code
                            <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'codeName'} />
                            </th>
                            <th style={{ width: "9%" }} onClick={()=>{setSortBy('startDate'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC');}}>Start Date
                            <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'startDate'} /></th>
                            <th style={{ width: "12%" }} onClick={()=>{setSortBy('expirationDate');setSortType( sortType === 'ASC' ? 'DESC' : 'ASC');}}>Expiration Date
                            <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'expirationDate'} /></th>
                            <th style={{ width: "13%" }} onClick={()=>{ setSortBy('codeType'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                              Offer Type
                              <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'codeType'} />
                            </th>
                            <th style={{ width: "13%" }} onClick={()=>{ setSortBy('offer'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                              Offer Value
                              <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'offer'} />
                            </th>
                            <th style={{ width: "12%" }} onClick={()=>{ setSortBy('totalCount'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                              No. of use
                              <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'totalCount'} />
                            </th>
                            <th style={{ width: "13%" }} onClick={()=>{ setSortBy('vehicleTypeId'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                              Vehicle Type
                              <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'vehicleTypeId'} />
                            </th>
                            <th style={{ width: "9%" }} onClick={()=>{ setSortBy('isActive'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                              Status
                              <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'isActive'} />
                            </th>
                            <th style={{ width: "13%" }} className='pointer'>
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {pageInfo &&
                            pageInfo?.promoList?.map((promoCode) => {
                              return (
                                <>
                                  <tr>
                                    <td>
                                      {promoCode.codeName}
                                    </td>
                                    <td>
                                      {handleDate(promoCode.startDate)}
                                    </td>
                                    <td>{handleDate(promoCode.expirationDate)}</td>
                                    <td>
                                      {promoCode.codeType}
                                    </td>
                                    <td>
                                      {promoCode.offer}
                                    </td>
                                    <td>
                                      {promoCode.totalCount}
                                    </td>
                                    <td>
                                      { promoCode.vehicleType ? vehicleTypes?.[ promoCode.vehicleType || 1 ] : 'All' }
                                    </td>
                                    <td>
                                        {
                                          promoCode.isActive === 1 ? 'Active' : 'Inactive'
                                        }
                                    </td>
                                    <td>
                                    <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-xs mr-1"
                                    title="Edit"
                                    onClick={() => {
                                      setEditPromoCode(true)
                                      setPromoCodeId(promoCode.id)
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
                                      onClick={() => deletePromoCode(promoCode.id)}
                                      >
                                          <i
                                              className="fa fa-trash-o"
                                              aria-hidden="true"
                                          ></i>
                                      </button>
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>
              <div className="table-paging">
                <Pagination
                  totalItems={pageInfo?.count || 5}
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
        heading={addPromoCode ? `Create Promo Code` : `Edit Promo Code`}
        show={addPromoCode || editPromoCode}
        handleClose={ () => closePopup() }
        bodyClassName="modal-body-scroll"
        backdrop="static"
      >
        <AddPromoCode handleClose={ () => closePopup() } isEditable={editPromoCode} id={promoCodeId} />
      </JAXModal>
    </>
  );
};

export default PromoCodes;