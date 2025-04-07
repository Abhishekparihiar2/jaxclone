import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../shared/components/layout/layout";
import ManageEmployeeResults from "./components/results";
import { StoreInterface } from "../../store/index";
import { ManageEmployeesPage, PopupMode } from "../../store/employees/model";
import { fetchEmployees, updatePopupStatus, emptyUser } from "../../store/employees/action";
import Pagination from "../../shared/components/pagination/pagination";
import JAXModal from "../../shared/components/modal/jax-modal";
import AddEditEmployeePopup from "./components/add-edit-employee-popup";
import DeleteEmployeePopup from "./components/delete-employee-popup";
import ViewEmployeePopup from "./components/view-employee-popup";

const ManageEmployee = () => {
  const dispatch = useDispatch();
  const [sortType, setSortType] = useState('DESC');
  const [sortBy, setSortBy] = useState('u.updatedAt');
  const pageInfo: ManageEmployeesPage = useSelector(
    (state: StoreInterface) => state.manageEmployeesState
  );
  useEffect(() => {
    dispatch(fetchEmployees(pageInfo.pageSize, pageInfo.pageNumber, { sortBy, sortType}));
    // eslint-disable-next-line
  }, [sortBy, sortType]);
  useEffect(() => {
    dispatch(fetchEmployees(pageInfo.pageSize, pageInfo.pageNumber, { sortBy, sortType}));
    // eslint-disable-next-line
  }, []);

  const changePageNumber = (newPageNumber: number) => {
    dispatch(fetchEmployees(pageInfo.pageSize, newPageNumber, { sortBy, sortType}));
  };

  const closePopup = () => {
    dispatch(updatePopupStatus(PopupMode.OFF));
  };
  
  const openAddEmployeePopup = () =>
  {
    dispatch(emptyUser());
    dispatch(updatePopupStatus(PopupMode.ADD));
  }
  
  return (
    <>
      <Layout>
        <section className="content-body">
          <header className="page-header">
            <div className="page_title">
              <h2>Employees</h2>
            </div>
            <div className="page-header-right">
              <button
                className="btn btn-orange"
                type="submit"
                data-toggle="modal"
                data-target="#addEmpModal"
                onClick={openAddEmployeePopup}
              >
                <i className="fa fa-plus mr-1" aria-hidden="true"></i>Add
                Employee
              </button>
            </div>
          </header>

          <div className="page_content">
            <div className="white-box">
              <ManageEmployeeResults setSortBy={setSortBy} sortBy={sortBy} sortType={sortType} setSortType={setSortType}  />
              <div className="table-paging">
                <Pagination
                  totalItems={pageInfo?.count ? pageInfo.count : 0}
                  totalPageSize={pageInfo.pageSize}
                  pageNumber={pageInfo.pageNumber}
                  changePageNumber={(page) => changePageNumber(page)}
                />
              </div>
            </div>
          </div>
        </section>
      </Layout>

      <JAXModal
        heading={`Add Employee`}
        show={pageInfo.popupMode === PopupMode.ADD}
        handleClose={ () => closePopup() }
        bodyClassName="modal-body-scroll"
        backdrop="static"
      >
        <AddEditEmployeePopup />
      </JAXModal>
      <JAXModal
        heading={`Edit Employee`}
        show={pageInfo.popupMode === PopupMode.EDIT}
        handleClose={ () => closePopup() }
        bodyClassName="modal-body-scroll"
        backdrop="static"
      >
        <AddEditEmployeePopup />
      </JAXModal>
      <JAXModal
        heading={`Delete Employee`}
        show={pageInfo.popupMode === PopupMode.DELETE}
        handleClose={() => closePopup()}
        bodyClassName="text-center"
      >
        <DeleteEmployeePopup />
      </JAXModal>
      <JAXModal
        heading={`View Employee`}
        show={pageInfo.popupMode === PopupMode.VIEW}
        handleClose={ () => closePopup() }
        bodyClassName="modal-body-scroll"
        dialogClassName="employee-view-popup"
      >
        <ViewEmployeePopup />
      </JAXModal>
    </>
  );
};

export default ManageEmployee;
