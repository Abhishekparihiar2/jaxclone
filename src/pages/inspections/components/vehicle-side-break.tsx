import { ChangeEvent } from "react";
import { Inspection } from "../../../shared/models";
import { BREAK_THICKNESS_LIST } from "../../../store/inspections/models";

const VehicleSideBreak = ({
  form,
  isView,
  handleForm,
}: {
  form: Inspection
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
          <label>Front Driver Side Brake Thickness</label>
          <select
            className="form-control"
            disabled={isView}
            value={form.frontDriverSideBrakeThickness}
            name="frontDriverSideBrakeThickness"
            onChange={(e) => {
              handleSelection(e, "Front Driver Side Break Thickness");
            }}
          >
            <option value="" selected={form.frontDriverSideBrakeThickness === ""}>
              Select Brake Thickness
            </option>
            {BREAK_THICKNESS_LIST.map((key: string) => {
              return (
                <>
                  <option
                    value={key}
                    selected={form.frontDriverSideBrakeThickness === key}
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
          <label>Rear Driver Side Brake Thickness</label>
          <select
            className="form-control"
            disabled={isView}
            value={form.rearDriverSideBrakeThickness}
            name="rearDriverSideBrakeThickness"
            onChange={(e) => {
              handleSelection(e, "Rear Driver Side Break Thickness");
            }}
          >
            <option value="" selected={form.rearDriverSideBrakeThickness === ""}>
              Select Brake Thickness
            </option>
            {BREAK_THICKNESS_LIST.map((key: string) => {
              return (
                <>
                  <option
                    value={key}
                    selected={form.rearDriverSideBrakeThickness === key}
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
          <label>Front Passenger Side Brake Thickness</label>
          <select
            className="form-control"
            disabled={isView}
            value={form.frontPassengerSideBrakeThickness}
            name="frontPassengerSideBrakeThickness"
            onChange={(e) => {
              handleSelection(e, "Front Passenger Side Break Thickness");
            }}
          >
            <option value="" selected={form.frontPassengerSideBrakeThickness === ""}>
              Select Brake Thickness
            </option>
            {BREAK_THICKNESS_LIST.map((key: string) => {
              return (
                <>
                  <option
                    value={key}
                    selected={form.frontPassengerSideBrakeThickness === key}
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
          <label>Rear Passenger Side Brake Thickness</label>
          <select
            className="form-control"
            disabled={isView}
            value={form.rearPassengerSideBrakeThickness}
            name="rearPassengerSideBrakeThickness"
            onChange={(e) => {
              handleSelection(e, "Rear Passenger Side Break Thickness");
            }}
          >
            <option value="" selected={form.rearPassengerSideBrakeThickness === ""}>
              Select Brake Thickness
            </option>
            {BREAK_THICKNESS_LIST.map((key: string) => {
              return (
                <>
                  <option
                    value={key}
                    selected={form.rearPassengerSideBrakeThickness === key}
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

export default VehicleSideBreak;
