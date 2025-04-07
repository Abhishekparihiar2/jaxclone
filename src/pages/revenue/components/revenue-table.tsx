import { formatAmount } from "../../../utils";
import Api from "../../../Api";
import { useState } from "react";
import JAXModal from "../../../shared/components/modal/jax-modal";
import Sorter from "../../../shared/components/sorting/sorter";
import { PaymentTransaction } from "../../../store/shared/model";
import moment from "moment";

const RevenueTable = ({
  revenueList,
  sortBy,
  sortType,
  setSortBy,
  setSortType
}: {
  revenueList: PaymentTransaction[],
  sortBy: string;
  sortType: string;
  setSortBy: any;
  setSortType: any;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<any>({});
  const openModel = async (revenue: PaymentTransaction) => {
    const response = await Api.post("/api/v1/payment-transaction/details", {
      rentalId: revenue.extendRentalId ? revenue.extendRentalId : revenue.rentalId,
      isExtendedRental: !!revenue.extendRentalId
    });
    setShowModal( true );
    let result = { ...revenue };
    const responseDetails = response?.data?.data;
    if ( responseDetails )
    {
      result = { ...result, ...responseDetails };
      if ( revenue.extendRentalId )
      {
        result.pickupAt = moment( responseDetails.returnAt ).subtract(responseDetails.duration, "days" ).toDate();
      } else
      {
        result.returnAt = moment( responseDetails.pickupAt ).add(responseDetails.duration, "days" ).toDate();
      }
    }
    setPaymentDetails(result);
  }
  return (
    <>
      <div className="jax-table-outer ml-1rem mr-1rem">
        <div className="table-responsive jax-table">
          <table className="table mb-0 table-striped">
            <thead>
              <tr>
                <th style={{ width: "15%" }} onClick={()=>{ setSortBy('rentalNumber'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                  Rental No.
                  <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'rentalNumber'} />
                  </th>
                <th style={{ width: "15%" }} onClick={()=>{ setSortBy('firstName'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                  Customer Name
                  <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'firstName'} />
                  </th>
                <th style={{ width: "15%" }} onClick={()=>{ setSortBy('vehicleNumber'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                  Vehicle No.
                  <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'vehicleNumber'} />
                  </th>
                <th style={{ width: "15%" }} onClick={()=>{ setSortBy('duration'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                  Rental Days
                  <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'duration'} />
                  </th>
                <th style={{ width: "10%" }} onClick={()=>{ setSortBy('amount'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                  Amount
                  <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'amount'} />
                  </th>
                <th style={{ width: "15%" }} onClick={()=>{ setSortBy('date'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                  Payment Date
                  <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'date'} />
                  </th>
                <th style={{ width: "15%" }}>
                  Action
                  </th>
              </tr>
            </thead>
            <tbody>
              {revenueList && revenueList.length > 0 && revenueList.map((revenue) => <tr>
                <td>{revenue.rentalNumber}</td>
                <td>{revenue.firstName} {revenue.lastName}</td>
                <td>{revenue.vehicleNumber}</td>
                <td>{revenue.duration}</td>
                <td>{formatAmount(revenue.amount)}</td>
                <td>{revenue?.date ? moment(revenue.date, "YYYY-MM-DD").format('LL') : '-'}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-info btn-xs mr-1"
                    title="View"
                    data-toggle="modal"
                    data-target="#viewRevenueModal"
                    onClick={() => openModel(revenue)}
                  >
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      {/* View Revenue Modal Start */}
      <JAXModal
        heading={`Revenue`}
        show={showModal}
        dialogClassName="modal-dialog modal-dialog-xxl"
        handleClose={() => setShowModal(false)}
      >
        <div className="modal-body">
          <ul className="info-list info-list2-col">
            <li>
              <div className="info-list-item">
                <label className="info-label">Vehicle</label>
                <div className="info-name"> {  paymentDetails?.year ? moment( paymentDetails.year ).format( "YYYY" ) : ''  }
                 {' '} {  paymentDetails?.make ? paymentDetails.make : ''  }
                                       {' '} {paymentDetails?.model ? paymentDetails.model : ''}</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">Daily Rate X {paymentDetails.duration} Days</label>
                <div className="info-name">{formatAmount(paymentDetails.extendRentalId ? paymentDetails.dayRate : paymentDetails.DayRate)}</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">Customer Name</label>
                <div className="info-name">{paymentDetails.firstName} {paymentDetails.lastName}</div>
              </div>
            </li>
            <li className="left">
              <div className="info-list-item">
                <label className="info-label">Insurance Plan</label>
                <div className="info-name">{formatAmount(paymentDetails.extendRentalId ? paymentDetails.insurancePlan : paymentDetails.InsurancePlan)}</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">Rental Start Date</label>
                <div className="info-name">{paymentDetails?.pickupAt ? moment(paymentDetails.pickupAt).format('LL') : '-'}</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">Jax Maintenance Plan</label>
                <div className="info-name">{formatAmount(paymentDetails.extendRentalId ? paymentDetails.maintenancePlan : paymentDetails.MaintenancePlan)}</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">Rental End Date</label>
                <div className="info-name">{paymentDetails?.returnAt ? moment(paymentDetails.returnAt).format('LL') : '-'}</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">Jax Protection Plan</label>
                <div className="info-name">{formatAmount(paymentDetails.extendRentalId ? paymentDetails.protectionPlan : paymentDetails.ProtectionPlan)}</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">Vehicle Number</label>
                <div className="info-name">{paymentDetails.vehicleNumber}</div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">Jax Admin Fee</label>
                <div className="info-name">{formatAmount(paymentDetails.JaxAdminFee ? paymentDetails.JaxAdminFee : 0)}</div>
              </div>
            </li>
            <li></li>
            <li className="left-full">
              <div className="info-list-item">
                <label className="info-label">Under 25 Surcharge</label>
                <div className="info-name">{formatAmount(paymentDetails.extendRentalId ? paymentDetails.surcharge : paymentDetails.Surcharge)}</div>
              </div>
            </li>
            <li></li>
            <li className="left-full">
              <div className="info-list-item">
                <label className="info-label">Tax</label>
                <div className="info-name">{formatAmount(paymentDetails.extendRentalId ? paymentDetails.tax : paymentDetails.Tax)}</div>
              </div>
            </li>
          </ul>

          <ul className="info-list info-list2-col">
            <li className="blank-li">&nbsp;</li>
            <li>
              <div className="info-list-item">
                <label className="info-label total-text">Total</label>
                <div className="info-name total-value">{formatAmount(paymentDetails.extendRentalId ? paymentDetails.total : paymentDetails.Total)}</div>
              </div>
            </li>
          </ul>
        </div>     
     </JAXModal>
    </>
  );
};

export default RevenueTable;
