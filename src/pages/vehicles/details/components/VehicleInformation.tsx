import { useEffect } from "react";
import { formatAmount, formatDate, formatNumberAsThousand } from "../../../../utils/index";
import { VehicleInformationInterface } from "../../interface";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { fetchVehicleTypes } from "../../../../store/vehicleTypes/action";

const VehicleInformation = ( { vehicle }: VehicleInformationInterface ) =>
{
  const dispatch = useDispatch();
  const vehicleTypes = useSelector((state: RootState)=>state.vehicleTypesValues.vehicleTypes);
  useEffect(()=>{ 
    dispatch(fetchVehicleTypes());
    // eslint-disable-next-line
  }, []);
  return (
    <section className="card mb20">
      <header className="card-header">
        <h2 className="card-title">
          Vehicle Information:{ " " }
          {/* <span className="text-orange"> */ }
          <span className="main-details">
            { vehicle?.year ? formatDate( new Date( vehicle.year ), true ) : "" }{ " " }
            { vehicle?.make } { vehicle?.model }
          </span>
        </h2>
        <div className="card-head-actions">
          <Link className="btn orange-circle radius-sm" to={ `/vehicle-edit/${ vehicle?.id }` }>
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </Link>
        </div>
      </header>
      <div className="card-body">
        <ul className="info-list info-list2-col">
          <li>
            <div className="info-list-item">
              <label className="info-label">Vehicle Number</label>
              <div className="info-name">{ vehicle?.number }</div>
            </div>
          </li>
          <li>
            <div className="info-list-item">
              <label className="info-label">Location</label>
              <div className="info-name">
                { vehicle?.city } { vehicle?.state }
              </div>
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
              <label className="info-label">Color</label>
              <div className="info-name">{ vehicle?.color }</div>
            </div>
          </li>
          <li>
            <div className="info-list-item">
              <label className="info-label">Vehicle Type</label>
              <div className="info-name">
                { vehicleTypes?.[ vehicle?.vehicleTypeId || 1 ] }
              </div>
            </div>
          </li>
          <li>
            <div className="info-list-item">
              <label className="info-label">Odometer</label>
              <div className="info-name">
                { formatNumberAsThousand(vehicle?.odometer || 0) } miles | { moment( vehicle?.odometerDate ? vehicle?.odometerDate : new Date() ).format( 'L' ) }
              </div>
            </div>
          </li>
          <li>
            <div className="info-list-item">
              <label className="info-label">Last Oil Change Date</label>
              <div className="info-name">
                { vehicle?.lastOilChangeDate
                  ? moment( vehicle?.lastOilChangeDate ).format( 'L' )
                  : "-" }
              </div>
            </div>
          </li>
          <li>
            <div className="info-list-item">
              <label className="info-label">Number of Doors</label>
              <div className="info-name">{ vehicle?.door } Doors</div>
            </div>
          </li>
          <li>
            <div className="info-list-item">
              <label className="info-label">Transmission</label>
              <div className="info-name">{ vehicle?.transmission }</div>
            </div>
          </li>
          <li>
            <div className="info-list-item">
              <label className="info-label">Fuel Type</label>
              <div className="info-name">{ vehicle?.fuelType }</div>
            </div>
          </li>
          <li>
            <div className="info-list-item">
              <label className="info-label">Gas Tank Size</label>
              <div className="info-name">{ vehicle?.gasTankSize }</div>
            </div>
          </li>
          <li>
            <div className="info-list-item">
              <label className="info-label">Vehicle Cost</label>
              <div className="info-name">$ { formatNumberAsThousand(vehicle?.vehicleCost || 0) }</div>
            </div>
          </li>
          <li>
            <div className="info-list-item">
              <label className="info-label">Price Adjustment</label>
              <div className="info-name">{ 
                vehicle?.priceIncrement ? `+ ${vehicle?.priceIncrement} %` : 
                vehicle?.priceDecrement ? `- ${vehicle?.priceDecrement} %` : `${0} %`
              }</div>
            </div>
          </li>
          <li>
            <div className="info-list-item">
              <label className="info-label">Daily Rate</label>
              <div className="info-name">{ formatAmount( vehicle?.DayRate || 0 ) }/day</div>
            </div>
          </li>
          <li className="full-li2">
            <div className="info-list-item">
              <label className="info-label">Features</label>
              <div className="info-name">{ vehicle?.features ? ((vehicle.features).split(',')).join(', ') : '-' }</div>
            </div>
          </li>
          <li className="full-li2">
            <div className="info-list-item">
              <label className="info-label">Description</label>
              <div className="info-name">{ vehicle?.description ? vehicle.description : '-' }</div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default VehicleInformation;
