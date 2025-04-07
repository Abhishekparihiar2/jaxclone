import React, { FC } from "react";
import {
  User,
} from "../../../../store/customers/model";
import moment from "moment";
import { formatPhoneNumber } from "../../../../utils/index";
import Sorter from "../../../../shared/components/sorting/sorter";
import { UserStatus } from "../../../../shared/models";

type ResultsInterface = {
  results?: User[];
  count?: number;
  pageSize?: number;
  onChangePageSize: ( newPageNumber: number ) => void;
  onHandleExport: () => void;
  sortBy: string;
  sortType: string;
  setSortBy: any;
  setSortType: any;
};

const Results: FC<ResultsInterface> = (props: ResultsInterface) => {
  const { results, pageSize, onChangePageSize, onHandleExport, sortBy,
    sortType,
    setSortBy,
    setSortType } = props;

  const handlePageSizeChange = (newPageNumber: number) => {
    onChangePageSize(newPageNumber);
  };

  const handleExport = ( ) =>
  {
    onHandleExport();
  }
  return (
    <>
      <section className="card mb20">
        <div className="card-body pb-0">
          <div className="table-head">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h3 className="mb-0">Customer Details</h3>
              </div>
              <div className="col-md-6">
                <div className="head-page-action">
                  <div className="page-size">
                    <label>Page Size</label>
                    <select
                      className="form-control"
                      onChange={(e) =>
                        handlePageSizeChange(Number(e.target.value))
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
                    <button className="btn btn-orange" type="submit" onClick={handleExport}>
                      <img
                        className="mr-1"
                        src="/static/images/icon-excel.png"
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
                    <th style={{ width: "10%" }} onClick={()=>{ setSortBy('id'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                      Customer No. <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'id'} />
                    </th>
                    <th style={{ width: "12%" }} onClick={()=>{ setSortBy('firstName'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                      Full Name <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'firstName'} />
                    </th>
                    <th style={{ width: "15%" }} onClick={()=>{ setSortBy('email'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                      Email Address <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'email'} />
                    </th>
                    <th style={{ width: "15%" }} onClick={()=>{ setSortBy('phoneNumber'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                      Phone No. <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'phoneNumber'} />
                    </th>
                    <th style={{ width: "12%" }} onClick={()=>{ setSortBy('dob'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                      Date of Birth <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'dob'} />
                    </th>
                    <th style={{ width: "10%" }} onClick={()=>{ setSortBy('dlno'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                      License No. <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'dlno'} />
                    </th>
                    <th style={{ width: "8%" }} onClick={()=>{ setSortBy('state'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                      State <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'state'} />
                    </th>
                    <th style={{ width: "8%" }} onClick={()=>{ setSortBy('zipCode'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                      Zip <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'zipCode'} />
                    </th>
                    <th style={{ width: "10%" }} onClick={()=>{ setSortBy('status'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                      Status <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'status'} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results &&
                    results.length ?
                    results.map((result: User) => {
                      return (
                        <>
                          <tr>
                            <td style={ { width: "10%" } }>
                            <a
                                        className="text-primary"
                                        href={`/customer-info/${result.id}`}
                                      >#{ result.id }</a></td>
                            <td
                              style={{ width: "12%" }}
                            >{`${result.firstName} ${result.lastName}`}</td>
                            <td style={ { width: "15%" } }>
                            <a
                                        className="text-primary"
                                        href={`/customer-info/${result.id}`}
                                      >{ result.email }</a></td>
                            <td style={{ width: "15%" }}>
                              {formatPhoneNumber(result.phoneNumber)}
                            </td>
                            <td style={{ width: "12%" }}>
                              {result?.dob
                                ? moment(result.dob).format("LL")
                                : "-"}
                            </td>
                            <td style={{ width: "10%" }}>{result.dlno}</td>
                            <td style={{ width: "8%" }}>{result.state}</td>
                            <td style={{ width: "8%" }}>{result.zipCode}</td>
                            <td style={{ width: "10%" }}>{(UserStatus as any)[result?.status]}</td>
                          </tr>
                        </>
                      );
                    }) : ""}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Results;
