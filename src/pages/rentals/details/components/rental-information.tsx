import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import JAXModal from "../../../../shared/components/modal/jax-modal";
import { Rental } from "../../../../store/rentals/model";
import { numberOfRentalDays, formatAmount, formatDate, convertTime12to24 } from "../../../../utils/index";
import RentalEdit from './rental-edit';
var moment = require('moment-timezone');


interface RentalInformationInterface
{
  rental: Rental;
  setShowEditRental: () => void;
}


const RentalInformation: FC<RentalInformationInterface> = (
  props: RentalInformationInterface
) =>
{
  const { rental, setShowEditRental } = props;
  console.log(`${rental?.pickupAt} ${rental?.pickupTime}`, `${rental?.returnAt} ${rental?.returnTime}`)
  const rentalDuration = numberOfRentalDays( rental?.pickupAt, rental?.returnAt);
  let dayRate = 0;
  if ( rental && (rentalDuration) )
  {
    dayRate = rental.DayRate
    // if(rental.vehicleDetails.priceIncrement) 
    //   dayRate = dayRate + (dayRate / 100)
    // if(rental.vehicleDetails.priceDecrement)
    //   dayRate = dayRate - (dayRate / 100)
  }

  if ( rental && (rentalDuration === 0) )
  {
    dayRate = rental.DayRate
    // if(rental.vehicleDetails.priceIncrement) 
    //   dayRate = dayRate + (dayRate / 100)
    // if(rental.vehicleDetails.priceDecrement)
    //   dayRate = dayRate - (dayRate / 100)
  }
  console.log(rental)
  const convertedDateTime = (utcDate: any, utcTime: any) => {
    if(utcDate && utcTime){
      const date: any = utcDate;
      const hours24 = convertTime12to24(utcTime)
      const fullDate = `${date.split('-')[2]}-${date.split('-')[1]}-${date.split('-')[0]} ${hours24}`
      const offsetDiff = moment().utcOffset() - moment(fullDate).utcOffset()
      // const time = moment.utc(fullDate).add(offsetDiff, 'minutes').local().format('hh:mm A')
      let tz = ""
      if(rental.vehicleDetails.city.toLowerCase() === "atlanta") {
        tz = "America/New_York"
      }
      if(rental.vehicleDetails.city.toLowerCase() === "dallas") {
        tz = "America/Chicago"
      }
      let time = ""
      let formattedDate = ""
      if(tz) {
        time = moment.utc(fullDate).tz(tz).format('hh:mm A')
        formattedDate = moment.utc(fullDate).format('MMMM DD,YYYY')
      } else {
        time = moment.utc(fullDate).local().format('hh:mm A')
        formattedDate = moment.utc(fullDate).format('MMMM DD,YYYY')
      }
      return `${formattedDate} | ${time}`
    }
  }

  const convertedUTCDateTime = (utcDate: any, utcTime: any) => {
    if(utcDate && utcTime) {
      const date: any = utcDate;
      const hours24 = convertTime12to24(utcTime)
      const fullDate = `${date.split('-')[2]}-${date.split('-')[1]}-${date.split('-')[0]} ${hours24}`
      let time = ""
      let formattedDate = ""
      time = moment.utc(fullDate).local().format('hh:mm A')
      formattedDate = moment.utc(fullDate).format('MMMM DD,YYYY')
      return `${formattedDate} | ${time}`
    } else {
      return '-'
    }
  }
  return (
    <section className="card mb20">
      <header className="card-header">
        <h2 className="card-title">
          Rental Information
        </h2>
        <div className="card-head-actions">
        {/* <a
            className="btn orange-circle radius-sm"
            href="#"
            onClick={() => setEditDocuments(true)}
          >
           <i className="fa fa-pencil" aria-hidden="true"></i>
          </a> */}
          {
            (rental.status === "ACTIVE" || rental.status === "BOOKED" || rental.status === "PRE_RENTAL_INSPECTION_DONE" || rental.status === "LATE") && 
            <Link to={`/edit-rental/${rental.id}`} className="btn orange-circle radius-sm">
              <i className="fa fa-pencil" aria-hidden="true" style={{cursor: "pointer"}}></i>
            </Link>
          }
        </div>
      </header>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <ul className="info-list">
              <li>
                <div className="info-list-item">
                  <label className="info-label">Rental Number</label>
                  <div className="info-name">{ rental?.rentalNumber }</div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">Booked Date/Time</label>
                  <div className="info-name">
                    {
                      convertedDateTime(rental.bookedDate, rental.bookedSlot)
                    }
                    {/* { rental.bookedDate && rental.bookedSlot &&
                      moment(rental.bookedDate, 'DD-MM-YYYY').format("LL") +
                      " | " +
                      rental.bookedSlot 
                    } */}
                  </div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">Pickup Date/Time</label>
                  <div className="info-name">
                  {convertedDateTime(rental?.pickupAt, rental?.pickupTime)}
                    {/* { moment( rental?.pickupAt, 'DD-MM-YYYY' ).format( "LL" ) +
                      " | " +
                      rental?.Slot } */}
                  </div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">End Date/Time</label>
                  <div className="info-name">
                  {convertedUTCDateTime(rental?.endDate, rental?.endTime)}
                    {/* { moment( rental?.pickupAt, 'DD-MM-YYYY' ).format( "LL" ) +
                      " | " +
                      rental?.Slot } */}
                  </div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">Return Date/Time</label>
                  <div className="info-name">
                  {convertedDateTime(rental?.returnAt, rental?.returnTime)}
                    {/* { moment( rental?.returnAt, 'DD-MM-YYYY' ).format( "LL" ) +
                      " | " +
                      rental?.Slot } */}
                  </div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">Rental Duration</label>
                  <div className="info-name">
                    { `${rentalDuration === 0 ? 1 : rentalDuration}` +
                      ` Day${rentalDuration > 1 ? "s" : ""}` }
                  </div>
                </div>
              </li>
              {/* <li>
                <div className="info-list-item">
                  <label className="info-label">Rental Date</label>
                  <div className="info-name">
                    {moment(rental?.pickupAt).format("MM/DD/YYYY") +
                      " - " +
                      moment(rental?.returnAt).format("MM/DD/YYYY")}
                  </div>
                </div>
              </li>
               */}
            </ul>
          </div>
          <div className="col-md-6">
            <ul className="info-list">
              <li>
                <div className="info-list-item">
                  <label className="info-label">Pickup Fuel level</label>
                  <div className="info-name" style={ { textTransform: "capitalize" } }>
                    { rental?.fuelLevelOut ? rental.fuelLevelOut : "-" }
                  </div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">Return Fuel Level</label>
                  <div className="info-name" style={ { textTransform: "capitalize" } }>
                    { rental?.fuelLevelIn ? rental.fuelLevelIn : "-" }
                  </div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">Pickup Odometer</label>
                  <div className="info-name">
                    { rental?.pickUpOdometer
                      ? rental?.pickUpOdometer + " Miles"
                      : "-" }
                  </div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">Return Odometer</label>
                  <div className="info-name">
                    { rental?.returnOdometer
                      ? rental?.returnOdometer + " Miles"
                      : "-" }
                  </div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">Included Mileage</label>
                  <div className="info-name">Unlimited</div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">Daily Rate</label>
                  <div className="info-name">
                    { formatAmount( dayRate ) }/day
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section >
  );
};

export default RentalInformation;
