import React, { FC, useState } from "react";
import { useDispatch} from "react-redux";
import { Rental } from "../../../../store/rentals/model";
import { useNavigate } from "react-router-dom";
import {updateRentalStatus} from "../../../../store/rentals/action";
import moment from "moment";
import { numberOfRentalDays } from "../../../../utils";
import JAXModal from "../../../../shared/components/modal/jax-modal";
import ConfirmPopup from './cancelReservation/confirm-popup';
import RefundPopup from './cancelReservation/refund-popup';

interface RentalHeaderActionsInterface {
  rental: Rental;
}

const RentalHeaderActions: FC<RentalHeaderActionsInterface> = (
  props: RentalHeaderActionsInterface
) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cancel, setCancel] = useState(false)
  const [refund, setRefund] = useState(false)

  const { rental } = props;
  const rentalStatus = rental?.status;

  const handleStatusUpdate = ( status: string ) =>
  {
    if (status && rental?.id) {
      switch (status) {
        case "BOOKED":
          navigate(`/add-inspection/?rentalId=${rental.id}&type=1`);
          break;
        case "PRE_RENTAL_INSPECTION_DONE":
          const startDate = new Date();
          const calDur = numberOfRentalDays( rental.pickupAt, rental.returnAt ) === 0 ? 1 : numberOfRentalDays( rental.pickupAt, rental.returnAt );
          const endDate: any = calDur ? new Date(new Date().getTime()+(calDur*24*60*60*1000)) : rental.pickupAt ; 
          console.log(calDur)
          const slot = moment(endDate).utc().format("hh:mm A");
          if ( endDate )
          {
            endDate.setHours( 0, 0, 0, 0 );
          }
          if ( startDate )
          {
            startDate.setHours( 0, 0, 0, 0 );
          }
          const activeRentalData = {
            slot
          }
          dispatch(updateRentalStatus(rental.id, 'ACTIVE', activeRentalData))
          break;
        case "ACTIVE":
          navigate(`/add-inspection/?rentalId=${rental.id}&type=2`);
          break;
        case "LATE":
          navigate(`/add-inspection/?rentalId=${rental.id}&type=2`);
          break;
        case "POST_RENTAL_INSPECTION_DONE":
          dispatch(updateRentalStatus(rental.id, 'FINISHED'))
          break;
        default:
          console.log("nothing to be done");
      }
    }
  };

  return (
    <>
      {rentalStatus &&
        (rentalStatus === "BOOKED" || rentalStatus === "PRE_RENTAL_INSPECTION_DONE") && (
          <>
            <div className="page-header-right">
              <button
                className="btn btn-orange"
                type="button"
                onClick={(e) => {
                  setCancel(true)
                }}
                style={{marginRight: "10px"}}
              >
                Cancel Reservation
              </button>
              <button
                className="btn btn-orange"
                type="button"
                onClick={(e) => {
                  handleStatusUpdate(rentalStatus);
                }}
              >
                Start Rental
              </button>
            </div>
          </>
        )}
      {rentalStatus &&
        (rentalStatus === "ACTIVE" || rentalStatus === "POST_RENTAL_INSPECTION_DONE" || rentalStatus === 'LATE') && (
          <div className="page-header-right">
            <button
              className="btn btn-orange"
              type="button"
              onClick={(e) => {
                handleStatusUpdate(rentalStatus);
              }}
            >
              End Rental
            </button>
          </div>
        )}
        <JAXModal
                heading={`Cancel Reservation`} 
                show={ cancel } 
                dialogClassName="single-upload-modal cancel-reservation"
                handleClose={() => setCancel(false)}
            >
                <ConfirmPopup setRefund={() => {
                  setCancel(false)
                  setRefund(true)
                }} />
        </JAXModal>
        <JAXModal
                heading={`Refund`} 
                show={ refund } 
                dialogClassName="single-upload-modal cancel-reservation"
                handleClose={() => setRefund(false)}
            >
                <RefundPopup rental={rental} handleClose={() => setRefund(false)}/>
        </JAXModal>
    </>
  );
};

export default RentalHeaderActions;
