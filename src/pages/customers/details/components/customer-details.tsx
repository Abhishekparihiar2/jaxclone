import React, { FC } from "react";
import { User } from "../../../../store/customers/model";
import moment from "moment";
import { formatPhoneNumber } from "../../../../utils"
import { BackgroundChecksStatus } from "../../../../shared/models"
import { Link } from 'react-router-dom';

interface CustomerDetailsInterface
{
  customer: User;
}

const CustomerDetails: FC<CustomerDetailsInterface> = (
  props: CustomerDetailsInterface
) =>
{
  const { customer } = props;
  console.log( customer );
  return (
    <>
      <section className="card mb20">
        <header className="card-header">
          <h2 className="card-title">Personal Information</h2>
          <div className="card-head-actions">
            <Link className="btn orange-circle radius-sm" to={ `/customer-edit/${ customer?.id }` }>
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </Link>
          </div>
        </header>
        <div className="card-body">
          <div className="rental-cust-info">
            <div
              className="row header-row"
              style={ { width: "100%", marginBottom: "10px" } }
            >
              <div className="col-md-4" style={ {
                padding: "0 20px", wordBreak: "break-all"
              } }>
                < div className="info-list-item" >
                  <label className="info-label">{ `${ customer.firstName } ${ customer.lastName }` }</label>
                </div>
              </div>
              <div className="col-md-4" style={ {
                padding: "0 20px", wordBreak: "break-all"
              } }>
                <div className="info-list-item">
                  <label className="info-label">{ customer.email }</label>
                </div>
              </div>
              <div className="col-md-4" style={ {
                padding: "0 20px", wordBreak: "break-all"
              } }>
                <div className="info-list-item">
                  <label className="info-label">{ customer?.phoneNumber ? formatPhoneNumber( customer.phoneNumber ) : "" }</label>
                </div>
              </div>
            </div>
            <div className="rental-cust-pic">
              <img
                src={
                  customer?.profileImageUrl
                    ? customer.profileImageUrl
                    : "/static/images/profile.png"
                }
                alt=""
              />
            </div>
            <div className="rental-cust-detail">
              <div className="row">
                <div className="col-md-6">
                  <ul className="info-list">
                    <li>
                      <div className="info-list-item">
                        <label className="info-label">Nickname</label>
                        <div className="info-name">{ customer.nickname }</div>
                      </div>
                    </li>
                    <li>
                      <div className="info-list-item">
                        <label className="info-label">
                          Driver Licence Number
                        </label>
                        <div className="info-name">
                          { customer?.driverLicenseDetail
                            ? customer?.driverLicenseDetail.number
                            : "-" }
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="info-list-item">
                        <label className="info-label">Issuing State</label>
                        <div className="info-name">
                          { customer?.driverLicenseDetail
                            ? customer?.driverLicenseDetail.state
                            : "-" }
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="info-list-item">
                        <label className="info-label">Issue Date</label>
                        <div className="info-name">
                          { customer?.driverLicenseDetail
                            ? moment(
                              customer?.driverLicenseDetail.issueDate
                            ).format( "MM/DD/YYYY" )
                            : "-" }
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="info-list-item">
                        <label className="info-label">Expiration Date</label>
                        <div className="info-name">
                          { customer?.driverLicenseDetail
                            ? moment(
                              customer?.driverLicenseDetail.expDate
                            ).format( "MM/DD/YYYY" )
                            : "-" }
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="info-list-item">
                        <label className="info-label">
                          Background Check Status
                        </label>
                        <div className="info-name">
                          {customer?.digisureStatus ?  (BackgroundChecksStatus as any)[customer.digisureStatus] : ""}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="info-list-item">
                        <label className="info-label">Argyle Account</label>
                        <div className="info-name">
                          { customer?.argyleData?.length
                            ? customer?.argyleData?.map((data) => `${data.linkItemId} `)
                            : "" }
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="info-list">
                    <li>
                      <div className="info-list-item">
                        <label className="info-label">Date of Birth</label>
                        <div className="info-name">
                          { customer.dob
                            ? moment( customer.dob ).format( "MM/DD/YYYY" )
                            : "-" }
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="info-list-item">
                        <label className="info-label">Customer Number</label>
                        <div className="info-name">{ customer.id }</div>
                      </div>
                    </li>
                    <li>
                      <div className="info-list-item">
                        <label className="info-label">Address 1</label>
                        <div className="info-name">{ customer.addressLine1 }</div>
                      </div>
                    </li>
                    <li>
                      <div className="info-list-item">
                        <label className="info-label">Address 2</label>
                        <div className="info-name">{ customer.addressLine2 }</div>
                      </div>
                    </li>
                    <li>
                      <div className="info-list-item">
                        <label className="info-label">City</label>
                        <div className="info-name">{ customer.city }</div>
                      </div>
                    </li>
                    <li>
                      <div className="info-list-item">
                        <label className="info-label">State</label>
                        <div className="info-name">{ customer.state }</div>
                      </div>
                    </li>
                    <li>
                      <div className="info-list-item">
                        <label className="info-label">Zip Code</label>
                        <div className="info-name">{ customer.zipCode }</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
};

export default CustomerDetails;
