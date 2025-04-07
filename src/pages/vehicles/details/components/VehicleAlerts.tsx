import React from 'react'
import { Vehicle } from '../../../../store/vehicles/interface'
interface VehicleAlertInterface {
    vehicle?: Vehicle;
}
const VehicleAlert = ({
    vehicle
}: VehicleAlertInterface) => {
    return (
        <section className="card mb20">
            <header className="card-header">
                <h2 className="card-title">Vehicle Alerts</h2>
            </header>
            {vehicle?.vehicleAlerts?.length ? (<>
            <div className="card-body">
                <ul className="dot-list">
                    {
                        vehicle?.vehicleAlerts?.map((alert) => <li>{alert.message}</li> )
                    }
                    {/* <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500.
                    </li>
                    <li>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when
                    looking at its layout. The point of using Lorem
                    Ipsum.
                    </li>
                    <li>
                    Contrary to popular belief, Lorem Ipsum is not
                    simply random text. It has roots in a piece of
                    classical Latin literature from 45 BC, making it
                    over 2000 years old.
                    </li>
                    <li>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration
                    in some form, by injected humour.
                    </li> */}
                </ul>
                </div>
            </> ) : ( <>
                <div className="card-body">No Alerts Found.</div></> ) }
        </section>
    )
}

export default VehicleAlert