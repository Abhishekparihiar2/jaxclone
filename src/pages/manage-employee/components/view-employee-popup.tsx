import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../../store";
import { ManageEmployeesPage } from "../../../store/employees/model";
import { formatDate, formatPhoneNumber } from "../../../utils";
import moment from "moment";
import EmployeeNotes from "./employee-notes";
import { addNote, deleteNote, fetchNotes } from "../../../store/notes/action";
import { Note, NoteSearchCriteria, NotesSectionState } from "../../../store/notes/model";
import EmployeeDocuments from "./employee-documents";
import { DocumentInterface } from "../../customers/shared/add-documents";
import axios from "axios";
import { AddCustomerDocuments, UpdateCustomerDocuments } from "../../../store/customers/model";
import { ResponseSuccess } from "../../../store/shared/model";
import Api from "../../../Api";
import { Loader } from "../../../store/loader/model";

const ViewEmployeePopup = () =>
{
  const [customerDocuments, setCustomerDocuments] = useState<DocumentInterface[]>([]);
  const dispatch = useDispatch();
  const pageInfo: ManageEmployeesPage = useSelector(
    ( state: StoreInterface ) => state.manageEmployeesState
  );
  const [ permissions, setPermissions ] = useState<any>( {
    access_dashboard: true,
    access_rentals: true,
    access_vehicles: true,
    access_customers: true,
    access_inspections: true,
    access_background_checks: true,
    access_manage_employee: true,
    access_revenue: true,
    access_custom_settings: true,
  } );
  const notes: NotesSectionState = useSelector(
    (state: StoreInterface) => state.notesSection
  );
  const handleAddNote = (noteFromPopup: Note) => {
    if (pageInfo?.user?.id) {
      dispatch(addNote({ ...noteFromPopup, userId: pageInfo.user.id }));
    }
  };

  const handleUpdate = (index: number, noteFromPopup: Note) => {
  };

  const handleDelete = (index: number) => {
    var notesLocal = [...notes.notesList];
    if (pageInfo?.user?.id) {
      dispatch(deleteNote(notesLocal[index]));
    }
  };

  const formDocumentHandler = async (newDoc: DocumentInterface) => {
    if(pageInfo.user?.id){
      const newDocuments = [];
      dispatch(new Loader(true).action());
      const response = await Api.post(`/api/v1/add/documents`, {
        url : newDoc.url,
        userId : pageInfo.user?.id,
        name: newDoc.name
      })
      dispatch(new Loader(false).action());
      newDocuments.push(response.data.data);
      console.log(newDocuments, customerDocuments)
      setCustomerDocuments([...customerDocuments, ...newDocuments]);
      dispatch(new AddCustomerDocuments(newDocuments, pageInfo?.user as any).action())
      dispatch(new ResponseSuccess('Document added successfully!').action())
    }
  }

  const handelDeleteDocument = async (index:  number) => {
    if(customerDocuments[index].id){
      dispatch(new Loader(true).action());
      const response = await axios.delete(`/api/v1/user/documents/delete/${customerDocuments[index].id}`)
      dispatch(new Loader(false).action());
      setCustomerDocuments(response.data.data);
      dispatch(new ResponseSuccess('Document deleted successfully!').action())
      dispatch(new UpdateCustomerDocuments(response.data.data, pageInfo?.user as any).action())
    }
  };

  useEffect( () =>
  {
    if ( pageInfo.user?.id )
    {
      const searchCriteria: NoteSearchCriteria = new NoteSearchCriteria();
      searchCriteria.userId = pageInfo.user?.id;
      dispatch(fetchNotes(searchCriteria));
      setPermissions( { ...JSON.parse( pageInfo.user.permissions || '{}' ) } );
      setCustomerDocuments(pageInfo.user.userDocuments);
    }
  }, [ pageInfo.user ] );

  return (
    <>
      <div className="rental-cust-info">
        <div className="rental-cust-pic">
          <img src={pageInfo.user?.profileImageUrl || "/static/images/profile.png"} alt="" />
        </div>
        <div className="rental-cust-detail">
          <ul className="info-list info-list2-col">
            <li>
              <div className="info-list-item">
                <label className="info-label">Full Name</label>
                <div className="info-name">{`${pageInfo?.user?.firstName ? pageInfo.user.firstName : ""} ${pageInfo?.user?.lastName ? pageInfo.user.lastName : ""}`}</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">Email</label>
                <div className="info-name">{pageInfo?.user?.email ? pageInfo.user.email : ""}</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">Phone Number</label>
                <div className="info-name">{pageInfo?.user?.phoneNumber ? formatPhoneNumber(pageInfo.user.phoneNumber) : ""}</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">Employee Number</label>
                <div className="info-name">{pageInfo?.user?.employeeNumber || ''}</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">Date of Birth</label>
                <div className="info-name">{pageInfo?.user?.dob ? moment(pageInfo.user.dob).format("MM/DD/YYYY") : ""}</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">Address 1</label>
                <div className="info-name">{pageInfo?.user?.addressLine1 ? pageInfo?.user?.addressLine1 : ""}</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">Address 2</label>
                <div className="info-name">{pageInfo?.user?.addressLine2 ? pageInfo?.user?.addressLine2 : ""}</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">City</label>
                <div className="info-name">{pageInfo?.user?.city ? pageInfo?.user?.city : ""}</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">State</label>
                <div className="info-name">{pageInfo?.user?.state ? pageInfo?.user?.state : ""}</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">Zip Code</label>
                <div className="info-name">{pageInfo?.user?.zipCode ? pageInfo?.user?.zipCode : ""}</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">Driver License No.</label>
                <div className="info-name">{pageInfo?.user?.driverLicenseDetail?.number ? pageInfo?.user?.driverLicenseDetail.number : ""}</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">Issuing State</label>
                <div className="info-name">{pageInfo?.user?.driverLicenseDetail?.state ? pageInfo?.user?.driverLicenseDetail.state : ""}</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">Issue Date</label>
                <div className="info-name">{pageInfo?.user?.driverLicenseDetail?.issueDate ? formatDate(new Date(pageInfo?.user?.driverLicenseDetail.issueDate)) : ""}</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">Expiration Date</label>
                <div className="info-name">{pageInfo?.user?.driverLicenseDetail?.expDate ? formatDate(new Date(pageInfo?.user?.driverLicenseDetail.expDate)) : ""}</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">DL Front</label>
                <div className="info-name">
                  <a
                    href={pageInfo.user?.driverLicenseDetail?.frontImageUrl ? pageInfo.user.driverLicenseDetail.frontImageUrl : "#"}
                    className="btn btn-outline-success btn-xs mr-1"
                    title="Download Document"
                    target={pageInfo.user?.driverLicenseDetail?.frontImageUrl ? "_blank" : "_self"}
                    rel="noreferrer"
                  >
                    <i className="fa fa-download mr-1" aria-hidden="true"></i>
                    Download Document
                  </a>
                </div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">DL Back</label>
                <div className="info-name">
                  <a
                    href={pageInfo.user?.driverLicenseDetail?.backImageUrl ? pageInfo.user.driverLicenseDetail.backImageUrl : "#"}
                    className="btn btn-outline-success btn-xs mr-1"
                    title="Download Document"
                    target={pageInfo.user?.driverLicenseDetail?.frontImageUrl ? "_blank" : "_self"} rel="noreferrer"
                  >
                    <i className="fa fa-download mr-1" aria-hidden="true"></i>
                    Download Document
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mt-3">
          <h3>Permission</h3>
          <div className="permission-control">
            <div className="control_inline">
              <label className="control control--checkbox">
                Dashboard
                <input type="checkbox" disabled={true} checked={permissions?.access_dashboard || false} className="form-check-input" />
                <div className="control__indicator"></div>
              </label>
              <label className="control control--checkbox">
                Rentals
                <input type="checkbox" disabled={true} checked={permissions?.access_rentals || false} className="form-check-input" />
                <div className="control__indicator"></div>
              </label>
              <label className="control control--checkbox">
                Vehicles
                <input type="checkbox" disabled={true} checked={permissions?.access_vehicles || false} className="form-check-input" />
                <div className="control__indicator"></div>
              </label>
              <label className="control control--checkbox">
                Customers
                <input type="checkbox" disabled={true} checked={permissions?.access_customers || false} className="form-check-input" />
                <div className="control__indicator"></div>
              </label>
              <label className="control control--checkbox">
                Inspections
                <input type="checkbox" disabled={true} checked={permissions?.access_inspections || false} className="form-check-input" />
                <div className="control__indicator"></div>
              </label>
              <label className="control control--checkbox">
                Background Checks
                <input type="checkbox" disabled={true} checked={permissions?.access_background_checks || false} className="form-check-input" />
                <div className="control__indicator"></div>
              </label>
              <label className="control control--checkbox">
                Manage Employee
                <input type="checkbox" disabled={true} checked={permissions?.access_manage_employee || false} className="form-check-input" />
                <div className="control__indicator"></div>
              </label>
              <label className="control control--checkbox">
                Revenue
                <input type="checkbox" disabled={true} checked={permissions?.access_revenue || false} className="form-check-input" />
                <div className="control__indicator"></div>
              </label>
              <label className="control control--checkbox">
                Custom Settings
                <input type="checkbox" disabled={true} checked={permissions?.access_custom_settings || false} className="form-check-input" />
                <div className="control__indicator"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <EmployeeDocuments customerDocuments={customerDocuments} setCustomerDocuments={setCustomerDocuments} formDocumentHandler={formDocumentHandler} handelDeleteDocument={handelDeleteDocument} />
        <EmployeeNotes
              handleSave={(s) => handleAddNote(s)}
              handleNoteUpdate={(i, n) => handleUpdate(i, n)}
              handleDelete={(i) => handleDelete(i)}
              savedNote={notes.notesList}
            />
      </div>
    </>
  );
};
export default ViewEmployeePopup;