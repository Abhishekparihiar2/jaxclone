import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Api from "../../../Api";
import { ResponseError, ResponseSuccess } from '../../../store/shared/model';

export interface Form {
    name: string|null|undefined,
    DailyRate: string|null|undefined,
    MaintenancePlan: string|null|undefined,
    ProtectionPlan: string|null|undefined,
    InsurancePlan: string|null|undefined,
    JaxAdminFee: string|null|undefined,
}
const AddCustomSetting = ({handleClose}: {
    handleClose: () => void
}) => {
    const initialForm = {
        name: "",
        DailyRate: "0",
        MaintenancePlan: "0",
        ProtectionPlan: "0",
        InsurancePlan: "0",
        JaxAdminFee: "0",
    }
    const [error, setError] = useState<any>([])
    const [form, setForm] = useState<Form>(initialForm)
    const dispatch = useDispatch()

    const validate = () => {
        let errArray = []
        let isValid = true
        if(!form.name || !form.name.length) {
            errArray.push({
                name: "Please provide vehicle type"
            })
            isValid = false
        }
        if(!isValid) {
            setError(errArray)
        }
        return isValid
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const isValid = validate()
        if(isValid) {
            try {
                const data: any = form
                data.DailyRate = parseFloat(form.DailyRate || '0')
                data.name = form.name
                data.MaintenancePlan = parseFloat(form.MaintenancePlan || '0')
                data.InsurancePlan = parseFloat(form.InsurancePlan || '0')
                data.ProtectionPlan = parseFloat(form.ProtectionPlan || '0')
                data.JaxAdminFee = parseFloat(form.JaxAdminFee || '0')
                console.log(data)
                const res = await Api.post('/api/v1/vehicle-type', data)
                dispatch(new ResponseSuccess('Vehicle Type added!').action())
                handleClose()
                window.location.reload()
            } catch(e: any) {
                dispatch(new ResponseError(e?.response?.data?.message || e.message).action())
            }
        }
    }
    const resetError = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      ) =>
      {
        const name = e.target.name;
        let oldErrors = error;
        const updatedErrors = oldErrors.filter( ( errorData: any, index: number ) => !(name in errorData))
        setError( updatedErrors );
    };
    const handleForm = (e: any) => {
        let value = e.target.value
        if(
          e.target.name === 'DailyRate' || 
          e.target.name === 'MaintenancePlan' || 
          e.target.name === 'ProtectionPlan' || 
          e.target.name === 'InsurancePlan' || 
          e.target.name === 'JaxAdminFee'
        ) {
          value = isNaN(parseFloat(value)) ? 0 : value
        }
        setForm((prevForm: Form) => ({...prevForm, [e.target.name]: value}))
    }
    return (
        <>
            <form name="add-edit-employee" onSubmit={(e) => handleSubmit(e)}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Vehicle Type</label>
                        <input
                            type="text"
                            name={"name"}
                            value={form.name || ""}
                            onChange={(e) => {
                            resetError(e)
                            handleForm(e)
                            }}
                            className="form-control"
                            placeholder=""
                        />
                        {error && Array.isArray(error) ? (
                            <span style={{ color: "red", fontSize: "10px" }}>
                            {error.map((error: any) => {
                                return error.name;
                            })}
                            </span>
                        ) : (
                            ""
                        )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Daily Rate</label>
                            <input
                                type="text"
                                name={"DailyRate"}
                                value={form.DailyRate || ""}
                                onChange={(e) => {
                                resetError(e)
                                handleForm(e)
                                }}
                                className="form-control"
                                placeholder=""
                            />
                            {error && Array.isArray(error) ? (
                                <span style={{ color: "red", fontSize: "10px" }}>
                                {error.map((error: any) => {
                                    return error.DailyRate;
                                })}
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Maintenance Plan</label>
                            <input
                            type="text"
                            className="form-control"
                            name="MaintenancePlan"
                            value={form.MaintenancePlan || ""}
                            onChange={(e) => {
                            resetError(e)
                            handleForm(e)
                            }}
                            />
                            {error && Array.isArray(error) ? (
                                <span style={{ color: "red", fontSize: "10px" }}>
                                {error.map((err: any) => err.MaintenancePlan)}
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Protection Plan</label>
                            <input
                            type="text"
                            className="form-control"
                            name="ProtectionPlan"
                            value={form.ProtectionPlan || ""}
                            onChange={(e) => {
                            resetError(e)
                            handleForm(e)
                            }}
                            />
                            {error && Array.isArray(error) ? (
                                <span style={{ color: "red", fontSize: "10px" }}>
                                {error.map((err: any) => err.ProtectionPlan)}
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Insurance Plan</label>
                            <input
                            type="text"
                            className="form-control"
                            name="InsurancePlan"
                            value={form.InsurancePlan || ""}
                            onChange={(e) => {
                            resetError(e)
                            handleForm(e)
                            }}
                            />
                            {error && Array.isArray(error) ? (
                                <span style={{ color: "red", fontSize: "10px" }}>
                                {error.map((err: any) => err.InsurancePlan)}
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Jax Admin Fee</label>
                            <input
                            type="text"
                            className="form-control"
                            name="JaxAdminFee"
                            value={form.JaxAdminFee || ""}
                            onChange={(e) => {
                            resetError(e)
                            handleForm(e)
                            }}
                            />
                            {error && Array.isArray(error) ? (
                                <span style={{ color: "red", fontSize: "10px" }}>
                                {error.map((err: any) => err.JaxAdminFee)}
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <button className="btn btn-orange pull-left" type="submit">
                        Save
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddCustomSetting