import React, { useState, useEffect, FormEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../../store";
import { ManageEmployeesPage, PopupMode } from "../../../store/employees/model";
import DatePicker, { ReactDatePicker } from "react-datepicker";
import Api from "../../../Api";
import CustomDropdown from "../../../shared/components/custom-dropdown/custom-dropdown";
import { DROP_DOWN_TYPES } from "../../../shared/models";
import { fetchDropdownValues } from "../../../store/dropdownValues/action";
import { formatDate, formatPhoneNumber, openCalender } from "../../../utils";
import { ResponseError, ResponseSuccess } from "../../../store/shared/model";
import {
  fetchEmployeeDetails,
  fetchEmployees,
  updatePopupStatus,
} from "../../../store/employees/action";
import InputMask from "react-input-mask";
import { fetchUser } from "../../../store/login/action";
import {
  NoteSearchCriteria,
} from "../../../store/notes/model";
import { fetchNotes } from "../../../store/notes/action";
import EmployeeDocuments from "./employee-documents";
import { DocumentInterface } from "../../customers/shared/add-documents";
import { AddCustomerDocuments, UpdateCustomerDocuments } from "../../../store/customers/model";
import axios from "../../../Api";
import { Loader } from "../../../store/loader/model";

const AddEditEmployeePopup = () => {
  const pageInfo: ManageEmployeesPage = useSelector(
    (state: StoreInterface) => state.manageEmployeesState
  );
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(
    pageInfo.user?.dob ? new Date() : null
  );
  const [issueDate, setIssueDate] = useState(
    pageInfo.user?.driverLicenseDetail?.issueDate ? new Date() : null
  );
  const [expirationDate, setExpirationDate] = useState(
    pageInfo.user?.driverLicenseDetail?.expDate ? new Date() : null
  );
  const [form, setForm] = useState<any>({});
  const [fileNameDisplay, setFileNameDisplay] = useState<any>({});
  const [permissions, setPermissions] = useState<any>({});
  const [error, setError] = useState<any>([]);
  const [upLoadingProfileImage, setUploadingProfileImage] = useState(false);
  const [upLoadingdlFront, setUploadingdlFront] = useState(false);
  const [upLoadingdlBack, setUploadingdlBack] = useState(false);
  const [allPermissions, setAllPermissions] = useState<boolean>(false);
  const [customerDocuments, setCustomerDocuments] = useState<DocumentInterface[]>([]);
  const expirationDateRef = useRef<ReactDatePicker<never, undefined> | null>(
    null
  );
  const issueDateRef = useRef<ReactDatePicker<never, undefined> | null>(null);
  const loggedInUserId = useSelector(
    (state: StoreInterface) => state.login.userId
  );

  const handleForm = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const name = e.target.name;
    if (e.target.value) {
      setError(error.filter((v: any) => !v[e.target.name]));
    }
    setForm({
      ...form,
      [name]: e.target.value,
    });
  };

  const handleDropdownForm = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    setAllPermissions(
      permissions.access_dashboard &&
        permissions.access_rentals &&
        permissions.access_vehicles &&
        permissions.access_customers &&
        permissions.access_inspections &&
        permissions.access_background_checks &&
        permissions.access_manage_employee &&
        permissions.access_revenue &&
        permissions.access_custom_settings
    );
  }, [permissions]);

  useEffect(() => {
    dispatch(fetchDropdownValues([DROP_DOWN_TYPES.STATE.toString()]));
  }, [dispatch]);

  const getfileName = (url: string | undefined) => {
    if (url) {
      const split = url.split("/");
      return split[split.length - 1];
    } else {
      return "";
    }
  };

  const handelDeleteDocument = async (index:  number) => {
    if(customerDocuments[index].id){
      const response = await axios.delete(`/api/v1/user/documents/delete/${customerDocuments[index].id}`)
      setCustomerDocuments(response.data.data);
      dispatch(new ResponseSuccess('Document deleted successfully!').action())
      dispatch(new UpdateCustomerDocuments(response.data.data, pageInfo?.user as any).action())
    } else {
      let docs = [...customerDocuments];
      docs.splice(index, 1);
      setCustomerDocuments(docs);
    }
  };

  useEffect(() => {
    if (pageInfo.user?.id) {
      const searchCriteria: NoteSearchCriteria = new NoteSearchCriteria();
      searchCriteria.userId = pageInfo.user?.id;
      dispatch(fetchNotes(searchCriteria));
      setCustomerDocuments(pageInfo.user.userDocuments);
      // eslint-disable-next-line
      setForm({
        ...pageInfo.user,
        fullName: pageInfo.user?.firstName + " " + pageInfo.user?.lastName,
        drivingLicenseNumber: pageInfo.user?.driverLicenseDetail?.number,
        drivingLicenseState: pageInfo.user?.driverLicenseDetail?.state,
        frontImageUrl: pageInfo.user?.driverLicenseDetail?.frontImageUrl,
        backImageUrl: pageInfo.user?.driverLicenseDetail?.backImageUrl,
        phoneNumber: formatPhoneNumber(pageInfo.user?.phoneNumber),
      });
      setPermissions({ ...JSON.parse(pageInfo.user?.permissions || "{}") });
      setStartDate(pageInfo.user?.dob ? new Date(pageInfo.user?.dob) : null);
      setIssueDate(
        pageInfo.user?.driverLicenseDetail?.issueDate
          ? new Date(pageInfo.user?.driverLicenseDetail?.issueDate)
          : null
      );
      setExpirationDate(
        pageInfo.user?.driverLicenseDetail?.expDate
          ? new Date(pageInfo.user?.driverLicenseDetail?.expDate)
          : null
      );
      setFileNameDisplay({
        profileImageUrl: getfileName(pageInfo?.user?.profileImageUrl),
        frontImageUrl: getfileName(
          pageInfo.user?.driverLicenseDetail?.frontImageUrl
        ),
        backImageUrl: getfileName(
          pageInfo.user?.driverLicenseDetail?.backImageUrl
        ),
      });
    } else {
      setForm({})
    }
  }, [pageInfo?.user]);

  const handleChangeImage = async (event: any) => {
    if (event.target.files) {
      if (event.target.name === "profileImageUrl") {
        setUploadingProfileImage(true);
      }
      if (event.target.name === "frontImageUrl") {
        setUploadingdlFront(true);
      }
      if (event.target.name === "backImageUrl") {
        setUploadingdlBack(true);
      }
      const fd = new FormData();
      fd.append("type", `customer/${event.target.name}`);
      fd.append("image", event.target.files[0]);
      try {
        setFileNameDisplay({
          ...fileNameDisplay,
          [event.target.name]: event.target.files[0].name,
        });
        dispatch(new Loader(true).action());
        const response = await Api.post("/api/v1/upload-image", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        dispatch(new Loader(false).action());
        setForm({
          ...form,
          [event.target.name]: response.data.data,
        });

        setUploadingProfileImage(false);
        setUploadingdlFront(false);
        setUploadingdlBack(false);
      } catch (err: any) {
        console.log(err.message);
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let obj = {
      ...form,
      firstName:
        form?.fullName && form?.fullName.indexOf(" ") > -1
          ? form?.fullName?.slice(0, form?.fullName?.lastIndexOf(" "))
          : form.fullName,
      lastName:
        form?.fullName && form?.fullName.indexOf(" ") > -1
          ? form?.fullName?.slice(
              form?.fullName?.lastIndexOf(" ") + 1,
              form.fullName?.length
            )
          : "",
      dob: formatDate(startDate as Date),
      issueDate: formatDate(issueDate as Date),
      expDate: formatDate(expirationDate as Date),
      phoneNumber: form.phoneNumber
        ? form.phoneNumber
            .replace("-", "")
            .replace(" ", "")
            .replace("(", "")
            .replace(")", "")
        : form.phoneNumber,
      permissions: {
        ...permissions,
      },
    };
    if ( !validateFields( obj ) )
    {
      dispatch(new ResponseError("Please provide details for mandatory feilds!").action())
      return false;
    }
    delete obj.fullName;
    if (pageInfo.popupMode === PopupMode.EDIT) {
      if (pageInfo?.user?.id) {
        dispatch(new Loader(true).action());
        Api.put(`/api/v1/user/${pageInfo.user.id}/admin/update`, obj)
          .then(function (response) {
            dispatch(new Loader(false).action());
            pageInfo?.user?.id &&
              dispatch(fetchEmployeeDetails(pageInfo.user.id));
            dispatch(fetchEmployees(10, 0));
            dispatch(updatePopupStatus(PopupMode.OFF));
            if (loggedInUserId === pageInfo?.user?.id) {
              dispatch(fetchUser());
            }
          })
          .then(function (res) {
            dispatch(
              new ResponseSuccess(
                "Employee details updated successfully."
              ).action()
            );
          })
          .catch(function (error) {
            dispatch(new Loader(false).action());
            dispatch(new ResponseError(error.response.data.message).action());
          });
      }
    } else {
      dispatch(new Loader(true).action());
      Api.post("/api/v1/users/create", obj)
        .then(function (response) {
          dispatch(new Loader(false).action());
          dispatch(fetchEmployees(10, 0));
          dispatch(updatePopupStatus(PopupMode.OFF));
        })
        .then(function (res) {
          dispatch(new Loader(false).action());
          dispatch(
            new ResponseSuccess("Employee added successfully.").action()
          );
        })
        .catch(function (error) {
          dispatch(new ResponseError(error.response.data.message).action());
        });
    }
  };

  const validateFields = (obj: any) => {
    let valid = true;
    let errorArr = [];
    if (!obj.fullName) {
      errorArr.push({
        fullName: "Please enter a valid Full Name",
      });
      valid = false;
    }
    const validEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!obj.email || !validEmailRegex.test(obj.email)) {
      errorArr.push({
        email: "Please provide valid email address",
      });
      valid = false;
    }
    if (!obj.phoneNumber) {
      errorArr.push({
        phoneNumber: "Please provide valid phone number.",
      });
      valid = false;
    }
    if (!obj.employeeNumber) {
      errorArr.push({
        employeeNumber: "Please provide valid employee number.",
      });
      valid = false;
    }
    if (!startDate) {
      errorArr.push({
        dob: "Please provide valid dob.",
      });
      valid = false;
    }
    if (!obj.addressLine1) {
      errorArr.push({
        addressLine1: "Please provide valid address line 1.",
      });
      valid = false;
    }
    if (!obj.addressLine2) {
      errorArr.push({
        addressLine2: "Please provide valid address line 2.",
      });
      valid = false;
    }
    if (!obj.city) {
      errorArr.push({
        city: "Please provide valid city.",
      });
      valid = false;
    }
    if (!obj.state) {
      errorArr.push({
        state: "Please provide valid state.",
      });
      valid = false;
    }
    if (!obj.zipCode) {
      errorArr.push({
        zipCode: "Please provide valid zip code.",
      });
      valid = false;
    }
    if (!obj.drivingLicenseNumber) {
      errorArr.push({
        drivingLicenseNumber: "Please provide valid license number.",
      });
      valid = false;
    }
    if (!obj.drivingLicenseState) {
      errorArr.push({
        drivingLicenseState: "Please provide valid state.",
      });
      valid = false;
    }
    if (!issueDate) {
      errorArr.push({
        issueDate: "Please provide valid issue date.",
      });
      valid = false;
    }
    if (!expirationDate) {
      errorArr.push({
        expirationDate: "Please provide expiration date.",
      });
      valid = false;
    }
    if (!obj.frontImageUrl) {
      errorArr.push({
        frontImageUrl: "Please provide  dl front image.",
      });
      valid = false;
    }
    if (!obj.backImageUrl) {
      errorArr.push({
        backImageUrl: "Please provide dl back image.",
      });
      valid = false;
    }
    if (!obj.profileImageUrl) {
      errorArr.push({
        profileImageUrl: "Please provide profile image.",
      });
      valid = false;
    }
    setError(errorArr);
    return valid;
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
      newDocuments.push(response.data.data)
      dispatch(new AddCustomerDocuments(newDocuments, pageInfo?.user as any).action())
      dispatch(new ResponseSuccess('Document added successfully!').action())
    } else {
      setForm({
        ...form,
        documents: form.documents && form.documents.length > 0  ? [...form.documents, newDoc] : [newDoc],
      });
    }
  }

  return (
    <>
      <form name="add-edit-employee" onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name={"fullName"}
                value={form.fullName}
                onChange={(e) => handleForm(e)}
                className="form-control"
                placeholder="John Doe"
              />
              {error && Array.isArray(error) ? (
                <span style={{ color: "red", fontSize: "10px" }}>
                  {error.map((error: any) => {
                    return error.fullName;
                  })}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name={"email"}
                value={form.email}
                disabled={pageInfo.popupMode === PopupMode.EDIT}
                onChange={(e) => handleForm(e)}
                className="form-control"
                placeholder="john21@gmail.com"
              />
              {error && Array.isArray(error) ? (
                <span style={{ color: "red", fontSize: "10px" }}>
                  {error.map((error: any) => {
                    return error.email;
                  })}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Phone Number</label>
              <InputMask
                mask="(999) 999-9999"
                name={"phoneNumber"}
                value={form.phoneNumber}
                onChange={(e: any) => handleForm(e)}
                className="form-control"
                placeholder="45891245689"
              />
              {error && Array.isArray(error) ? (
                <span style={{ color: "red", fontSize: "10px" }}>
                  {error.map((error: any) => {
                    return error.phoneNumber;
                  })}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Employee Number</label>
              <input
                type="text"
                disabled={pageInfo.popupMode === PopupMode.EDIT}
                className="form-control"
                placeholder="E000011"
                name={"employeeNumber"}
                value={form.employeeNumber}
                onChange={(e) => handleForm(e)}
              />
              {error && Array.isArray(error) ? (
                <span style={{ color: "red", fontSize: "10px" }}>
                  {error.map((error: any) => {
                    return error.employeeNumber;
                  })}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="date-label date-new-label">
                Date of Birth
              </label>
              <div className="calendar-input">
                  <DatePicker
                    dateFormat="MM/dd/yyyy"
                    className="form-control placeholder-dark"
                    selected={startDate}
                    onChange={(date) => {
                      date && setStartDate(date);
                      setError(error.filter((v: any) => !v["dob"]));
                    }}
                    showYearDropdown
                    showMonthDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    useShortMonthInDropdown
                    maxDate={new Date()}
                  />
                  <span className="btn calendar-btn">
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                  </span>
                  {error && Array.isArray(error) ? (
                    <span style={{ color: "red", fontSize: "10px" }}>
                      {error.map((err: any) => err.dob)}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Address 1</label>
              <input
                type="text"
                name={"addressLine1"}
                value={form.addressLine1}
                onChange={(e) => handleForm(e)}
                className="form-control"
                placeholder="ATL302025"
              />
              {error && Array.isArray(error) ? (
                <span style={{ color: "red", fontSize: "10px" }}>
                  {error.map((error: any) => error.addressLine1)}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Address 2</label>
              <input
                type="text"
                name="addressLine2"
                value={form.addressLine2}
                onChange={(e) => handleForm(e)}
                className="form-control"
                placeholder="ATL302025"
              />
              {error && Array.isArray(error) ? (
                <span style={{ color: "red", fontSize: "10px" }}>
                  {error.map((error: any) => error.addressLine2)}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={(e) => handleForm(e)}
                className="form-control"
                placeholder="Enter city name"
              />
              {error && Array.isArray(error) ? (
                <span style={{ color: "red", fontSize: "10px" }}>
                  {error.map((error: any) => error.city)}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>State</label>
              <CustomDropdown
                type={DROP_DOWN_TYPES.STATE.toString()}
                name={"state"}
                value={form?.state ? form.state : ""}
                placeholder={"Choose a State..."}
                onChange={(name, value) => {
                  handleDropdownForm("state", value);
                }}
              />
              {error && Array.isArray(error) ? (
                <span style={{ color: "red", fontSize: "10px" }}>
                  {error.map((error: any) => error.state)}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Zip Code</label>
              <input
                type="text"
                name="zipCode"
                onChange={(e) => handleForm(e)}
                value={form.zipCode}
                className="form-control"
                placeholder="ATL302025"
              />
              {error && Array.isArray(error) ? (
                <span style={{ color: "red", fontSize: "10px" }}>
                  {error.map((error: any) => error.zipCode)}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Driver License Number</label>
              <input
                type="text"
                name="drivingLicenseNumber"
                onChange={(e) => handleForm(e)}
                value={form?.drivingLicenseNumber}
                className="form-control"
                placeholder="ATL302025"
              />
              {error && Array.isArray(error) ? (
                <span style={{ color: "red", fontSize: "10px" }}>
                  {error.map((error: any) => error.drivingLicenseNumber)}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Issuing State</label>
              <CustomDropdown
                type={DROP_DOWN_TYPES.STATE.toString()}
                name={"drivingLicenseState"}
                value={
                  form?.drivingLicenseState ? form.drivingLicenseState : ""
                }
                placeholder={"Choose a State..."}
                onChange={(name, value) => {
                  handleDropdownForm("drivingLicenseState", value);
                }}
              />
              {error && Array.isArray(error) ? (
                <span style={{ color: "red", fontSize: "10px" }}>
                  {error.map((error: any) => error.drivingLicenseState)}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="date-label date-new-label">
                Issue Date
              </label>
              <div className="calendar-input">
                  <DatePicker
                    ref={(c) => (issueDateRef.current = c)}
                    dateFormat="MM/dd/yyyy"
                    className="form-control placeholder-dark"
                    selected={issueDate}
                    onChange={(date) => {
                      date && setIssueDate(date);
                      setError(error.filter((v: any) => !v["issueDate"]));
                    }}
                    showYearDropdown
                    showMonthDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    useShortMonthInDropdown
                    maxDate={new Date()}
                  />
                  <span
                    className="btn calendar-btn"
                    onClick={() => openCalender(issueDateRef)}
                  >
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                  </span>
                  {error && Array.isArray(error) ? (
                    <span style={{ color: "red", fontSize: "10px" }}>
                      {error.map((error: any) => error.issueDate)}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="date-label date-new-label">
                Expiration Date
              </label>
              <div className="calendar-input">
                  <DatePicker
                    ref={(c) => (expirationDateRef.current = c)}
                    dateFormat="MM/dd/yyyy"
                    className="form-control placeholder-dark"
                    selected={expirationDate}
                    onChange={(date) => {
                      date && setExpirationDate(date);
                      setError(error.filter((v: any) => !v["expirationDate"]));
                    }}
                    showYearDropdown
                    showMonthDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    useShortMonthInDropdown
                    minDate={new Date()}
                  />
                  <span
                    className="btn calendar-btn"
                    onClick={() => openCalender(expirationDateRef)}
                  >
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                  </span>
                  {error && Array.isArray(error) ? (
                    <span style={{ color: "red", fontSize: "10px" }}>
                      {error.map((error: any) => error.expirationDate)}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Upload DL Front</label>
              <div className="custom-file">
                <input
                  type="file"
                  name="frontImageUrl"
                  disabled={upLoadingProfileImage || upLoadingdlBack}
                  onChange={(e) => handleChangeImage(e)}
                  className="custom-file-input"
                  id="dlFront"
                />
                <label
                  className={`custom-file-label ${
                    fileNameDisplay.frontImageUrl ? "ellipsis" : ""
                  }`}
                >
                  {fileNameDisplay.frontImageUrl
                    ? fileNameDisplay.frontImageUrl
                    : "Select file"}
                </label>
                {error && Array.isArray(error) ? (
                  <span style={{ color: "red", fontSize: "10px" }}>
                    {error.map((error: any) => error.frontImageUrl)}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Upload DL Back</label>
              <div className="custom-file">
                <input
                  type="file"
                  name="backImageUrl"
                  disabled={upLoadingProfileImage || upLoadingdlFront}
                  onChange={(e) => handleChangeImage(e)}
                  className="custom-file-input"
                  id="dlBack"
                />
                <label
                  className={`custom-file-label ${
                    fileNameDisplay.backImageUrl ? "ellipsis" : ""
                  }`}
                >
                  {fileNameDisplay.backImageUrl
                    ? fileNameDisplay.backImageUrl
                    : "Select file"}
                </label>
                {error && Array.isArray(error) ? (
                  <span style={{ color: "red", fontSize: "10px" }}>
                    {error.map((error: any) => error.backImageUrl)}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Upload Profile Picture</label>
              <div className="custom-file">
                <input
                  type="file"
                  name="profileImageUrl"
                  disabled={upLoadingdlFront || upLoadingdlFront}
                  onChange={(e) => handleChangeImage(e)}
                  className="custom-file-input"
                  id="profile"
                />
                <label
                  className={`custom-file-label ${
                    fileNameDisplay.profileImageUrl ? "ellipsis" : ""
                  }`}
                >
                  {fileNameDisplay.profileImageUrl
                    ? fileNameDisplay.profileImageUrl
                    : "Select file"}
                </label>
                {error && Array.isArray(error) ? (
                  <span style={{ color: "red", fontSize: "10px" }}>
                    {error.map((error: any) => error.profileImageUrl)}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <EmployeeDocuments customerDocuments={customerDocuments} setCustomerDocuments={setCustomerDocuments} formDocumentHandler={formDocumentHandler} handelDeleteDocument={handelDeleteDocument} />
          <div className="col-md-12 mt-3">
            <h3>Permission</h3>
            <div className="permission-control">
              <div className="control_inline">
                <label className="control control--checkbox">
                  Select All
                  <input
                    name={"allPermissions"}
                    onChange={(e) => {
                      setPermissions({
                        ...permissions,
                        access_dashboard: e.target.checked ? true : false,
                        access_rentals: e.target.checked ? true : false,
                        access_vehicles: e.target.checked ? true : false,
                        access_customers: e.target.checked ? true : false,
                        access_inspections: e.target.checked ? true : false,
                        access_background_checks: e.target.checked
                          ? true
                          : false,
                        access_manage_employee: e.target.checked ? true : false,
                        access_revenue: e.target.checked ? true : false,
                        access_custom_settings: e.target.checked ? true : false,
                      });
                    }}
                    checked={allPermissions}
                    value="allPermissions"
                    type="checkbox"
                    className="form-check-input"
                  />
                  <div className="control__indicator"></div>
                </label>
                <br />
                <br />
                <label className="control control--checkbox">
                  Dashboard
                  <input
                    name={"dashboard"}
                    onClick={(e) =>
                      setPermissions({
                        ...permissions,
                        access_dashboard: !permissions.access_dashboard,
                      })
                    }
                    checked={permissions?.access_dashboard}
                    value={permissions?.access_dashboard}
                    type="checkbox"
                    className="form-check-input"
                  />
                  <div className="control__indicator"></div>
                </label>
                <label className="control control--checkbox">
                  Rentals
                  <input
                    name={"rentals"}
                    onClick={(e) =>
                      setPermissions({
                        ...permissions,
                        access_rentals: !permissions.access_rentals,
                      })
                    }
                    checked={permissions?.access_rentals}
                    value={permissions?.access_rentals}
                    type="checkbox"
                    className="form-check-input"
                  />
                  <div className="control__indicator"></div>
                </label>
                <label className="control control--checkbox">
                  Vehicles
                  <input
                    name={"vehicles"}
                    onClick={(e) =>
                      setPermissions({
                        ...permissions,
                        access_vehicles: !permissions.access_vehicles,
                      })
                    }
                    checked={permissions?.access_vehicles}
                    value={permissions?.access_vehicles}
                    type="checkbox"
                    className="form-check-input"
                  />
                  <div className="control__indicator"></div>
                </label>
                <label className="control control--checkbox">
                  Customers
                  <input
                    name={"customers"}
                    onClick={(e) =>
                      setPermissions({
                        ...permissions,
                        access_customers: !permissions.access_customers,
                      })
                    }
                    checked={permissions?.access_customers}
                    value={permissions?.access_customers}
                    type="checkbox"
                    className="form-check-input"
                  />
                  <div className="control__indicator"></div>
                </label>
                <label className="control control--checkbox">
                  Inspections
                  <input
                    name={"messages"}
                    onClick={(e) =>
                      setPermissions({
                        ...permissions,
                        access_inspections: !permissions.access_inspections,
                      })
                    }
                    checked={permissions?.access_inspections}
                    value={permissions?.access_inspections}
                    type="checkbox"
                    className="form-check-input"
                  />
                  <div className="control__indicator"></div>
                </label>
                <label className="control control--checkbox">
                  Background Checks
                  <input
                    name={"maintenance"}
                    onClick={(e) =>
                      setPermissions({
                        ...permissions,
                        access_background_checks:
                          !permissions.access_background_checks,
                      })
                    }
                    checked={permissions?.access_background_checks}
                    value={permissions?.access_background_checks}
                    type="checkbox"
                    className="form-check-input"
                  />
                  <div className="control__indicator"></div>
                </label>
                <label className="control control--checkbox">
                  Manage Employee
                  <input
                    name={"promo_codes"}
                    onClick={(e) =>
                      setPermissions({
                        ...permissions,
                        access_manage_employee:
                          !permissions.access_manage_employee,
                      })
                    }
                    checked={permissions?.access_manage_employee}
                    value={permissions?.access_manage_employee}
                    type="checkbox"
                    className="form-check-input"
                  />
                  <div className="control__indicator"></div>
                </label>
                <label className="control control--checkbox">
                  Revenue
                  <input
                    name={"vendor"}
                    onClick={(e) =>
                      setPermissions({
                        ...permissions,
                        access_revenue: !permissions.access_revenue,
                      })
                    }
                    checked={permissions?.access_revenue}
                    value={permissions?.access_revenue}
                    type="checkbox"
                    className="form-check-input"
                  />
                  <div className="control__indicator"></div>
                </label>
                <label className="control control--checkbox">
                  Custom Settings
                  <input
                    name={"vendor"}
                    onClick={(e) =>
                      setPermissions({
                        ...permissions,
                        access_custom_settings:
                          !permissions.access_custom_settings,
                      })
                    }
                    checked={permissions?.access_custom_settings}
                    value={permissions?.access_custom_settings}
                    type="checkbox"
                    className="form-check-input"
                  />
                  <div className="control__indicator"></div>
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <button className="btn btn-orange pull-left" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddEditEmployeePopup;
