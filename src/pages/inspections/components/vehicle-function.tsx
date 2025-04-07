import { ChangeEvent } from "react";
import { Inspection } from "../../../shared/models";

const VehicleFunctions = ({
  form,
  isView,
  handleForm,
}: {
  form: Inspection;
  isView: boolean;
  handleForm: (e: ChangeEvent<HTMLInputElement>, resetTaskName: undefined | string) => void;
}) => {
  const handleAttention = (name: string) => {
    form.tasks?.push({
      name: name,
      status: 'ACTIVE',
      vehicleId: form.vehicleId,
      createdAt: new Date()
    })
  }
  return (
    <>
      <div className="row">
        <div className="col-md-4 col-lg-3">
          <div className="form-group">
            <label>All Seatbeats Functional</label>
            <div className="check-action">
              <div className="check-item">
                <input
                  type="radio"
                  id="yes"
                  name="isSeatBeltsFunctional"
                  value="1"
                  disabled={isView}
                  checked={!!Number(form?.isSeatBeltsFunctional)}
                  onChange={(e) => {
                    handleForm(e, "All Seatbeats Functional");
                  }}
                />
                <label>Yes</label>
              </div>
              <div className="check-item">
                <input
                  type="radio"
                  id="attention"
                  disabled={isView}
                  name="isSeatBeltsFunctional"
                  value="0"
                  checked={!Number(form?.isSeatBeltsFunctional)}
                  onChange={(e) => {
                    handleForm(e, undefined);
                    handleAttention("All Seatbeats Functional")
                  }}
                />
                <label>Need Attention</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-3">
          <div className="form-group">
            <label>Headlight Functional</label>
            <div className="check-action">
              <div className="check-item">
                <input
                  type="radio"
                  id="yes"
                  name="isHeadLightsFunctional"
                  value="1"
                  disabled={isView}
                  checked={!!Number(form?.isHeadLightsFunctional)}
                  onChange={(e) => {
                    handleForm(e, "Headlight Functional");
                  }}
                />
                <label>Yes</label>
              </div>
              <div className="check-item">
                <input
                  type="radio"
                  id="attention"
                  name="isHeadLightsFunctional"
                  value="0"
                  disabled={isView}
                  checked={!Number(form?.isHeadLightsFunctional)}
                  onChange={(e) => {
                    handleForm(e, undefined);
                    handleAttention("Headlight Functional")
                  }}
                />
                <label>Need Attention</label>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-lg-3">
          <div className="form-group">
            <label>Taillight Functional</label>
            <div className="check-action">
              <div className="check-item">
                <input
                  type="radio"
                  id="yes"
                  name="isTailLightFunctional"
                  value="1"
                  disabled={isView}
                  checked={!!Number(form?.isTailLightFunctional)}
                  onChange={(e) => {
                    handleForm(e, "Taillight Functional");
                  }}
                />
                <label>Yes</label>
              </div>
              <div className="check-item">
                <input
                  type="radio"
                  id="attention"
                  name="isTailLightFunctional"
                  value="0"
                  disabled={isView}
                  checked={!Number(form?.isTailLightFunctional)}
                  onChange={(e) => {
                    handleForm(e, undefined);
                    handleAttention("Taillight Functional")
                  }}
                />
                <label>Need Attention</label>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-lg-3">
          <div className="form-group">
            <label>Turn Indiciators Functional</label>
            <div className="check-action">
              <div className="check-item">
                <input
                  type="radio"
                  id="yes"
                  name="isIndicatorsFunctional"
                  value="1"
                  disabled={isView}
                  checked={!!Number(form?.isIndicatorsFunctional)}
                  onChange={(e) => {
                    handleForm(e, "Turn Indiciators Functional");
                  }}
                />
                <label>Yes</label>
              </div>
              <div className="check-item">
                <input
                  type="radio"
                  id="attention"
                  name="isIndicatorsFunctional"
                  value="0"
                  disabled={isView}
                  checked={!Number(form?.isIndicatorsFunctional)}
                  onChange={(e) => {
                    handleForm(e, undefined);
                    handleAttention("Turn Indiciators Functional")
                  }}
                />
                <label>Need Attention</label>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-lg-3">
          <div className="form-group">
            <label>Parking Brake Functional</label>
            <div className="check-action">
              <div className="check-item">
                <input
                  type="radio"
                  id="yes"
                  name="isParkingBrakeFunctional"
                  value="1"
                  disabled={isView}
                  checked={!!Number(form?.isParkingBrakeFunctional)}
                  onChange={(e) => {
                    handleForm(e, "Parking Break Functional");
                  }}
                />
                <label>Yes</label>
              </div>
              <div className="check-item">
                <input
                  type="radio"
                  id="attention"
                  name="isParkingBrakeFunctional"
                  value="0"
                  disabled={isView}
                  checked={!Number(form?.isParkingBrakeFunctional)}
                  onChange={(e) => {
                    handleForm(e, undefined);
                    handleAttention("Parking Break Functional")
                  }}
                />
                <label>Need Attention</label>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-lg-3">
          <div className="form-group">
            <label>Steering Functional</label>
            <div className="check-action">
              <div className="check-item">
                <input
                  type="radio"
                  id="yes"
                  name="isSteeringFunctional"
                  value="1"
                  disabled={isView}
                  checked={!!Number(form?.isSteeringFunctional)}
                  onChange={(e) => {
                    handleForm(e, "Steering Functional");
                  }}
                />
                <label>Yes</label>
              </div>
              <div className="check-item">
                <input
                  type="radio"
                  id="attention"
                  name="isSteeringFunctional"
                  value="0"
                  disabled={isView}
                  checked={!Number(form?.isSteeringFunctional)}
                  onChange={(e) => {
                    handleForm(e, undefined);
                    handleAttention("Steering Functional")
                  }}
                />
                <label>Need Attention</label>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-lg-3">
          <div className="form-group">
            <label>Doors/Trunk Functional</label>
            <div className="check-action">
              <div className="check-item">
                <input
                  type="radio"
                  id="yes"
                  name="isDoorsTrunkFunctional"
                  value="1"
                  disabled={isView}
                  checked={!!Number(form?.isDoorsTrunkFunctional)}
                  onChange={(e) => {
                    handleForm(e, "Door/Trunk Functional");
                  }}
                />
                <label>Yes</label>
              </div>
              <div className="check-item">
                <input
                  type="radio"
                  id="attention"
                  name="isDoorsTrunkFunctional"
                  value="0"
                  disabled={isView}
                  checked={!Number(form?.isDoorsTrunkFunctional)}
                  onChange={(e) => {
                    handleForm(e, undefined);
                    handleAttention("Door/Trunk Functional")
                  }}
                />
                <label>Need Attention</label>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-lg-3">
          <div className="form-group">
            <label>Glass Intact</label>
            <div className="check-action">
              <div className="check-item">
                <input
                  type="radio"
                  id="yes"
                  name="isGlassIntact"
                  value="1"
                  disabled={isView}
                  checked={!!Number(form?.isGlassIntact)}
                  onChange={(e) => {
                    handleForm(e, "Glass Intact");
                  }}
                />
                <label>Yes</label>
              </div>
              <div className="check-item">
                <input
                  type="radio"
                  id="attention"
                  name="isGlassIntact"
                  value="0"
                  disabled={isView}
                  checked={!Number(form?.isGlassIntact)}
                  onChange={(e) => {
                    handleForm(e, undefined);
                    handleAttention("Glass Intact")
                  }}
                />
                <label>Need Attention</label>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-lg-3">
          <div className="form-group">
            <label>Windshield Wipers Functional</label>
            <div className="check-action">
              <div className="check-item">
                <input
                  type="radio"
                  id="yes"
                  name="isWindShieldWipersFunctional"
                  value="1"
                  disabled={isView}
                  checked={!!Number(form?.isWindShieldWipersFunctional)}
                  onChange={(e) => {
                    handleForm(e, "Windshield Wipers Functional");
                  }}
                />
                <label>Yes</label>
              </div>
              <div className="check-item">
                <input
                  type="radio"
                  id="attention"
                  name="isWindShieldWipersFunctional"
                  value="0"
                  disabled={isView}
                  checked={!Number(form?.isWindShieldWipersFunctional)}
                  onChange={(e) => {
                    handleForm(e, undefined);
                    handleAttention("Windshield Wipers Functional")
                  }}
                />
                <label>Need Attention</label>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-lg-3">
          <div className="form-group">
            <label>AC/Heat Functional</label>
            <div className="check-action">
              <div className="check-item">
                <input
                  type="radio"
                  id="yes"
                  name="isAcHeatFunctional"
                  value="1"
                  disabled={isView}
                  checked={!!Number(form?.isAcHeatFunctional)}
                  onChange={(e) => {
                    handleForm(e, "AC/Heat Functional");
                  }}
                />
                <label>Yes</label>
              </div>
              <div className="check-item">
                <input
                  type="radio"
                  id="attention"
                  name="isAcHeatFunctional"
                  value="0"
                  disabled={isView}
                  checked={!Number(form?.isAcHeatFunctional)}
                  onChange={(e) => {
                    handleForm(e, undefined);
                    handleAttention("AC/Heat Functional")
                  }}
                />
                <label>Need Attention</label>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-lg-3">
          <div className="form-group">
            <label>Horn Functional</label>
            <div className="check-action">
              <div className="check-item">
                <input
                  type="radio"
                  id="yes"
                  name="isHornFunctional"
                  value="1"
                  disabled={isView}
                  checked={!!Number(form?.isHornFunctional)}
                  onChange={(e) => {
                    handleForm(e, "Horn Functional");
                  }}
                />
                <label>Yes</label>
              </div>
              <div className="check-item">
                <input
                  type="radio"
                  id="attention"
                  name="isHornFunctional"
                  value="0"
                  disabled={isView}
                  checked={!Number(form?.isHornFunctional)}
                  onChange={(e) => {
                    handleForm(e, undefined);
                    handleAttention("Horn Functional")
                  }}
                />
                <label>Need Attention</label>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-lg-3">
          <div className="form-group">
            <label>Window Functional</label>
            <div className="check-action">
              <div className="check-item">
                <input
                  type="radio"
                  id="yes"
                  name="isWindowFunctional"
                  value="1"
                  disabled={isView}
                  checked={!!Number(form?.isWindowFunctional)}
                  onChange={(e) => {
                    handleForm(e, "Window Functional");
                  }}
                />
                <label>Yes</label>
              </div>
              <div className="check-item">
                <input
                  type="radio"
                  id="attention"
                  name="isWindowFunctional"
                  value="0"
                  disabled={isView}
                  checked={!Number(form?.isWindowFunctional)}
                  onChange={(e) => {
                    handleForm(e, undefined);
                    handleAttention("Window Functional")
                  }}
                />
                <label>Need Attention</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleFunctions;
