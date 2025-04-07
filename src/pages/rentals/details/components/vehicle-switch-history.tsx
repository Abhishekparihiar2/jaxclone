import React, { useState } from "react";
import JAXModal from "../../../../shared/components/modal/jax-modal";
import { Rental } from "../../../../store/rentals/model";
import SwitchVehicleBody from "./switch-vehicle-body";
import { formatDate } from '../../../../utils/index';
import { useNavigate } from 'react-router-dom';
import { VehicleSwitches } from "../../../../shared/models";
import { Link } from 'react-router-dom';
interface VehicleSwitchHistoryInterface {
  rental: Rental;
}
const VehicleSwitchHistory = ({rental}: VehicleSwitchHistoryInterface) => {
  const [showVehicleSwitch, setShowVehicleSwitch] = useState(false)
  const navigate = useNavigate()
  const handleClick = (data: VehicleSwitches) => {
    console.log(data)
    if(data.status === 'OPEN') {
      navigate(`/add-inspection/?newVehicleId=${data.finalVehicleId}&rentalId=${rental.id}&initialVehicle=${data.initialVehicleId}&type=2&switch=open&switchId=${data.id}`)
    } else if(data.status === 'POST_VEHICLE_INSPECTION') {
      navigate(`/add-inspection/?newVehicleId=${data.finalVehicleId}&rentalId=${rental.id}&initialVehicle=${data.initialVehicleId}&type=1&switch=done&switchId=${data.id}`)
    }
  }
  return (
    <section className="card mb20">
      <header className="card-header pl-5rem card-head-icon">
        <h2 className="card-title">Vehicle Switch History</h2>
        <div className="card-head-actions">
          {
            !["CANCELED", "FINISHED"].includes(rental.status) && 
            <a
              className="btn orange-circle"
              href="#"
              data-toggle="modal"
              data-target="#switchVehiclesModal"
              onClick={() => setShowVehicleSwitch(true)}
            >
              <i className="fa fa-plus" aria-hidden="true"></i>
            </a>
          }
        </div>
      </header>
      <div className="card-body p-0 border-none">
        <div className="table-responsive table-common">
          <table className="table mb-0">
            <thead>
              <tr>
                <th style={{ width: "25%" }}>Orignal Vehicle</th>
                <th style={{ width: "25%" }}>New Vehicle</th>
                <th style={{ width: "25%" }}>Date</th>
                <th style={{ width: "25%" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                rental.vehicleSwitches.map((data) => {
                  return (
                    <tr>
                      <td>
                        <Link className="text-primary" to={`/vehicle-detail/${data.initialVehicleId}`}>
                          {data.oldVehicleName}
                        </Link>
                        <i
                          className="fa fa-chevron-right pull-right ml-0 mt-1"
                          aria-hidden="true"
                        ></i>
                      </td>
                      <td>
                        <Link className="text-primary" to={`/vehicle-detail/${data.finalVehicleId}`}>
                          {data.newVehicleName}
                        </Link>
                      </td>
                      <td>{formatDate(new Date(data.createdAt))}</td>
                      <td>
                        {
                            (data.status === 'DONE' || data.status === 'PRE_VEHICLE_INSPECTION') ? 
                            data.status  
                          :  <a className="text-danger" href="#" onClick={() => handleClick(data)}>
                              Pending Inspection
                          </a>
                        }
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <JAXModal 
        show={showVehicleSwitch}
        handleClose={() =>setShowVehicleSwitch(false)}
        heading={"Switch vehicle"}
      >
        <SwitchVehicleBody />
      </JAXModal>
    </section>
  );
};

export default VehicleSwitchHistory;
