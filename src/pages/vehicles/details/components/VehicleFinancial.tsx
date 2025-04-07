import React from "react";
import { VehicleFinancialInterface } from "../../interface";
import { formatAmount } from "../../../../utils/index";
import { Link } from "react-router-dom";
import moment from "moment";

const VehicleFinancial = ({
  vehicle,
  totalRevenue,
}: VehicleFinancialInterface) => {
  return (
    <section className="card mb20">
      <header className="card-header card-head-icon">
        <h2 className="card-title">Financial Information</h2>
        <div className="card-head-actions">
          <Link className="btn orange-circle radius-sm" to={`/vehicle-edit/${vehicle?.id}`}>
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </Link>
        </div>
      </header>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6 col-xl-12">
            <ul className="info-list">
              <li>
                <div className="info-list-item">
                  <label className="info-label">Vehicle Cost</label>
                  <div className="info-name">{formatAmount(vehicle?.vehicleCost)}</div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">Purchase Date</label>
                  <div className="info-name">
                    {vehicle?.buyDate ? moment(vehicle?.buyDate).format("LL") : '-'}
                  </div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">Vehicle Vendor</label>
                  <div className="info-name">{vehicle?.buyer}</div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">Sale Price</label>
                  <div className="info-name">{formatAmount(vehicle?.vehicleSalePrice)}</div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">Vehicle Buyer</label>
                  <div className="info-name">{vehicle?.buyer}</div>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-md-6 col-xl-12">
            <ul className="info-list">
              <li>
                <div className="info-list-item">
                  <label className="info-label">Total Revenue</label>
                  <div className="info-name">
                    
                      '-'
                  </div>
                </div>
              </li>

              <li>
                <div className="info-list-item">
                  <label className="info-label">Total Expenses</label>
                  <div className="info-name">-</div>
                </div>
              </li>
              <li>
                <div className="info-list-item profitability">
                  <label className="info-label">Profitability</label>
                  <div className="info-name">-</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleFinancial;
