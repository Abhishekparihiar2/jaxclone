import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Layout from "../../../shared/components/layout/layout";
import { StoreInterface } from "../../../store";
import { RentalDetailsPage } from "../../../store/rentals/model";
import { useParams } from 'react-router';
import { fetchRentalDetails } from "../../../store/rentals/action";
import { RentalHeaderActions, RentalInformation, CustomerInformation, RentalTimer, RentalDocuments, VehicleInformation, PaymentDetails, VehicleSwitchHistory, Inspections, RentalStats } from "./components"
import NotesSectionComponent from '../../../shared/components/notes/notes-section-component';
import JAXModal from "../../../shared/components/modal/jax-modal";
import RentalEdit from './components/rental-edit';

const RentalsDetails = () =>
{
  const { rentalID } = useParams();
  const dispatch = useDispatch();
  const [showEditRental, setShowEditRental] = useState<any>()
  const pageInfo: RentalDetailsPage = useSelector(
    (state: StoreInterface) => state.rentalDetailsPage
  );

  useEffect(() => {
    dispatch(fetchRentalDetails(rentalID));
    // eslint-disable-next-line
  }, [] );
  return (
    <>
      <Layout>
        <section className="content-body">
            <header className="page-header">
            <div className="page_title">
              <h2>Rental Details</h2>
            </div>
            <RentalHeaderActions rental={pageInfo?.rental}></RentalHeaderActions>
          </header>

          <div className="page_content">
            <div className="white-box">
              <div className="row">
                <div className="col-lg-12 col-xl-8">
                  <RentalInformation rental={ pageInfo?.rental } setShowEditRental={() => setShowEditRental(true)} ></RentalInformation>
                  <CustomerInformation user={pageInfo?.rental?.userDetails} ></CustomerInformation>
                  <NotesSectionComponent rentalId = {Number(rentalID)}></NotesSectionComponent>
                  <RentalStats rental={ pageInfo?.rental } transactions={ pageInfo?.paymentList}></RentalStats>
                </div>
                <div className="col-lg-12 col-xl-4">
                  <RentalTimer rental={pageInfo?.rental}></RentalTimer>
                  <RentalDocuments rentals={pageInfo.rental}></RentalDocuments>
                  <VehicleInformation rental={pageInfo?.rental} vehicle = {pageInfo?.rental?.vehicleDetails}></VehicleInformation>
                  <PaymentDetails rental={pageInfo?.rental}></PaymentDetails>
                  <VehicleSwitchHistory rental={pageInfo?.rental}></VehicleSwitchHistory>
                  <Inspections rental={pageInfo?.rental} ></Inspections>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>

      {/* Switch Vehicles Modal Start */}
      <div
        className="modal fade"
        id="switchVehiclesModal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Vehicle Switch</h5>
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
              <h6 className="mb-3">Select New Vehicle</h6>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Vehicle Number</label>
                    <select className="form-control"></select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Vehicle Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Vehicle Name"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label className="label-blank label-blank-mobile-hide">
                      &nbsp;
                    </label>
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
      {/* Switch Vehicles Modal End */}
    </>
  );
};

export default RentalsDetails;
