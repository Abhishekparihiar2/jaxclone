import React, { FC, useEffect } from "react";
import {
  Rental,
  RentalDetailsPage,
} from "../../../../store/rentals/model";
import { fetchPayments } from "../../../../store/rentals/action";
import { StoreInterface } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { formatAmount } from "../../../../utils/index";
import moment from "moment";
import { PaymentTransaction } from "../../../../store/shared/model";

interface PaymentDetailsInterface {
  rental: Rental;
}

const PaymentDetails: FC<PaymentDetailsInterface> = (
  props: PaymentDetailsInterface
) => {
  const { rental } = props;

  const dispatch = useDispatch();
  const pageInfo: RentalDetailsPage = useSelector(
    (state: StoreInterface) => state.rentalDetailsPage
  );

  useEffect(() => {
    if (rental?.id) {
      dispatch(fetchPayments(rental.id));
    }
  }, [rental]);

  return (
    <section className="card mb20">
      <header className="card-header pl-5rem">
        <h2 className="card-title">Payment Details</h2>
      </header>
      {pageInfo?.paymentList && pageInfo?.paymentList?.length ? (
        <>
          <div className="card-body p-0 border-none">
            <div className="table-responsive table-common">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th style={{ width: "20%" }}>Payment Date</th>
                    <th style={{ width: "15%" }}>Amount</th>
                    <th style={{ width: "50%" }}>Last 4 Digit of Card</th>
                    <th style={{ width: "15%" }}>Rental Days</th>
                  </tr>
                </thead>
                <tbody>
                  {pageInfo?.paymentList.map(
                    (transaction: PaymentTransaction) => {
                      if(!['PENDING', "CANCELED", ""].includes(transaction.status)) {
                        return (
                          <>
                            {" "}
                            <tr>
                              <td>{transaction?.date ? moment(transaction.date).format('L') : ''}</td>
                              <td>{formatAmount(transaction.amount)}</td>
                              <td>{transaction.last4}</td>
                              <td>{transaction.duration}</td>
                            </tr>
  
                          </>
                        );
                      } else {
                        return <></>
                      }
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="card-body">No payments found.</div>
        </>
      )}
    </section>
  );
};

export default PaymentDetails;
