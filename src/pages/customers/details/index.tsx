import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Layout from "../../../shared/components/layout/layout";
import { StoreInterface } from "../../../store";
import { CustomerDetailsPage } from "../../../store/customers/model";
import { fetchCustomerDetails } from "../../../store/customers/action";
import NotesSectionComponent from "../../../shared/components/notes/notes-section-component";

import {
  CustomerDetails,
  CustomerDocument,
  CustomerHeaderActions,
  CustomerPaymentDetails,
  CustomerRentalHistory,
  CustomerStats,
} from "./components";
import { useParams } from "react-router";

const CustomerInformation = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const pageInfo: CustomerDetailsPage = useSelector(
    (state: StoreInterface) => state.customerDetailsPage
  );

  useEffect(() => {
    dispatch(fetchCustomerDetails(userId));
    // eslint-disable-next-line
  }, []);

  console.log(pageInfo);
  return (
    <>
      <Layout>
        <section className="content-body">
          <header className="page-header">
            <div className="page_title">
              <h2>Customer Information</h2>
            </div>
            <CustomerHeaderActions customer={pageInfo?.customer} />
          </header>

          <div className="page_content">
            <div className="white-box">
              <div className="row">
                <div className="col-lg-12 col-xl-8">
                  <CustomerDetails customer={pageInfo?.customer} />
                  {pageInfo?.customer?.id ? (
                    <NotesSectionComponent userId={pageInfo?.customer?.id} />
                  ) : (
                    ""
                  )}
                  {pageInfo?.customer?.id ? (
                    <CustomerStats customer={pageInfo?.customer} />
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-lg-12 col-xl-4">
                  <CustomerDocument customer={pageInfo?.customer} />
                  <CustomerPaymentDetails
                    cards={pageInfo?.customer?.cards}
                  />
                  {pageInfo?.customer?.id ? (
                    <CustomerRentalHistory userId={pageInfo?.customer?.id} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default CustomerInformation;
