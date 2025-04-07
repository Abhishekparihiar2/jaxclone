import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../../store";
import {
  RentalInterface,
  Vehicle,
} from "../../../store/vehicles/interface";
import VehicleImages from "../shared/add-images";
import JAXModal from "../../../shared/components/modal/jax-modal";
import VehicleInformation from "./components/VehicleInformation";
import VehicleAlert from "./components/VehicleAlerts";
import VehicleCurrentRental from "./components/VehicleCurrentRental";
import VehicleRental from "./components/VehicleRental";
import VehicleDocuments from "./components/VehicleDocuments";
import Images from "./components/Images";
import VehicleFinancial from "./components/VehicleFinancial";
import NotesSectionComponent from "../../../shared/components/notes/notes-section-component";
import VehicleTask from "./components/VehicleTask";
import {
  fetchVehicle,
  updateStatus,
} from "../../../store/vehicles/action";
import VehicleInspection from "./components/VehicleInspection";
import { VehicleStatus, VehicleWidgets } from "../../../shared/models/index";
import { ResponseError } from "../../../store/shared/model";
import Layout from "../../../shared/components/layout/layout";

const VehiclesDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [vehicle, setVehicle] = useState<Vehicle | undefined>();
  // eslint-disable-next-line
  const [editImages, setEditImages] = useState<boolean>(false);
  const [currentRental, setCurrentRental] = useState<RentalInterface | null>(
    null
  );
  const [currentRentalTotal, setCurrentRentalTotal] = useState<number>(0);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);

  const pageInfo = useSelector((state: StoreInterface) => state.vehiclesPage);
  // const success = useSelector(
  //   (state: StoreInterface) => state.response.successResponse
  // );
  const navigate = useNavigate()

  useLayoutEffect(() => {
    const getVehicleDetails = async () => {
      // const filteredVehicle = pageInfo?.vehiclesList.find((data) => data.id === Number(id))
      if (id) {
        await dispatch(fetchVehicle(Number(id)));
      }
      // setVehicle(filteredVehicle)
    };
    getVehicleDetails();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filteredVehicle = pageInfo?.vehiclesList.find(
      (data) => data.id === Number(id)
    );
    setVehicle(filteredVehicle);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo.vehiclesList]);

  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef && modalRef.current === undefined) setEditImages(false);
  }, [modalRef]);

  const totalRevenue = () => {
    let total = 0;
    vehicle?.rentals?.map((rental) => {
      total += rental.TotalAmount;
      return rental
    });
    return total;
  };

  useEffect(() => {
    const getCurrentRental = () => {
      const statuses: string[] = ["CANCELED", "PENDING", "FINISHED"];
      const current: RentalInterface | undefined =
        vehicle?.rentals &&
        vehicle?.rentals.find((rental) => {
          return !statuses.includes(rental.status) && vehicle.id === rental.vehicleId;
        });
      if (current) {
        let total = current.TotalAmount;
        setCurrentRentalTotal(total);
      }
      setCurrentRental(current || null);
      // }, [vehicle?.rentals])
    };
    if (pageInfo.vehiclesList) {
      getCurrentRental();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [vehicle]);

  const updateVehicleStatus = async (status: string) => {
    if (status && vehicle?.id) {
      if(vehicle?.status &&
        vehicle?.status === "PENDING_DELIVERY" || vehicle?.status === "BOOKED") {
        dispatch(new ResponseError("Vehicle status cannot be changed manually!").action());  
      } else if (
        vehicle?.status &&
        status === "PENDING_DELIVERY" || status === "PENDING_PICKUP" || status === "BOOKED"
      ){
        dispatch(new ResponseError("Vehicle status cannot be changed manually!").action());  
      }else if (
        vehicle?.status &&
        vehicle?.status === "BOOKED"
      ) {
        dispatch(new ResponseError("Vehicle status cannot be changed manually!").action());
      } else if (
        vehicle?.status &&
        vehicle?.status === "AVAILABLE" && 
        (status === 'BOOKED' || status === 'PENDING_INSPECTION' || status ===  'PENDING_PICKUP')
      ) {
          dispatch(new ResponseError("Vehicle status cannot be changed manually!").action());
      } else if (
        vehicle?.status && vehicle?.status === "PENDING_PICKUP" && status !==  'AVAILABLE'
      ) {
          dispatch(new ResponseError("Vehicle status cannot be changed manually!").action());
      } else {
        dispatch(updateStatus(status, vehicle?.id));
      }
    }
  };

  const getStatusColor = (status: string | null) => {
    const statusData = VehicleWidgets.statuses.find((data) => data.status === status)
    return <i
      className={`fa fa-circle mr-1 
      `
    }
      style={{color: statusData ? statusData.backgroundColor : "black"}}
      aria-hidden="true"
    ></i>
  }
  return ( <>
    <Layout>
          <section className="content-body">
            <header className="page-header">
              <div className="page_title d-flex">
                <div>
                  <h2>Vehicle Details</h2>
                </div>
                <div className="ml-15">
                  {
                    (vehicle?.status === 'PENDING_INSPECTION' || vehicle?.status === 'PENDING_DELIVERY' ) ? <button
                    className="btn btn-orange"
                    type="button"
                    onClick={() => navigate(`/add-inspection/?vehicleId=${vehicle.id}&type=3`)}
                  >
                    Initial Inspection
                  </button> : ""
                  }
                </div>
              </div>
              <div className="page-header-right">
                <div className="status-action page-status">
                  <label>Status</label>
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {getStatusColor(vehicle?.status || null)}
                      {vehicle?.status
                        ? (VehicleStatus as any)[vehicle?.status]
                        : ""}
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <ul>
                        {Object.keys(VehicleStatus).map((key: string) => {
                          return (
                            <>
                              <li>
                              {/* eslint-disable-next-line  */}
                                <a
                                  className={`dropdown-item ${
                                    vehicle?.status === key ? "active" : ""
                                  }`}
                                  href="#"
                                  onClick={(e) => updateVehicleStatus(key)}
                                >
                                  {(VehicleStatus as any)[key]}
                                </a>
                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  {/* <span><i className="fa fa-circle text-success" aria-hidden="true"></i> Active</span> */}
                </div>
              </div>
            </header>

            <div className="page_content">
              <div className="white-box">
                <div className="row">
                  <div className="col-lg-12 col-xl-8">
                    <VehicleInformation vehicle={vehicle} />
                    <VehicleAlert vehicle={vehicle} />

                    <VehicleCurrentRental
                      currentRental={currentRental}
                      currentRentalTotal={currentRentalTotal}
                      vehicle={vehicle}
                    />

                    <VehicleRental vehicle={vehicle} />

                    <NotesSectionComponent vehicleId={Number(id)} userId={Number(currentRental?.userId)} />
                  </div>

                  <div className="col-lg-12 col-xl-4">
                    {/* <section className="card mb20 remaining-time">
                                        <header className="card-header">
                                            <h2 className="card-title">Remaining Rental Time</h2>
                                            <div className="card-head-actions">
                                                <div className="status-action">
                                                    <label >Status</label>
                                                    <span><i className="fa fa-circle text-success" aria-hidden="true"></i> Active</span>
                                                </div>
                                            </div>
                                        </header>
                                        <div className="card-body">
                                            <ul className="list-style-none time-list">
                                                <li>
                                                    <i className="fa fa-clock-o mr-2" aria-hidden="true"></i>
                                                    <span>02:22:56</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </section> */}

                    <VehicleDocuments vehicle={vehicle} />

                    <Images
                      vehicle={vehicle}
                      handleToggle={() => setShowImageModal(true)}
                    />

                    {/* <VehicleDamage /> */}

                    <VehicleFinancial
                      vehicle={vehicle}
                      totalRevenue={totalRevenue}
                    />

                    <VehicleInspection vehicle={vehicle} />

                    <VehicleTask vehicle={vehicle} />
                  </div>
                </div>
              </div>
            </div>
          </section>
          </Layout>
      {/* Add/Edit/Remove Vehicles Modal Start */}
      <div
        className="modal fade"
        id="addVehiclesModal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add/Edit/Remove Model</h5>
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
                <div className="col-md-4">
                  <div className="form-group">
                    <select className="form-control">
                      <option>Add</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control placeholder-dark"
                      placeholder="Sonata GLC"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group text-right">
                    <button className="btn btn-orange" type="submit">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add/Edit/Remove Vehicles Modal End */}

      {/* delete Modal Start */}
      <JAXModal
        heading={`Add/Edit Image`}
        show={showImageModal}
        handleClose={() => setShowImageModal(false)}
      >
        <VehicleImages
          newVehicleId={vehicle?.id}
          handleClose={() => setShowImageModal(false)}
        />
      </JAXModal>
      {/* delete Modal End */}

      {/* Error Modal Start */}
      <div
        className="modal fade error-modal"
        id="errorModal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="icon-modal-lg">
                <i
                  className="fa fa-exclamation-triangle"
                  aria-hidden="true"
                ></i>
              </div>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <h2>Oopps!</h2>
              <p>Something went wrong.</p>
            </div>
          </div>
        </div>
      </div>
      {/* Error Modal End */}

      {/* Success Modal Start */}
      <div
        className="modal fade success-modal"
        id="successModal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="icon-modal-lg">
                <i className="fa fa-check-circle" aria-hidden="true"></i>
              </div>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <h2>Congratulation !</h2>
              <p>Your data has been successfully saved.</p>
            </div>
          </div>
        </div>
      </div>
    {/* Success Modal End */ }
    </>
  );
};

export default VehiclesDetail;
