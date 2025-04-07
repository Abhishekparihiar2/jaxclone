import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../../../store";
import { CustomerDetailsPage, User } from "../../../../store/customers/model";
import {
  fetchCustomerStats,
} from "../../../../store/customers/action";
import moment from "moment";
import { formatAmount } from "../../../../utils/index";

interface CustomerStatsInterface
{
  customer:User
}

const CustomerStats: FC<CustomerStatsInterface> = ( props: CustomerStatsInterface ) =>
{
  const { customer } = props;

  const dispatch = useDispatch();

  const pageInfo: CustomerDetailsPage = useSelector(
    (state: StoreInterface) => state.customerDetailsPage
  );

  useEffect( () =>
  {
    if ( customer.id )
    {
      dispatch(fetchCustomerStats(customer.id));
    }
  }, [] );
  
  console.log( pageInfo );

  return (
    <>
      <section className="card mb20">
        <header className="card-header">
          <h2 className="card-title">Customer Stats</h2>
        </header>
        <div className="card-body">
          <ul className="info-list info-list2-col">
            <li>
              <div className="info-list-item">
                <label className="info-label">Customer Since</label>
                <div className="info-name">{ moment(customer.createdAt).format('MM/DD/YYYY') }</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">Total Rental Days</label>
                <div className="info-name">{ pageInfo.stats?.totalRentalDays ? pageInfo.stats?.totalRentalDays : ""}</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">Total Revenue</label>
                <div className="info-name">{pageInfo.stats?.totalRevenue ?  formatAmount(pageInfo.stats?.totalRevenue) : ""}</div>
              </div>
            </li>

            <li>
              <div className="info-list-item">
                <label className="info-label">On Time Payment Percentage</label>
                <div className="info-name">{ pageInfo.stats?.onTimePercentage ? `${pageInfo.stats?.onTimePercentage}%` : "" }</div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default CustomerStats;
