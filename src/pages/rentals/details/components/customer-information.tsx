import React, { FC } from "react";
import moment from "moment";
import { formatPhoneNumber } from "../../../../utils"
import { User } from "../../../../shared/models";

interface CustomerInformationInterface
{
  user: User;
}

const CustomerInformation: FC<CustomerInformationInterface> = (
  props: CustomerInformationInterface
) =>
{
  const { user } = props;

  return (
    <section className="card mb20">
      <header className="card-header">
        <h2 className="card-title">Customer Info</h2>
      </header>
      <div className="card-body">
        <div className="rental-cust-info">
          <div className="rental-cust-pic">
            <img src={ user?.profileImageUrl || "/static/images/profile.png" } alt="" />
          </div>
          <div className="rental-cust-detail">
            <div className="row">
              <div className="col-md-6">
                <ul className="info-list">
                  <li>
                    <div className="info-list-item">
                      <label className="info-label">Name</label>
                      <div className="info-name">
                        <a href={ user?.id ? `/customer-info/${ user.id }` : "#" }>{ `${ user?.firstName } ${ user.lastName }` }</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="info-list-item">
                      <label className="info-label">Email</label>
                      <div className="info-name">
                        <a href={ user?.id ? `/customer-info/${ user.id }` : "#" }>{ user?.email }</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="info-list-item">
                      <label className="info-label">Phone</label>
                      <div className="info-name">{ user?.phoneNumber ? formatPhoneNumber( user.phoneNumber ) : "-" }</div>
                    </div>
                  </li>
                  <li>
                    <div className="info-list-item">
                      <label className="info-label">DL Number</label>
                      <div className="info-name">{ user?.dlNumber }</div>
                    </div>
                  </li>
                  <li>
                    <div className="info-list-item">
                      <label className="info-label">DL State</label>
                      <div className="info-name">{ user?.dlState }</div>
                    </div>
                  </li>
                  <li>
                    <div className="info-list-item">
                      <label className="info-label">Issue Date</label>
                      <div className="info-name">{ moment( user?.dlIssueDate ).format( 'LL' ) }</div>
                    </div>
                  </li>
                  <li>
                    <div className="info-list-item">
                      <label className="info-label">Expiration Date</label>
                      <div className="info-name">{ moment( user?.dlExpDate ).format( 'LL' ) }</div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="info-list">
                  <li>
                    <div className="info-list-item">
                      <label className="info-label">Nickname</label>
                      <div className="info-name">{ user?.nickname }</div>
                    </div>
                  </li>
                  <li>
                    <div className="info-list-item">
                      <label className="info-label">Date of Birth</label>
                      <div className="info-name">
                        { moment( user?.dob ).format( "LL" ) }
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="info-list-item">
                      <label className="info-label">Address 1</label>
                      <div className="info-name">{ user?.addressLine1 }</div>
                    </div>
                  </li>
                  <li>
                    <div className="info-list-item">
                      <label className="info-label">Address 2</label>
                      <div className="info-name">{ user?.addressLine2 }</div>
                    </div>
                  </li>
                  <li>
                    <div className="info-list-item">
                      <label className="info-label">City</label>
                      <div className="info-name">{ user?.city }</div>
                    </div>
                  </li>
                  <li>
                    <div className="info-list-item">
                      <label className="info-label">State</label>
                      <div className="info-name">{ user?.state }</div>
                    </div>
                  </li>
                  <li>
                    <div className="info-list-item">
                      <label className="info-label">Zip Code</label>
                      <div className="info-name">{ user?.zipCode }</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerInformation;
