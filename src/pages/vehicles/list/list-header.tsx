import React from 'react'
import { VehicleListHeaderInterface } from '../interface'

const VehicleListHeader = ({
    totalPageSize,
    handleExport,
    changePageSize
}: VehicleListHeaderInterface) => {
    return (
        <>
            <div className="table-head">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <h3 className="mb-0">Vehicle Details</h3>
                    </div>
                    <div className="col-md-6">
                        <div className="head-page-action">
                            <div className="page-size">
                                <label>Page Size</label>
                                <select className="form-control" onChange={(e) => changePageSize(Number(e.target.value))}>
                                <option selected={totalPageSize === 5 ? true : false}>5</option>
                                <option selected={totalPageSize === 10 ? true : false}>10</option>
                                <option selected={totalPageSize === 20 ? true : false}>20</option>
                                <option selected={totalPageSize === 50 ? true : false}>50</option>
                                </select>
                            </div>
                            <div className="export-btn ml-2">
                                <button className="btn btn-orange" onClick={handleExport}>
                                <img
                                    className="mr-1"
                                    src="/static/images/icon-excel.png"
                                    alt=""
                                />
                                Export to Excel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VehicleListHeader