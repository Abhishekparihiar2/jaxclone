import React from 'react'
import { VehicleImagesInterface } from '../../interface'

const Images = ({vehicle, handleToggle}: VehicleImagesInterface) => {
    return (
        <section className="card mb20">
            <header className="card-header card-head-icon">
                <h2 className="card-title">Images</h2>
                <div className="card-head-actions">
                    <a className="btn orange-circle radius-sm" href="#" onClick={handleToggle}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                    </a>
                </div>
            </header>
            <div className="card-body">
                <div className="cars-block">
                    <div className="car-large">
                    <figure>
                        {vehicle?.primaryImageUrl ? <img src={vehicle?.primaryImageUrl} alt="" /> :<div className="upload-file">
                            <div className="upload-file-text"><i className="fa fa-camera" aria-hidden="true"></i></div>
                            </div>}
                    </figure>
                    </div>
                    <ul className="car-list">
                    {
                        vehicle?.images && vehicle.images.map((vehicleImage, index) => index < 4 && 'url' in vehicleImage ? <li>
                       {vehicleImage?.url ?  <img src={vehicleImage.url} alt="" />:<div className="upload-file h78">
                            <div className="upload-file-text"><i className="fa fa-camera" aria-hidden="true"></i></div>
                            </div>}
                    </li> : <></>) 
                    }</ul>
                </div>
            </div>
        </section>
    )
}

export default Images