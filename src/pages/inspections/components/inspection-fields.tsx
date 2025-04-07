import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../../shared/components/layout/layout";
import { Rental } from "../../../store/rentals/model";
import { formatDate } from "../../../utils/index";
import Api from "../../../Api";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import VehicleImages from "./vehicle-images";
import VehicleTire from "./vehicle-tire";
import VehicleSideBreak from "./vehicle-side-break";
import VehicleFunctions from "./vehicle-function";
import VehicleTasks from "./vehicle-tasks";
import VehicleInternals from "./vehicle-internals";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../../store";
import { ResponseSuccess, ResponseError } from "../../../store/shared/model";
import { Inspection, Vehicle } from "../../../shared/models";
import { Loader } from "../../../store/loader/model";

const InspectionFields = ({
  isView,
  inspectionData,
}: {
  isView?: boolean;
  inspectionData?: Inspection;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imageErrorText = "Please provide image";
  let [searchParams] = useSearchParams();
  const rentalId = searchParams.get("rentalId");
  const vehicleId = searchParams.get("vehicleId");
  const newVehicleId = searchParams.get("newVehicleId");
  const initialVehicle = searchParams.get("initialVehicle");
  const switchType = searchParams.get("switch");
  const switchId = searchParams.get("switchId");
  console.log(switchId)
  const type = searchParams.get("type");
  const [form, setForm] = useState<Inspection>(new Inspection(null));
  const [lastOdometer, setLastOdometer] = useState<null|number>(0);
  const [errors, setErrors] = useState<any>([]);
  const loginState = useSelector((state: StoreInterface) => state.login);
  const [uploadingPrimatyImage, setUploadingPrimaryImage] =
    useState<boolean>(false);
  const [uploadingImageType, setUploadingImageType] = useState<string>("");
  useLayoutEffect(() => {
    setForm(new Inspection(null))
  },[])
  useEffect(() => {
    let newForm = { ...form };
    if (isView && inspectionData) {
      newForm = inspectionData;
    }
    if (rentalId && !switchType && type) {
      dispatch(new Loader(true).action());
      Api.get(`/api/v1/bookings/${rentalId}/details`)
        .then(function (response) {
          dispatch(new Loader(false).action());
          if (response?.data?.data) {
            const rentalData = new Rental(response.data.data);
            setForm({
              ...newForm,
              rentalId: Number(rentalId),
              inspectionTypeId: Number(type),
              rentalNumber: rentalData.rentalNumber,
              vehicleNumber: rentalData.vehicleDetails.number,
              vehicleId: rentalData.vehicleId,
              inspector:loginState?.name ? loginState.name : "",
            });
            setLastOdometer(rentalData.inspections?.odometer || 0)
          } else {
            navigate(`/rental-details/${rentalId}`);
          }
        })
        .catch(function (error) {
          navigate(`/rental-details/${rentalId}`);
        });
    } else if(vehicleId && type) {
      dispatch(new Loader(true).action());
      Api.get(`/api/v1/vehicles/show/${vehicleId}`)
      .then(function (response) {
        dispatch(new Loader(false).action());
        if (response?.data?.data) {
          const vehicleData = new Vehicle(response.data.data);
          setForm({
            ...newForm,
            inspectionTypeId: Number(type),
            vehicleNumber: vehicleData.number,
            vehicleId: vehicleData.id,
            inspector:loginState.name ? loginState.name : ""
          });
          if(Number(type) === 3)
            setLastOdometer(vehicleData.odometer || 0)
        } else {
          navigate(`/vehicle-detail/${vehicleId}`);
        }
      })
      .catch(function (error) {
        navigate(`/vehicle-detail/${vehicleId}`);
      });
    } else if((initialVehicle || newVehicleId) && type) {
      let id = null
      if(initialVehicle && switchType && switchType === 'open') {
        id = initialVehicle
      } else {
        id = newVehicleId
      }
      dispatch(new Loader(true).action());
      Api.get(`/api/v1/vehicles/show/${id}`)
      .then(function (response) {
        dispatch(new Loader(false).action());
        if (response?.data?.data) {
          const vehicleData = new Vehicle(response.data.data);
          Api.get(`/api/v1/bookings/${rentalId}/details`).then((rentalResponse) => {
            if(rentalResponse.data.data) {
              const rentalData = new Rental(rentalResponse.data.data);
              setForm({
                ...newForm,
                inspectionTypeId: Number(type),
                vehicleNumber: vehicleData.number,
                vehicleId: vehicleData.id,
                inspector:loginState.name ? loginState.name : "",
                rentalId: Number(rentalId),
                rentalNumber: rentalData.rentalNumber,
              });
            } else {
              navigate(`/rental-details/${rentalId}`);
            }
          }).catch(() => {
            navigate(`/rental-details/${rentalId}`);
          })
        } else {
          navigate(`/vehicle-detail/${initialVehicle}`);
        }
      })
      .catch(function (error) {
        navigate(`/vehicle-detail/${initialVehicle}`);
      });
    } else {
      setForm({
        ...newForm,
      });
    }
    // eslint-disable-next-line
  }, [inspectionData]);

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();
      const validData: boolean = validate();
      if (validData && ((rentalId || vehicleId || newVehicleId || initialVehicle) && type)) {
        form.rentalId = Number(rentalId);
        form.inspectionTypeId = Number(type);
        form.date = form.date ? form.date : new Date();
        delete form.id;
        // add the inspection
        dispatch(new Loader(true).action());
        const data = await (
          await Api.post("/api/v1/inspections/create", {
            ...form,
            userId: loginState.userId,
            switch: switchType ? true : false
          })
        )?.data?.data;
        dispatch(new Loader(false).action());
        if (data) {
          if (form.inspectionTypeId === 1) {
            if(rentalId && !switchType)
              // updateRentalStatus("ACTIVE");
              navigate(`/rental-details/${rentalId}`);
            if(vehicleId)
              updateVehicleStatus("AVAILABLE", vehicleId, true)
            if(switchType && switchType === 'done' && newVehicleId){
              await updateVehicleStatus("BOOKED", newVehicleId, true)  
            }    
          } else if (form.inspectionTypeId === 2) {
            if(rentalId && !switchType)
              updateRentalStatus("FINISHED");
            if(vehicleId)
              updateVehicleStatus("AVAILABLE", vehicleId, true)
            if(switchType && switchType === 'open' && initialVehicle){
              await updateVehicleStatus("AVAILABLE", initialVehicle, false)  
              await updateVehicleSwitch("POST_VEHICLE_INSPECTION")
              window.location.href = `/add-inspection/?newVehicleId=${newVehicleId}&rentalId=${rentalId}&type=1&switch=done&switchId=${switchId}`
            }  
          } 
          else if (form.inspectionTypeId === 3) {
            if(vehicleId)
            navigate(`/vehicle-detail/${vehicleId}`);
          }
        }
      }
    } catch (err: any) {
      throw err.message;
    }
  };

  const updateVehicleSwitch = async (status: string) => {
    return await Api.put(`/api/v1/bookings/${rentalId}/switch`, {
      newVehicleId: newVehicleId,
      oldVehicleId: initialVehicle,
      status,
      id: switchId,
    })
  }
  const updateRentalStatus = async (status: string) => {
    dispatch(new Loader(true).action());
    const response = await Api.post(
      `/api/v1/bookings/${rentalId}/update-status`,
      {
        status: status,
        switch: switchType && switchType === 'done' ? true : false
      }
    );
    dispatch(new Loader(false).action());
    if (response.data.type === "success") {
      dispatch(new ResponseSuccess("Rental Updated Successfully.").action());
      navigate(`/rental-details/${rentalId}`);
    } else {
      dispatch(new ResponseError(response.data.message).action());
    }
  };

  const updateVehicleStatus = async (status: string, id: string, navigateRoute: boolean) => {
    dispatch(new Loader(true).action());
    const response = await Api.put(
      `/api/v1/vehicles/update/${id}`,
      {
        status: status
      }
    );
    dispatch(new Loader(false).action());
    if (response.data.type === "SUCCESS") {
      dispatch(new ResponseSuccess("Vehicle Updated Successfully.").action());
      if(navigateRoute && !rentalId)
        navigate(`/vehicle-detail/${id}`);
      if(navigateRoute && rentalId && switchType === 'done') {
        await Api.put(`/api/v1/rental/update/${rentalId}`, {
          vehicleId: newVehicleId,
        })
        await updateVehicleSwitch("DONE")
        if(!switchType) await updateRentalStatus("ACTIVE");
        navigate( `/rental-details/${ rentalId }` );  
        dispatch(new ResponseSuccess("Vehicle switch complete.").action());
      }
    } else {
      dispatch(new ResponseError(response.data.message).action());
    }
  };

  const handleCancel = async (event: any) => {
    navigate(-1);
  };

  const insertErr = (
    name: string,
    message: string,
    errorArr: Array<{
      [key: string]: string;
    }>
  ) => {
    errorArr.push({
      [name]: message,
    });
  };

  const validate = () => {
    let valid = true;
    let errorArr: Array<{ [key: string]: string }> = [];
    console.log(lastOdometer)
    if(rentalId && !form.rentalNumber) {
      insertErr("make", "Please provide rental number!", errorArr);
      valid = false;
    }
    if (!form.vehicleNumber) {
      insertErr("model", "Please provide vehicle number!", errorArr);
      valid = false;
    }

    if (lastOdometer && (form.odometer === 0 || form.odometer < lastOdometer)) {
      insertErr("odometer", "Please add correct odometer reading!", errorArr);
      valid = false;
    }
    
    if (lastOdometer === 0 && form.odometer === 0) {
      insertErr("odometer", "Odometer reading shall be more then 0", errorArr);
      valid = false;
    }

    if (form.odometer && form.odometer > 5000000) {
      insertErr("odometer", "Odometer cannot be more then 5000k!", errorArr);
      valid = false;
    }

    let types = form.vehicleInspectionImages?.map((img) => img.type);
    if (!types?.includes("frontImageUrl")) {
      insertErr("frontImageUrl", imageErrorText, errorArr);
      valid = false;
    }

    if (!types?.includes("passengerImageUrl")) {
      insertErr("passengerImageUrl", imageErrorText, errorArr);
      valid = false;
    }

    if (!types?.includes("driverSideUrl")) {
      insertErr("driverSideUrl", imageErrorText, errorArr);
      valid = false;
    }

    if (!types?.includes("rearSideUrl")) {
      insertErr("rearSideUrl", imageErrorText, errorArr);
      valid = false;
    }

    if (!types?.includes("gaugesUrl")) {
      insertErr("gaugesUrl", imageErrorText, errorArr);
      valid = false;
    }

    if (!valid) {
      window.scrollTo(0, 0);
      dispatch(
        new ResponseError(
          "Please correct mistakes below to submit inspection"
        ).action()
      );
      setErrors(errorArr);
    }
    return valid;
  };
  const handleForm = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >, resetTaskName: undefined | string | null
  ) => {
    const name = e.target.name;
    if(resetTaskName){
      const filteredTask = form.tasks?.filter((task) => task.name !== resetTaskName)
      form.tasks = filteredTask
    }
    setForm({
      ...form,
      [name]: e.target.value,
    });
  };

  const handleDateForm = (name: string, value: Date) => {
    setForm({
      ...form,
      [name]: formatDate(value),
    });
  };

  const handleChangeImage = async (type: string, event: any) => {
    if (event.target.files) {
      setUploadingPrimaryImage(true);
      // setImageURL(URL.createObjectURL(event.target.files[0]));
      const fd = new FormData();
      fd.append('type', 'inspection-images')
      fd.append("image", event.target.files[0]);
      try {
        dispatch(new Loader(true).action());
        const response = await Api.post("/api/v1/upload-image", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        dispatch(new Loader(false).action());
        let imageObj = {
          type,
          imageUrl: response.data.data as string,
        };
        event.target.value = "";
        let vImages = JSON.parse(JSON.stringify(form.vehicleInspectionImages));
        if (
          form.vehicleInspectionImages &&
          form.vehicleInspectionImages.length > 0
        ) {
          let index = form.vehicleInspectionImages.findIndex(
            (img) => img.type === type && img.type !== "other"
          );
          if (index > -1) {
            vImages[index] = imageObj;
          } else {
            vImages.push(imageObj);
          }
        } else {
          vImages.push(imageObj);
        }
        setForm({
          ...form,
          vehicleInspectionImages: vImages,
        });
        setUploadingPrimaryImage(false);
        setUploadingImageType(type);
      } catch (err: any) {
        console.log(err.message);
      }
    }
  };
  return (
    <>
      <Layout>
        {" "}
        <section className="content-body">
          <header className="page-header">
            <div className="page_title">
              <h2>Inspection</h2>
            </div>
          </header>

          <div className="page_content">
            <div className="white-box">
              <div className="table-head border-title">
                <h3 className="mb-0">Add Vehicle</h3>
              </div>
              <div className="add-insp-form">
                <VehicleImages
                  errors={errors}
                  isView={isView || false}
                  form={{ ...form, ...inspectionData }}
                  uploadingImageType={uploadingImageType}
                  uploadingPrimatyImage={uploadingPrimatyImage}
                  handleChangeImage={handleChangeImage}
                />
                <div className="row">
                  <div className="col-md-4 col-lg-3">
                    <div className="form-group">
                      <label>Inspection Type</label>
                      <select
                        className="form-control"
                        name="inspectionTypeId"
                        disabled={true}
                        value={form.inspectionTypeId}
                        onChange={(e) => {
                          handleForm(e, undefined);
                        }}
                      >
                        <option value="3">Initial Inspection</option>
                        <option value="2">Post Rental Inspection</option>
                        <option value="1">Pre Rental Inspection</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <div className="form-group">
                      <label>Rental Number</label>
                      <input
                        className="form-control"
                        placeholder=""
                        disabled={true}
                        value={form.rentalNumber}
                        name="rentalNumber"
                        onChange={(e) => {
                          handleForm(e, undefined);
                        }}
                      />
                      <span style={{ color: "red", fontSize: '10px' }}>
                        {errors && Array.isArray(errors)
                          ? errors.map((error: any) => {
                              return error.make;
                            })
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
                <VehicleInternals
                  form={form}
                  errors={errors}
                  handleDateForm={handleDateForm}
                  handleForm={(e, resetTaskName) => handleForm(e, resetTaskName)}
                  isView={isView || false}
                  setForm={(form: Inspection) => setForm(form)}
                />
                <div className="row mt-4 mb-4">
                  <VehicleTire
                    isView={isView || false}
                    form={form}
                    handleForm={(e, resetTaskName) => handleForm(e, resetTaskName)}
                  />
                  <VehicleSideBreak
                    isView={isView || false}
                    form={form}
                    handleForm={(e, resetTaskName) => handleForm(e, resetTaskName)}
                  />
                </div>
                <VehicleFunctions
                  isView={isView || false}
                  form={form}
                  handleForm={(e, resetTaskName) => handleForm(e, resetTaskName)}
                />
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Other Notes</label>
                      <textarea
                        className="form-control"
                        name="otherNotes"
                        disabled={isView}
                        onChange={(e) => {
                          handleForm(e, undefined);
                        }}
                        defaultValue={form.otherNotes}
                      ></textarea>
                    </div>
                  </div>
                  <VehicleTasks isView={isView || false} form={form} />
                </div>

                {!isView && (
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-action text-right mt-3 mb-3">
                        <button
                          className="btn btn-orange btn-gray-outline mr-1"
                          type="submit"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-orange"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </Layout>

      {/* Switch Vehicles Modal Start */}
      <div
        className="modal fade"
        id="inspTasksModal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Task</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Task Name</label>
                    <textarea className="form-control"></textarea>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Task Notes</label>
                    <textarea className="form-control"></textarea>
                  </div>
                </div>
                <div className="col-md-12 mt-3">
                  <div className="form-group">
                    <button className="btn btn-orange" type="submit">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="modal-footer">
                        <button className="btn btn-orange" type="submit">Submit</button>
                    </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default InspectionFields;
