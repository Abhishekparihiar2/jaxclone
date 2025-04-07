import { FC, useEffect } from "react";
import { Rental } from "../../../../store/rentals/model";
import moment from "moment";
import { formatDate } from "../../../../utils/index";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { fetchVehicleTypes } from "../../../../store/vehicleTypes/action";
import { Vehicle } from "../../../../shared/models";

interface VehicleInformationInterface
{
  vehicle: Vehicle;
  rental?: Rental;
}

const VehicleInformation: FC<VehicleInformationInterface> = (
  props: VehicleInformationInterface
) =>
{
  const dispatch = useDispatch(); 
  const { vehicle, rental } = props;
  const vehicleTypes = useSelector((state: RootState)=>state.vehicleTypesValues.vehicleTypes);
  useEffect(()=>{ 
    dispatch(fetchVehicleTypes());
    // eslint-disable-next-line
  }, []);
  return (
    <section className="card mb20">
      <header className="card-header pl-5rem">
        <h2 className="card-title">Vehicle Info</h2>
      </header>
      <div className="card-body">
        <div className="vehicle-info-detail">
          <div className="vehicle-pic">
            <figure className="mb-3">
            {vehicle?.primaryImageUrl ? <img src={ vehicle?.primaryImageUrl } alt="" /> : <div className="upload-file">
              <div className="upload-file-text"><i className="fa fa-camera" aria-hidden="true"></i></div>
              </div>}
            </figure>
          </div>
          <div className="vehicle-info-list">
            <ul className="info-list">
              <li>
                <div className="info-list-item">
                  <label className="info-label">Vehicle Number</label>
                  <div className="info-name">
                    <a href={ vehicle?.id ? `/vehicle-detail/${ vehicle.id }` : "#" }>{ vehicle?.number }</a>
                  </div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">Year</label>
                  <div className="info-name">
                    { vehicle?.year
                      ? formatDate( new Date( vehicle.year ), true )
                      : "" }
                  </div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">Make</label>
                  <div className="info-name">{ vehicle?.make }</div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">Model</label>
                  <div className="info-name">{ vehicle?.model }</div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">VIN</label>
                  <div className="info-name">{ vehicle?.vin }</div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">Tag Number</label>
                  <div className="info-name">{ vehicle?.tagNumber }</div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">Pickup Odometer</label>
                  <div className="info-name">
                    { " " }
                    { rental?.pickUpOdometer
                      ? rental?.pickUpOdometer + " Miles"
                      : "-" }
                  </div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">Return Odometer</label>
                  <div className="info-name">
                    { " " }
                    { rental?.returnOdometer
                      ? rental?.returnOdometer + " Miles"
                      : "-" }
                  </div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">Last Oil Change</label>
                  <div className="info-name">
                    { vehicle?.lastOilChangeDate
                      ? moment( vehicle?.lastOilChangeDate ).format( "MM/DD/YYYY" )
                      : "-" }
                  </div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">Vehicle Type</label>
                  <div className="info-name">
                    { vehicleTypes?.[ vehicle?.vehicleTypeId ] }
                  </div>
                </div>
              </li>
              <li>
                <div className="info-list-item">
                  <label className="info-label">Registration Expiration</label>
                  <div className="info-name">
                    { moment( vehicle?.registrationExpDate ).format( "MM/YYYY" ) }
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleInformation;
