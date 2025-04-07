import React, {FC} from "react";
import {
  Rental
} from "../../../../store/rentals/model";
import { formatAmount, formatDate } from "../../../../utils/index";
import moment from "moment";
import { numberOfRentalDays, totalAmount } from "../../../../utils/index";
import { PaymentTransaction } from "../../../../store/shared/model";

interface RentalStatsInterface {
  rental: Rental;
  transactions : PaymentTransaction[]
}

const RentalStats: FC<RentalStatsInterface> = (
  props: RentalStatsInterface
) => {
  const { rental, transactions } = props;

  const calculateAmountOwed = ():number => 
  {
    let amountOwed: number = 0;
    const currentDate = new Date();
    const rentalPaidUpto = rental.returnAt;
    const duration = numberOfRentalDays( rental.originalStartAt, rental.originalEndAt );
    if ( rental && rental.status && rental.status === 'LATE' && rental.DayRate && rentalPaidUpto && moment(currentDate).isSameOrAfter(moment(rentalPaidUpto)) && duration > 0)
    {
      let dayRate = ( rental.Total ) / ( duration );
      const numberofDays: number = numberOfRentalDays( rentalPaidUpto, currentDate ); 
      amountOwed = numberofDays * dayRate;
    } 
    return amountOwed;
  } 

  const calculateOnTimePayment = ():string =>
  {
    let onTimePercentage = "100";
    if ( transactions?.length )
    {
      const totalNumber = transactions.length;
      let onTimeNumber = 0;
      for ( let i = 0; i < transactions.length; i++ )
      {
        if ( transactions[ i ].onTime )
        {
          onTimeNumber++;
        }
      }
      onTimePercentage = ( ( onTimeNumber * 100 ) / totalNumber ).toFixed( 2 );
    }
    return onTimePercentage;
  }
 
  return (
    <section className="card mb20">
      <header className="card-header">
        <h2 className="card-title">Rental Stats</h2>
      </header>
      <div className="card-body">
        <ul className="info-list info-list2-col">
          <li>
            <div className="info-list-item">
              <label className="info-label">Total Rental Day</label>
              <div className="info-name">  {numberOfRentalDays(rental?.pickupAt as Date, rental?.returnAt as Date) +
                      " Days"}</div>
            </div>
          </li>
          <li>
            <div className="info-list-item">
              <label className="info-label">Total Revenue</label>
              <div className="info-name">{ formatAmount(totalAmount(transactions))}</div>
            </div>
          </li>
          <li>
            <div className="info-list-item">
              <label className="info-label">Amount Owed</label>
              <div className="info-name">{formatAmount(calculateAmountOwed())}</div>
            </div>
          </li>

          <li>
            <div className="info-list-item">
              <label className="info-label">On-Time Payment</label>
              <div className="info-name">{ calculateOnTimePayment()}%</div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default RentalStats;
