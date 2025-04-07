import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../../../store";
import { CustomerDetailsPage } from "../../../../store/customers/model";
import {
  fetchRentals,
} from "../../../../store/customers/action";
import { convertTime12to24 } from '../../../../utils/index';
var moment = require('moment-timezone');

interface CustomerRentalHistoryInterface {
  userId: number;
}

const CustomerRentalHistory: FC<CustomerRentalHistoryInterface> = (
  props: CustomerRentalHistoryInterface
) => {
  const { userId } = props;
  const dispatch = useDispatch();

  const pageInfo: CustomerDetailsPage = useSelector(
    (state: StoreInterface) => state.customerDetailsPage
  );

  useEffect( () =>
  {
    if ( userId )
    {
      dispatch(fetchRentals(userId, 5));
    }
    // eslint-disable-next-line
  }, []);

  const viewAll = () => {
    dispatch(fetchRentals(userId, 100));
  };
  
  const viewLess = () => {
    dispatch(fetchRentals(userId, 5));
  }

  console.log(pageInfo?.rentals);
  console.log(pageInfo.rentalsCount);
  const convertedDateTime = (utcDate: any, utcTime: any, city:string) => {
    if(utcDate && utcTime){
      const date: any = utcDate;
      const hours24 = convertTime12to24(utcTime)
      const fullDate = `${date.split('-')[2]}-${date.split('-')[1]}-${date.split('-')[0]} ${hours24}`
      const offsetDiff = moment().utcOffset() - moment(fullDate).utcOffset()
      // const time = moment.utc(fullDate).add(offsetDiff, 'minutes').local().format('hh:mm A')
      let tz = ""
      if(city === "Atlanta") {
        tz = "America/New_York"
      }
      if(city === "Dallas") {
        tz = "America/Chicago"
      }
      let time = ""
      let formattedDate = ""
      if(tz) {
        time = moment.utc(fullDate).tz(tz).format('hh:mm A')
        formattedDate = moment.utc(fullDate).format("MM/DD/YYYY")
      } else {
        time = moment.utc(fullDate).local().format('hh:mm A')
        formattedDate = moment.utc(fullDate).format("MM/DD/YYYY")
      }
      return `${formattedDate}`
    }
  }

  return (
    <>
      <section className="card mb20">
        <header className="card-header pl-5rem">
          <h2 className="card-title">Rental History</h2>
        </header>

        {pageInfo?.rentals && pageInfo?.rentals?.length ? (
          <>
            <div className="card-body p-0 border-none">
              <div className="table-responsive table-common">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th style={{ width: "15%" }}>Rental Number</th>
                      <th style={{ width: "65%" }}>Year Make Model</th>
                      <th style={{ width: "10%" }}>Start Date</th>
                      <th style={{ width: "10%" }}>End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageInfo?.rentals.map((rental) => {
                      return (
                        <tr>
                          <td> <a
                                        className="text-primary"
                                        href={`/rental-details/${rental.id}`}
                                      >{rental.rentalNumber}</a></td>
                          <td>{ `${moment(rental.year).format('YYYY')} ${ rental.make } ${ rental.model}` }</td>
                          <td>
                            {rental?.pickupFormattedAt && rental.city
                              ? convertedDateTime(rental.pickupFormattedAt, rental.pickupTime, rental.city )
                              : "-"}
                          </td>
                          <td>
                            {rental?.returnFormattedAt && rental.city
                              ? convertedDateTime(rental.returnFormattedAt, rental.returnTime, rental.city )
                              : "-"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {pageInfo.rentalsCount && pageInfo.rentalsCount > 5 ? 
                (pageInfo.rentals.length === pageInfo.rentalsCount) ? 
                (
                  <div className="table-action text-right p-3">
                    <button
                      className="btn btn-orange"
                      type="submit"
                      onClick={viewLess}
                    >
                      View Less
                    </button>
                  </div>
                )
                : 
              (
                <div className="table-action text-right p-3">
                  <button
                    className="btn btn-orange"
                    type="submit"
                    onClick={viewAll}
                  >
                    View More
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>{" "}
          </>
        ) : (
          <div className="card-body"> No Rentals Found.</div>
        )}
      </section>
    </>
  );
};

export default CustomerRentalHistory;
