import React, { FC, useEffect, useState } from "react";
import { Rental } from "../../../../store/rentals/model";
// import moment from "moment";
import { RentalStatus } from "../../../../shared/models/index";
import { convertTime12to24, formatDate } from '../../../../utils/index';
import moment from "moment";
var momentUTC = require('moment-timezone');

interface RentalTimerInterface {
  rental: Rental;
}

const RentalTimer: FC<RentalTimerInterface> = (props: RentalTimerInterface) => {
  const { rental } = props;
  const [countDownTime, setCountDownTime] = useState<number>(0);
  const days = Math.floor(countDownTime / (1000 * 60 * 60 * 24));

  useEffect(() => {
    if (rental && rental.returnAt && rental.Slot) {
      const countDownDate = moment(rental.returnAt, 'DD-MM-YYYY');
      const convertedSlot = convertTime12to24(rental.returnTime)
      let time = ""
      let formattedDate = ""
      let tz = ""
      if(rental.vehicleDetails.city.toLowerCase() === "atlanta") {
        tz = "America/New_York"
      }
      if(rental.vehicleDetails.city.toLowerCase() === "dallas") {
        tz = "America/Chicago"
      }
      const fullUTCDate = moment(`${countDownDate.format('YYYY-MM-DD')} ${convertedSlot} UTC`)
      if(tz) {
        time = momentUTC.utc(fullUTCDate).tz(tz).format('hh:mm A')
        formattedDate = momentUTC.utc(fullUTCDate).format('YYYY-MM-DD')
      } else {
        time = momentUTC.utc(fullUTCDate).local().format('hh:mm A')
        formattedDate = momentUTC.utc(fullUTCDate).format('YYYY-MM-DD')
      }
      let date = `${formattedDate} ${time}`
      const localDateTime = moment(date)
      const localTime = time
      const localDate = moment(localDateTime).format('YYYY-MM-DD')
      console.log(countDownDate)
      console.log(localTime)
      console.log(localDateTime)
      console.log(new Date())
      console.log(tz)
      const splitSlot = localTime.split(" ");
      const splitSlotTime = splitSlot[0].split(":");
      // console.log(localDate)
      if(splitSlot[1] === "AM" && splitSlotTime[0] >= '12') {
        localDateTime.hour(
          Number(splitSlotTime[0]) % 12
        );  
      } else if (splitSlot[1] === "AM" && splitSlotTime[0] <= '12'){
        localDateTime.hour(
          Number(splitSlotTime[0])
        );  
      } else if (splitSlot[1] === "PM" && splitSlotTime[0] === '12') {
        localDateTime.hour(
          Number(splitSlotTime[0])
        );
      } else {
        localDateTime.hour(
          Number(splitSlotTime[0]) + 12
        );  
      }
      const b = Date.parse(momentUTC().tz(tz).format('YYYY-MM-DD hh:mm A'))
      localDateTime.minute(Number(splitSlotTime[1]));
      const interval = setInterval( () =>
      {
        const countDownTimeValue = localDateTime.valueOf() - b;
        setCountDownTime(countDownTimeValue > 0 ? localDateTime.valueOf() - b : b - localDateTime.valueOf());
      }, 100);
      return () => clearInterval(interval);
    }
  }, [rental, rental.status]);
  return (
    <section className="card mb20 remaining-time">
      <header className="card-header">
        { rental?.status && rental?.status === 'ACTIVE' ? <h2 className="card-title">Remaining Rental Time</h2> :""}
        <div className="card-head-actions">
          <div className="status-action">
            <label>Status</label>
            <span>
              <i className={`fa fa-circle mr-1 ${
                  rental?.status === "ACTIVE" ? "text-success" : rental?.status === "LATE" ? "text-red" : "text-dark"
                }`} aria-hidden="true"></i>{" "}
              {rental?.status ? (RentalStatus as any)[rental.status] : ""}
            </span>
          </div>
        </div>
      </header>
      <div className="card-body">
      { rental?.status && (rental?.status === 'ACTIVE' || rental?.status === 'LATE') &&  <ul className="list-style-none time-list">
          <li>
            {countDownTime ? (
              <>
                <i className="fa fa-clock-o mr-2" aria-hidden="true"></i>
                {
                  rental?.status === 'ACTIVE' ? 
                <span className="active-timer">
                  {days > 0 ? `${days}D:` : ''}
                  {Math.floor((countDownTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + 'H'}
                  :{Math.floor((countDownTime % (1000 * 60 * 60)) / (1000 * 60)) + 'M'}
                  {/* :{Math.floor((countDownTime % (1000 * 60)) / 1000) + 's'} */}
                </span> : 
                <span className="late-timer">
                  - {days > 0 ? `${days}D:` : ''}
                  {Math.floor((countDownTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + 'H'}
                  :{Math.floor((countDownTime % (1000 * 60 * 60)) / (1000 * 60)) + 'M'}
                  {/* :{Math.floor((countDownTime % (1000 * 60)) / 1000) + 's'} */}
                </span>
                }
              </>
            ) : ''}
          </li>
        </ul>}
      </div>
    </section>
  );
};

export default RentalTimer;
