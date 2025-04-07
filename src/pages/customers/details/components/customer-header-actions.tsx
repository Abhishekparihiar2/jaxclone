import { FC } from "react";
import { UserStatus } from "../../../../shared/models";
import { User } from "../../../../store/customers/model";
import { updateStatus } from "../../../../store/customers/action";
import { useDispatch } from "react-redux";
import { ResponseError } from "../../../../store/shared/model";

interface CustomerHeaderActionsInterface {
  customer: User;
}

const CustomerHeaderActions: FC<CustomerHeaderActionsInterface> = (
  props: CustomerHeaderActionsInterface
) => {
  const { customer } = props;
  const dispatch = useDispatch();
  const updateVehicleStatus = async ( status: string ) =>
  {
    if(status && (status === 'ACTIVE' || customer.status === "ACTIVE" ))
      return dispatch(new ResponseError("Status cannot be changed manually!").action())

    if (status && customer?.id) {
      dispatch(updateStatus(status, customer?.id));
    }
  };

  return (
    <>
      <div className="page-header-right">
        <div className="status-action page-status">
          <label>Status</label>
          <div className="dropdown">
            <button
              className="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i
                className={`fa fa-circle mr-1 ${
                  customer?.status === "ACTIVE" ? "text-success" : "text-dark"
                }`}
                aria-hidden="true"
              ></i>
              { customer?.status ? (UserStatus as any)[customer.status] : "Active"}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <ul>
                {Object.keys(UserStatus).map((key: string) => {
                  return (
                    <>
                      <li>
                        {/* eslint-disable-next-line */}
                        <a
                          className={`dropdown-item ${
                            customer?.status === key ? "active" : ""
                          }`}
                          href="#"
                          onClick={(e) => updateVehicleStatus(key)}
                        >
                          {(UserStatus as any)[key]}
                        </a>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* <span><i className="fa fa-circle text-success" aria-hidden="true"></i> Active</span> */}
        </div>
      </div>
    </>
  );
};

export default CustomerHeaderActions;
