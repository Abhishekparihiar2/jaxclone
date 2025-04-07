import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { formatPhoneNumber } from "../../../utils/index";
import { EmployeeExportHeader, UserStatus } from "../../../shared/models"
import { ManageEmployeesPage, User, PopupMode } from "../../../store/employees/model";
import
  {
    fetchEmployees, updatePopupStatus, fetchEmployeeDetails, setDeleteEmpId
  } from "../../../store/employees/action";
import { exportData } from "../../../utils";
import { StoreInterface } from "../../../store/index";
import Sorter from "../../../shared/components/sorting/sorter";
import axios from "axios";
import { Loader } from "../../../store/loader/model";


const ManageEmployeeResults = ({
  sortBy,
  sortType,
  setSortBy,
  setSortType
}: {
  sortBy: string;
  sortType: string;
  setSortBy: any;
  setSortType: any;
}) =>
{
  
  const dispatch = useDispatch();
  const pageInfo: ManageEmployeesPage = useSelector(
    ( state: StoreInterface ) => state.manageEmployeesState
  );

  const loading = pageInfo.loadingStatus


  const handlePageSizeChange = ( newPageSize: number ) =>
  {
    dispatch( fetchEmployees( newPageSize, 0 ) );
  };

  const handleExport = async () =>
  {
    let ids: number[] = []
    pageInfo?.usersList  && pageInfo?.usersList.map((employee: User) => employee.id ? ids.push(employee.id) : "")
    try {
      dispatch(new Loader(true).action());
      const response = await axios.post('/api/v1/export/employee', {
        ids,
        pageSize: pageInfo.pageSize,
        pageNumber: pageInfo.pageNumber
      })
      dispatch(new Loader(false).action());
      exportData(
        response.data.data,
        "Employees-" + moment().format( "MMMM-Do-YYYY-HH-mm" ) + ".xlsx",
        EmployeeExportHeader,
        'customer'
      );
    } catch (err) {

    }
    
  };

  const openViewPopup = async (id: number) =>
  {
    await dispatch( fetchEmployeeDetails(id) );
    // if(pageInfo.loadingStatus)
    await dispatch(updatePopupStatus(PopupMode.VIEW)); 
  }
  const openEditPopup = async (id: number) =>
  {
    await dispatch( fetchEmployeeDetails(id) );
    // if(!pageInfo.loadingStatus)
    await dispatch(updatePopupStatus(PopupMode.EDIT));
  }
  const openDeletePopup = async (id:number) =>
  {
    await dispatch(setDeleteEmpId(id));
    await dispatch(updatePopupStatus(PopupMode.DELETE));
  }

  return (
    <>
      <section className="card mb20">
        <div className="card-body pb-0">
          <div className="table-head">
            <div className="row">
              <div className="col-md-6">
                <h3 className="mb-0">Employee Details</h3>
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
                      <option selected={pageInfo.pageSize  === 5 ? true : false}>
                        5
                      </option>
                      <option selected={pageInfo.pageSize === 10 ? true : false}>
                        10
                      </option>
                      <option selected={pageInfo.pageSize === 20 ? true : false}>
                        20
                      </option>
                      <option selected={pageInfo.pageSize === 50 ? true : false}>
                        50
                      </option>
                    </select>
                  </div>
                  <div className="export-btn ml-2">
                    <button
                      className="btn btn-orange"
                      type="submit"
                      onClick={handleExport}
                    >
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
                    <th style={{ width: "20%" }} onClick={()=>{ setSortBy('firstName'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                      Full Name
                      <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'firstName'} />
                      </th>
                    <th style={{ width: "15%" }} onClick={()=>{ setSortBy('employeeNumber'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                      Employee No.
                      <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'employeeNumber'} />
                      </th>
                    <th style={{ width: "15%" }} onClick={()=>{ setSortBy('phoneNumber'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                      Phone No.
                      <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'phoneNumber'} />
                      </th>
                    <th style={{ width: "25%" }} onClick={()=>{ setSortBy('email'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                      Email
                      <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'email'} />
                      </th>
                    <th style={{ width: "10%" }} onClick={()=>{ setSortBy('status'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                      Status
                      <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'status'} />
                      </th>
                    <th style={{ width: "15%" }}>
                      Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pageInfo?.usersList && pageInfo.usersList.length
                    ? pageInfo.usersList.map((result: User) => {
                        return (
                          <>
                            <tr>
                              <td>{`${result.firstName} ${result.lastName}`}</td>

                              <td>{result.employeeNumber || '-'}</td>
                              <td>
                                {result?.phoneNumber
                                  ? formatPhoneNumber(result.phoneNumber)
                                  : "-"}
                              </td>
                              <td>{result.email}</td>
                              <td>{result?.status ? (UserStatus as any)[result.status] : "-"}</td>
                              <td className="td-action">
                                <button
                                  type="button"
                                  className="btn btn-outline-info btn-xs mr-1"
                                  title="View"
                                  data-toggle="modal"
                                  data-target="#viewEmpModal"
                                  onClick={ ( e ) => {if(result.id)  openViewPopup( result.id ) } }
                                >
                                  <i
                                    className="fa fa-eye"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary btn-xs mr-1"
                                  title="Edit"
                                  data-toggle="modal"
                                  data-target="#editEmpModal"
                                  onClick={ ( e ) => {if(result.id)  openEditPopup( result.id ) } }
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
                                  onClick={ ( e ) => {if(result.id)  openDeletePopup( result.id ) } }
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
                      })
                    : ""}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageEmployeeResults;
