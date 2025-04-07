import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Api from '../../../../../Api'
import { Rental } from '../../../../../store/rentals/model'
import { ResponseSuccess } from '../../../../../store/shared/model'

const RefundPopup = ({rental, handleClose}: {
    rental: Rental,
    handleClose: () => void
}) => {
    const [amount, setAmount] = useState("")
    const [errors, setErrors] = useState<any>([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const resetError = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      ) =>
    {
        const name = e.target.name;
        let oldErrors = errors;
        const updatedErrors = oldErrors.filter( ( error: any, index: number ) => !(name in error))
        setErrors( updatedErrors );
    };

    const validate = () => {
        let errorArr = []
        let isValid = true
        if(!amount || amount.length === 0 || isNaN(parseInt(amount))) {
            errorArr.push( {
                amount: "Please provide refund percentage",
            } );
            isValid = false
        }
        if(amount && amount.length && (parseInt(amount) > 100)) {
            errorArr.push( {
                amount: "Refund Percentage cannot be greater then 100",
            } );
            isValid = false
        }
        if ( !isValid ) {
            setErrors( errorArr );
        }
        return isValid;
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const isValid = validate()
        if(isValid) {
            await Api.post(`/api/v1/booking/${rental.id}/cancel`, {
                refundDeductionPercentage: amount && parseInt(amount)
            })
            dispatch(new ResponseSuccess("Rental refunded successfully!").action())
            handleClose()
            setTimeout(() => {
                window.location.href = `/rental-details/${rental.id}`  
            }, 2000)
        }
    } 

    return <>
    <form onSubmit={handleSubmit}>
        <div className="row">
            <div className="col-md-12">
                <div className="form-group">
                    <label>Cancellation charges (In %)</label>
                    <input
                    type="text"
                    name="amount"
                    className="form-control placeholder-dark"
                    placeholder="20"
                    value={ amount }
                    onChange={ ( e ) =>
                    {
                        resetError( e );
                        setAmount(e.target.value)
                    } }
                    />
                    <span style={ { color: "red", fontSize: '10px' } }>
                    { errors && Array.isArray( errors )
                        ? errors.map( ( error: any ) =>
                        {
                        return error.amount;
                        } )
                        : "" }
                    </span>
                </div>
            </div>
        </div>
        <div className="row">
                <div className="col-md-12">
                    <div className="form-action text-right mt-2 mb-2 confirm-cancel-reservation">
                    <button
                        className="btn btn-orange"
                        type="submit"
                    >
                        SUBMIT
                    </button>
                    </div>
                </div>
            </div>
    </form>
    </>
}

export default RefundPopup