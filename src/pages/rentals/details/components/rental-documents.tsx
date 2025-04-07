import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import JAXModal from "../../../../shared/components/modal/jax-modal";
import { Rental } from "../../../../store/rentals/model";
import RentalInsurance from "./rental-insurance";
import { ResponseReset, ResponseSuccess } from "../../../../store/shared/model";

interface RentalDocumentsInterface {
  rentals: Rental;
}
const RentalDocuments = ({ rentals }: RentalDocumentsInterface) => {

  const [showEditDocuments, setEditDocuments] = useState(false);
  const dispatch = useDispatch();

  const hanleDeleteDocument = async (type: string) => {
    try {
      await dispatch(new ResponseReset().action());
      await axios.post(
        `/api/v1/bookings/${rentals.id}/delete-document`,
        {
          type,
        }
      );
      dispatch(new ResponseSuccess("Successfully Deleted").action());
      window.location.reload();
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <section className="card mb20 remaining-time">
      <header className="card-header">
        <h2 className="card-title">Documents</h2>
        <div className="card-head-actions">
          <a
            className="btn orange-circle radius-sm"
            href="#"
            onClick={() => setEditDocuments(true)}
          >
           <i className="fa fa-pencil" aria-hidden="true"></i>
          </a>
        </div>
      </header>
      <div className="card-body">
        <ul className="list-style-none doc-list">
          <li>
            <div className="doc-name">
              <i className="fa fa-address-card-o mr-2" aria-hidden="true"></i>
              Rental Agreements
            </div>
            <div className="doc-action">
              {rentals.agreementUrl ? (
                <>
                  <a
                    href={rentals.agreementUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-success btn-xs mr-1"
                    title="Download Document"
                  >
                    <i className="fa fa-download" aria-hidden="true"></i>
                  </a>
                </>
              ) : (
                <> <a
                href="#"
                className="btn btn-outline-danger btn-xs mr-1"
                title="Empty">
                <i className="fa fa-times" aria-hidden="true"></i>
              </a></>
              )}
            </div>
          </li>
          <li>
            <div className="doc-name">
              <i className="fa fa-address-card-o mr-2" aria-hidden="true"></i>
              Insurance
            </div>
            <div className="doc-action">
              {rentals.insuranceUrl ? (
                <>
                  <a
                    href={rentals.insuranceUrl}
                    className="btn btn-outline-success btn-xs mr-1"
                    title="Download Document"
                    target={"_blank"}
                    rel={"noreferrer"}
                  >
                    <i className="fa fa-download" aria-hidden="true"></i>
                  </a>
                  {/* <a
                    className="btn orange-circle radius-sm"
                    href="#"
                    onClick={() => setEditDocuments(true)}
                  >
                    <i className="fa fa-edit" aria-hidden="true"></i>
                  </a> */}
                  <a
                    href="#"
                    className="btn btn-outline-danger btn-xs"
                    title="Delete"
                    onClick={() => hanleDeleteDocument("insurance")}
                  >
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </a>
                </>
              ) : (
                <> <a
                href="javascript:void(0);"
                onClick={() => setEditDocuments(true)}
                className="btn btn-outline-danger btn-xs mr-1"
                title="Empty">
                <i className="fa fa-plus" aria-hidden="true"></i>
              </a></>
              )}
            </div>
          </li>
        </ul>
      </div>
      <JAXModal
        heading={ `Add/Edit Insurance` }
        dialogClassName="single-upload-modal"
        show={showEditDocuments}
        handleClose={() => setEditDocuments(false)}
      >
        <RentalInsurance rental={rentals} setEditDocuments={setEditDocuments} />
      </JAXModal>
    </section>
  );
};

export default RentalDocuments;
