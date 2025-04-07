import React, { FC } from "react";
import { CardInfo } from "../../../../store/customers/model";

interface CustomerPaymentDetailsInterface {
  cards?: CardInfo[];
}

const CustomerPaymentDetails: FC<CustomerPaymentDetailsInterface> = (
  props: CustomerPaymentDetailsInterface
) => {
  const { cards } = props;
  console.log(cards)
  return (
    <>
      <section className="card mb20">
        <header className="card-header">
          <h2 className="card-title">Payment Details</h2>
        </header>
        {/* <div className="card-body">
          <ul className="info-list">
            <li>
              <div className="info-list-item">
                <label className="info-label">Type Of Card</label>
                <div className="info-name">
                  {card?.cardType ? card.cardType : "-"}
                </div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">Last 4 Digits</label>
                <div className="info-name">
                  XXXX-XXXX-{card?.last4 ? card.last4 : "-"}
                </div>
              </div>
            </li>
            <li>
              <div className="info-list-item">
                <label className="info-label">Name Of Card</label>
                <div className="info-name">{card?.name ? card?.name : "-"}</div>
              </div>
            </li>
          </ul>
        </div> */}
        {
            cards && cards.length > 0 ? <>
                    <div className="card-body p-0 border-none">
                        <div className="table-responsive table-common">
                        <table className="table mb-0">
                            <thead>
                            <tr>
                                <th style={{ width: "30%" }}>Type Of Card</th>
                                <th style={{ width: "20%" }}>Last 4 Digits</th>
                                <th style={{ width: "20%" }}>Name Of Card</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    cards.map((card, index) => <tr key={index}>
                                        <td>{card.cardType}</td>
                                        <td>{card.last4}</td>
                                        <td>{card.name}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                        </div>
                    </div>
            </>
            :
            <div className="card-body">No Cards Found.</div>
        }
      </section>
    </>
  );
};

export default CustomerPaymentDetails;
