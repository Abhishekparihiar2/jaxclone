import { ChangeEvent, useLayoutEffect } from "react";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { Inspection } from "../../../shared/models";
import { StoreInterface } from "../../../store";
const VehicleInternals = ({
    form,
    isView,
    errors,
    handleDateForm,
    handleForm,
    setForm
  }: {
    form: Inspection;
    isView: boolean;
    errors: Array<{
      [key: string]: string
    }>,
    handleDateForm: (name: string, value: Date)=>void;
    handleForm: (e: ChangeEvent<HTMLInputElement>, resetTaskName: string | undefined | null) => void;
    setForm: (form: Inspection) => void
  }) => {

  const loginState = useSelector((state: StoreInterface) => state.login);
  
  useLayoutEffect(() => {
    if((!form.inspector || form.inspector.length === 0) && loginState && loginState.name)
      setForm({...form, inspector: loginState.name})
  },[form, loginState])

  const handleAttention = ( name: string ) =>
  {
    if ( form.tasks?.filter( ( e ) => e.name === name ).length === 0 )
    {        
      form.tasks?.push({
        name: name,
        status: 'ACTIVE',
        vehicleId: form.vehicleId,
        createdAt: new Date()
      })
      }
    }

    return (
      <>
        <div className="row">
                  <div className="col-md-4 col-lg-3">
                    <div className="form-group">
                    <label className="date-label date-new-label">Created On
                    </label>
                    <div className="calendar-input">
                        <DatePicker
                          dateFormat="MM/dd/yyyy"
                          className="form-control placeholder-dark"
                          disabled={true}
                          selected={
                            form.date ? new Date(form.date) : new Date()
                          }
                          onChange={(date: Date) => {
                            handleDateForm("date", date);
                          } } 
                          showYearDropdown
                        showMonthDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={ 100 }
                        useShortMonthInDropdown
                        />
                        <span className="btn calendar-btn">
                        <i className="fa fa-calendar" aria-hidden="true"></i>
                      </span>
                    </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <div className="form-group">
                      <label>Inspector</label>
                      <input
                        className="form-control"
                        placeholder=""
                        name="inspector"
                        disabled={true}
                        value={ form.inspector }
                        onChange={(e) => {
                          handleForm(e, undefined);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <div className="form-group">
                      <label>Vehicle Number</label>
                      <input
                        className="form-control"
                        placeholder="0"
                        disabled={true}
                        name="vehicleNumber"
                        value={ form.vehicleNumber }
                        onChange={(e) => {
                          handleForm(e, undefined);
                        }}
                      />
                      <span style={{ color: "red", fontSize: '10px' }}>
                        {errors && Array.isArray(errors)
                          ? errors.map((error: any) => {
                              return error.model;
                            })
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <div className="form-group">
                      <label>Odometer</label>
                      <input
                        className="form-control"
                        placeholder="0"
                        disabled={isView}
                        value={form.odometer}
                        name="odometer"
                        onChange={(e) => {
                          handleForm(e, undefined);
                        }}
                      />
                      <span style={{ color: "red", fontSize: '10px' }}>
                        {errors && Array.isArray(errors)
                          ? errors.map((error: any) => {
                              return error.odometer;
                            })
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <div className="form-group">
                      <label>Exterior Presentable</label>
                      <div className="check-action">
                        <div className="check-item">
                          <input
                            type="radio"
                            id="yes"
                            disabled={isView}
                            name="isExtPresentable"
                            value="1"
                            checked={Number(form?.isExtPresentable) === 1 ? true : false}
                            onChange={(e) => {
                              handleForm(e, "Exterior Presentable");
                            }}
                          />
                          <label>Yes</label>
                        </div>
                        <div className="check-item">
                          <input
                            type="radio"
                            id="attention"
                            disabled={isView}
                            name="isExtPresentable"
                            value="0"
                            checked={Number(form?.isExtPresentable) === 0 ? true : false}
                            onChange={(e) => {
                              handleForm(e, undefined);
                              handleAttention("Exterior Presentable")
                            }}
                          />
                          <label>Need Attention</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <div className="form-group">
                      <label>Interior Presentable</label>
                      <div className="check-action">
                        <div className="check-item">
                          <input
                            type="radio"
                            id="yes"
                            disabled={isView}
                            name="isIntPresentable"
                            value="1"
                            checked={Number(form?.isIntPresentable) === 1 ? true : false}
                            onChange={(e) => {
                              handleForm(e, "Interior Presentable");
                            }}
                          />
                          <label>Yes</label>
                        </div>
                        <div className="check-item">
                          <input
                            type="radio"
                            id="attention"
                            disabled={isView}
                            name="isIntPresentable"
                            value="0"
                            checked={Number(form?.isIntPresentable) === 0 ? true : false}
                            onChange={(e) => {
                              handleForm(e, undefined);
                              handleAttention("Interior Presentable")
                            }}
                          />
                          <label>Need Attention</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <div className="form-group">
                      <label>Tag Present</label>
                      <div className="check-action">
                        <div className="check-item">
                          <input
                            type="radio"
                            id="yes"
                            disabled={isView}
                            name="isTagPresent"
                            value="1"
                            checked={!!Number(form?.isTagPresent)}
                            onChange={(e) => {
                              handleForm(e,"Tag Present");
                            }}
                          />
                          <label>Yes</label>
                        </div>
                        <div className="check-item">
                          <input
                            type="radio"
                            id="attention"
                            disabled={isView}
                            name="isTagPresent"
                            value="0"
                            checked={!Number(form?.isTagPresent)}
                            onChange={(e) => {
                              handleForm(e, undefined);
                              handleAttention("Tag Present")
                            }}
                          />
                          <label>Need Attention</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <div className="form-group">
                      <label>Key Present</label>
                      <div className="check-action">
                        <div className="check-item">
                          <input
                            type="radio"
                            id="yes"
                            disabled={isView}
                            name="isKeyPresent"
                            value="1"
                            checked={!!Number(form?.isKeyPresent)}
                            onChange={(e) => {
                              handleForm(e, "Key Present");
                            }}
                          />
                          <label>Yes</label>
                        </div>
                        <div className="check-item">
                          <input
                            type="radio"
                            id="attention"
                            disabled={isView}
                            name="isKeyPresent"
                            value="0"
                            checked={!Number(form?.isKeyPresent)}
                            onChange={(e) => {
                              handleForm(e, undefined);
                              handleAttention("Key Present")
                            }}
                          />
                          <label>Need Attention</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <div className="form-group">
                      <label>Exterior Notes</label>
                      <input
                        className="form-control"
                        placeholder=""
                        disabled={isView}
                        name="exteriorNote"
                        value={form.exteriorNote}
                        onChange={(e) => {
                          handleForm(e, undefined);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <div className="form-group">
                      <label>Interior Notes</label>
                      <input
                        className="form-control"
                        placeholder=""
                        disabled={isView}
                        value={form.interiorNote}
                        name="interiorNote"
                        onChange={(e) => {
                          handleForm(e, undefined);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <div className="form-group">
                      <label>Working Key FOB</label>
                      <div className="check-action">
                        <div className="check-item">
                          <input
                            type="radio"
                            id="yes"
                            disabled={isView}
                            name="isWorkingKeyFOB"
                            value="1"
                            checked={!!Number(form?.isWorkingKeyFOB)}
                            onChange={(e) => {
                              handleForm(e, "Working Key FOB");
                            }}
                          />
                          <label>Yes</label>
                        </div>
                        <div className="check-item">
                          <input
                            type="radio"
                            id="attention"
                            disabled={isView}
                            name="isWorkingKeyFOB"
                            value="0"
                            checked={!Number(form?.isWorkingKeyFOB)}
                            onChange={(e) => {
                              handleForm(e, undefined);
                              handleAttention("Working Key FOB")
                            }}
                          />
                          <label>Need Attention</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <div className="form-group">
                      <label>Spare Tire Present</label>
                      <div className="check-action">
                        <div className="check-item">
                          <input
                            type="radio"
                            id="yes"
                            disabled={isView}
                            name="isSpareTirePresent"
                            value="1"
                            checked={!!Number(form?.isSpareTirePresent)}
                            onChange={(e) => {
                              handleForm(e, "Spare Tire Present");
                            }}
                          />
                          <label>Yes</label>
                        </div>
                        <div className="check-item">
                          <input
                            type="radio"
                            id="attention"
                            disabled={isView}
                            name="isSpareTirePresent"
                            value="0"
                            checked={!Number(form?.isSpareTirePresent)}
                            onChange={(e) => {
                              handleForm(e, undefined);
                              handleAttention("Spare Tire Present")
                            }}
                          />
                          <label>Need Attention</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <div className="form-group">
                      <label>Tire Jack Present</label>
                      <div className="check-action">
                        <div className="check-item">
                          <input
                            type="radio"
                            id="yes"
                            name="isTireJackPresent"
                            disabled={isView}
                            value="1"
                            checked={!!Number(form?.isTireJackPresent)}
                            onChange={(e) => {
                              handleForm(e, "Tire Jack Present");
                            }}
                          />
                          <label>Yes</label>
                        </div>
                        <div className="check-item">
                          <input
                            type="radio"
                            id="attention"
                            name="isTireJackPresent"
                            disabled={isView}
                            value="0"
                            checked={!Number(form?.isTireJackPresent)}
                            onChange={(e) => {
                              handleForm(e, undefined);
                              handleAttention("Tire Jack Present")
                            }}
                          />
                          <label>Need Attention</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <div className="form-group">
                      <label>Jumper Cable Present</label>
                      <div className="check-action">
                        <div className="check-item">
                          <input
                            type="radio"
                            id="yes"
                            name="isJumperCablePresent"
                            disabled={isView}
                            value="1"
                            checked={!!Number(form?.isJumperCablePresent)}
                            onChange={(e) => {
                              handleForm(e, "Jumper Cable Present");
                            }}
                          />
                          <label>Yes</label>
                        </div>
                        <div className="check-item">
                          <input
                            type="radio"
                            id="attention"
                            name="isJumperCablePresent"
                            disabled={isView}
                            value="0"
                            checked={!Number(form?.isJumperCablePresent)}
                            onChange={(e) => {
                              handleForm(e, undefined);
                              handleAttention("Jumper Cable Present")
                            }}
                          />
                          <label>Need Attention</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <div className="form-group">
                      <label>Current Oil Change</label>
                      <div className="check-action">
                        <div className="check-item">
                          <input
                            type="radio"
                            id="yes"
                            name="isCurrentOilChange"
                            disabled={isView}
                            value="1"
                            checked={!!Number(form?.isCurrentOilChange)}
                            onChange={(e) => {
                              handleForm(e, "Current Oil Change");
                            }}
                          />
                          <label>Yes</label>
                        </div>
                        <div className="check-item">
                          <input
                            type="radio"
                            id="attention"
                            name="isCurrentOilChange"
                            disabled={isView}
                            value="0"
                            checked={!Number(form?.isCurrentOilChange)}
                            onChange={(e) => {
                              handleForm(e, undefined);
                              handleAttention("Current Oil Change")
                            }}
                          />
                          <label>Need Attention</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <div className="form-group">
                      <label>Fuel</label>
                      <div>
                        <div className="control_inline">
                          <label className="control control--radio control-radio2">
                            Empty
                            <input
                              type="radio"
                              className="form-check-input"
                              name="fuel"
                              disabled={isView}
                              value="empty"
                              checked={form?.fuel === "empty"}
                              onChange={(e) => {
                                handleForm( e, undefined );
                                handleAttention( "Fuel" );
                              }}
                            />
                            <div className="control__indicator"></div>
                          </label>
                          <label className="control control--radio control-radio2">
                            1/4
                            <input
                              type="radio"
                              className="form-check-input"
                              name="fuel"
                              disabled={isView}
                              value="1/4"
                              checked={form?.fuel === "1/4"}
                              onChange={(e) => {
                                handleForm( e, undefined );
                                handleAttention( "Fuel" );
                              }}
                            />
                            <div className="control__indicator"></div>
                          </label>
                          <label className="control control--radio control-radio2">
                            1/2
                            <input
                              type="radio"
                              className="form-check-input"
                              name="fuel"
                              disabled={isView}
                              value="1/2"
                              checked={form?.fuel === "1/2"}
                              onChange={(e) => {
                                handleForm( e, undefined );
                                handleAttention( "Fuel" );
                              }}
                            />
                            <div className="control__indicator"></div>
                          </label>
                          <label className="control control--radio control-radio2">
                            3/4
                            <input
                              type="radio"
                              className="form-check-input"
                              name="fuel"
                              disabled={isView}
                              value="3/4"
                              checked={form?.fuel === "3/4"}
                              onChange={(e) => {
                                handleForm( e, undefined );
                                handleAttention( "Fuel" );
                              }}
                            />
                            <div className="control__indicator"></div>
                          </label>
                          <label className="control control--radio control-radio2">
                            Full
                            <input
                              type="radio"
                              className="form-check-input"
                              name="fuel"
                              disabled={isView}
                              value="full"
                              checked={form?.fuel === "full"}
                              onChange={(e) => {
                                handleForm(e, "Fuel");
                              }}
                            />
                            <div className="control__indicator"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <div className="form-group">
                      <label>Tire Pressure Warning Light Off</label>
                      <div className="check-action">
                        <div className="check-item">
                          <input
                            type="radio"
                            id="yes"
                            name="isPressureWarningLightsOff"
                            value="1"
                            disabled={isView}
                            checked={!!Number(form?.isPressureWarningLightsOff)}
                            onChange={(e) => {
                              handleForm(e, "Tire Pressure Warning Light Off");
                            }}
                          />
                          <label>Yes</label>
                        </div>
                        <div className="check-item">
                          <input
                            type="radio"
                            id="attention"
                            name="isPressureWarningLightsOff"
                            value="0"
                            disabled={isView}
                            checked={!Number(form?.isPressureWarningLightsOff)}
                            onChange={(e) => {
                              handleForm(e, undefined);
                              handleAttention("Tire Pressure Warning Light Off")
                            }}
                          />
                          <label>Need Attention</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <div className="form-group">
                      <label>Dash Warning</label>
                      <div className="check-action">
                        <div className="check-item">
                          <input
                            type="radio"
                            id="yes"
                            name="isDashWarning"
                            value="1"
                            disabled={isView}
                            checked={!!Number(form?.isDashWarning)}
                            onChange={(e) => {
                              handleForm(e, "Dash Warning");
                            }}
                          />
                          <label>Yes</label>
                        </div>
                        <div className="check-item">
                          <input
                            type="radio"
                            id="attention"
                            name="isDashWarning"
                            value="0"
                            disabled={isView}
                            checked={!Number(form?.isDashWarning)}
                            onChange={(e) => {
                              handleForm(e, undefined);
                              handleAttention("Dash Warning")
                            }}
                          />
                          <label>Need Attention</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <div className="form-group">
                      <label>Dash Warning Notes</label>
                      <input
                        className="form-control"
                        placeholder=""
                        disabled={isView}
                        value={form.dashWarningNote}
                        name="dashWarningNote"
                        onChange={(e) => {
                          handleForm(e, undefined);
                        }}
                      />
                    </div>
                  </div>
                </div>
      </>
    );
  };
  
  export default VehicleInternals;
  