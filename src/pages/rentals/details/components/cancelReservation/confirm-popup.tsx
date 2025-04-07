import React from 'react'

const ConfirmPopup = ({setRefund}:any) => {
    return (
        <>
            <div className="row confirm-popup-text-row">
                <div className="col-md-12">
                    <div className='sub-content'>
                        <p>Are you sure you want to cancel this reservation?</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-action text-right mt-2 mb-2 confirm-cancel-reservation">
                    <button
                        className="btn btn-orange"
                        onClick={() => setRefund()}
                    >
                        CONFIRM
                    </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmPopup