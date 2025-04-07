import { ChangeEvent } from "react";
import { Inspection } from "../../../shared/models";
import { TIRE_TREAD_LIST } from "../../../store/inspections/models";

const VehicleTire = ({
  form,
  isView,
  handleForm,
}: {
  form: Inspection;
  isView: boolean;
  handleForm: (e: ChangeEvent<HTMLSelectElement>, resetTaskName: undefined | string) => void;
  } ) =>
{
  const handleAttention = (name: string) => {
    form.tasks?.push({
      name: name,
      status: 'ACTIVE',
      vehicleId: form.vehicleId,
      createdAt: new Date()
    })
  }

  const handleSelection = ( e: ChangeEvent<HTMLSelectElement>, name:string ) => {
    const value = e?.target?.value;
    if ( value ==="NA" )
    {
      handleForm( e, undefined );
      handleAttention(name)
    } else
    {
      handleForm( e, name );
    }
  }
  return (
    <>
      <div className="col-md-4 col-lg-3">
        <div className="form-group">
          <label>Front Driver Side Tire Tread</label>
          <select
            className="form-control"
            disabled={isView}
            value={form.frontDriverSideTireTread}
            name="frontDriverSideTireTread"
            onChange={ ( e ) =>
            {
              handleSelection(e, "Front Driver Side Tire Tread");
            }}
          >
            <option value="" selected={form.frontDriverSideTireTread === ""}>
              Select Tire Tread
            </option>
            {TIRE_TREAD_LIST.map((key: string) => {
              return (
                <>
                  <option
                    value={key}
                    selected={form.frontDriverSideTireTread === key}
                  >
                    {key}
                  </option>
                </>
              );
            } ) }
              <option
                    value={"NA"}
                    selected={form.frontDriverSideTireTread === "NA"}
                  >
                    Needs Attention
                  </option>
          </select>
        </div>
      </div>
      <div className="col-md-4 col-lg-3">
        <div className="form-group">
          <label>Rear Driver Side Tire Tread</label>

          <select
            className="form-control"
            disabled={isView}
            value={form.rearDriverSideTread}
            name="rearDriverSideTread"
            onChange={(e) => {
              handleSelection(e, "Rear Driver Side Tire Tread");
            }}
          >
            <option value="" selected={form.rearDriverSideTread === ""}>
              Select Tire Tread
            </option>
            {TIRE_TREAD_LIST.map((key: string) => {
              return (
                <>
                  <option
                    value={key}
                    selected={form.rearDriverSideTread === key}
                  >
                    {key}
                  </option>
                </>
              );
            } ) }
                <option
                    value={"NA"}
                    selected={form.frontDriverSideTireTread === "NA"}
                  >
                    Needs Attention
                  </option>
          </select>
        </div>
      </div>
      <div className="col-md-4 col-lg-3">
        <div className="form-group">
          <label>Front Passenger Side Tire Tread</label>

          <select
            className="form-control"
            disabled={isView}
            value={form.frontPassengerSideTread}
            name="frontPassengerSideTread"
            onChange={(e) => {
              handleSelection(e, "Front Passenger Side Tire Tread");
            }}
          >
            <option value="" selected={form.frontPassengerSideTread === ""}>
              Select Tire Tread
            </option>
            {TIRE_TREAD_LIST.map((key: string) => {
              return (
                <>
                  <option
                    value={key}
                    selected={form.frontPassengerSideTread === key}
                  >
                    {key}
                  </option>
                </>
              );
            } ) }
                <option
                    value={"NA"}
                    selected={form.frontDriverSideTireTread === "NA"}
                  >
                    Needs Attention
                  </option>
          </select>
        </div>
      </div>
      <div className="col-md-4 col-lg-3">
        <div className="form-group">
          <label>Rear Passenger Side Tire Tread</label>

          <select
            className="form-control"
            disabled={isView}
            value={form.rearPassengerSideTread}
            name="rearPassengerSideTread"
            onChange={(e) => {
              handleSelection(e, "Rear Passenger Side Tire Tread");
            }}
          >
            <option value="" selected={form.rearPassengerSideTread === ""}>
              Select Tire Tread
            </option>
            {TIRE_TREAD_LIST.map((key: string) => {
              return (
                <>
                  <option
                    value={key}
                    selected={form.rearPassengerSideTread === key}
                  >
                    {key}
                  </option>
                </>
              );
            } ) }
                <option
                    value={"NA"}
                    selected={form.frontDriverSideTireTread === "NA"}
                  >
                    Needs Attention
                  </option>
          </select>
        </div>
      </div>
    </>
  );
};

export default VehicleTire;
