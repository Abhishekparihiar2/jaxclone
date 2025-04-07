import { useEffect, useState } from 'react'
import { VehicleRentalInterface } from '../../interface';
import { convertTime12to24, formatAmount } from '../../../../utils/index';
import { Link } from 'react-router-dom';
import { RentalInterface } from '../../../../store/vehicles/interface';
var moment = require('moment-timezone');

const VehicleRental = ({vehicle}: VehicleRentalInterface) => {
    const [chunkedData, setChunkData] = useState<any[]>([])
    const [viewAll, setViewAll] = useState<boolean>(false)
    
    useEffect(() => {
        const chunks: any = []
        if(vehicle?.rentals && vehicle?.rentals.length > 0){
            const firstChunk = vehicle?.rentals.slice(0, 5)
            const secondChunk = vehicle?.rentals.slice(5)
            chunks.push(firstChunk, secondChunk)
            setChunkData(chunks)
        }
    }, [vehicle?.rentals])
    const convertedDateTime = (utcDate: any, utcTime: any) => {
        if(utcDate && utcTime){
          const date: any = utcDate;
          const hours24 = convertTime12to24(utcTime)
          const fullDate = `${date.split('-')[2]}-${date.split('-')[1]}-${date.split('-')[0]} ${hours24}`
          const offsetDiff = moment().utcOffset() - moment(fullDate).utcOffset()
          // const time = moment.utc(fullDate).add(offsetDiff, 'minutes').local().format('hh:mm A')
          let tz = ""
          if(vehicle?.city === "Atlanta") {
            tz = "America/New_York"
          }
          if(vehicle?.city === "Dallas") {
            tz = "America/Chicago"
          }
          let time = ""
          let formattedDate = ""
          if(tz) {
            time = moment.utc(fullDate).tz(tz).format('hh:mm A')
            formattedDate = moment.utc(fullDate).format("LL")
          } else {
            time = moment.utc(fullDate).local().format('hh:mm A')
            formattedDate = moment.utc(fullDate).format("LL")
          }
          return `${formattedDate}`
        }
    }
    const convertDate = (date: string, time: string) => {
        return convertedDateTime(date, time)
    }
    const getStartDate = (rental: RentalInterface) => {
        let startDate = convertDate(rental.startedAtFormatted, rental.pickupTime)
        if(rental.switch) {
            if(vehicle?.id === rental.switch.finalVehicleId) {
                startDate = moment(rental.switch.updatedAt).format('LL')    
            }
        }
        return startDate
    }
    const getEndDate = (rental: RentalInterface) => {
        let endDate = convertDate(rental.returnFormattedAt, rental.returnTime)
        if(rental.switch) {
            if(vehicle?.id === rental.switch.initialVehicleId) {
                endDate = moment(rental.switch.updatedAt).format('LL')    
            }
        }
        return endDate
    }
    const formattedDateForMoment = (date: string) => {
        return `${date.split('-')[2]}-${date.split('-')[1]}-${date.split('-')[0]}`
    }
    const days = (startDate: string, endDate: string) => {
        // console.log(formattedDateForMoment(endDate))
        // console.log(formattedDateForMoment(startDate))
        return moment(endDate).diff(moment(startDate), 'days')
    }
    const getRevenue = (rental: RentalInterface) => {
        let startDate = rental.pickupFormattedAt
        let ndays = 0
        let totalDays = 0
        if(rental.switch) {
            if(vehicle?.id === rental.switch.finalVehicleId) {
                startDate = rental.switch.updatedAt
                ndays = days(rental.switch.updatedAt, formattedDateForMoment(rental.returnFormattedAt))
            } else {
                ndays = days(formattedDateForMoment(rental.startedAtFormatted), rental.switch.updatedAt)
            }
        }
        totalDays = days(formattedDateForMoment(rental.pickupFormattedAt), formattedDateForMoment(rental.returnFormattedAt))
        console.log(totalDays, ndays, rental.id)
        if(!ndays) ndays = 1
        if(ndays === totalDays) ndays = totalDays - 1
        return formatAmount(rental.TotalAmount * (ndays/totalDays))
    }
    return (
    <section className="card mb20">
                    <header className="card-header pl-5rem">
                        <h2 className="card-title">Rental History</h2>
                </header>
                {
            chunkedData && chunkedData.length > 0 ? <>
                    <div className="card-body p-0 border-none">
                        <div className="table-responsive table-common">
                        <table className="table mb-0">
                            <thead>
                            <tr>
                                <th style={{ width: "20%" }}>Renter Name</th>
                                <th style={{ width: "20%" }}>Rental Number</th>
                                <th style={{ width: "20%" }}>Start Date</th>
                                <th style={{ width: "20%" }}>End Date</th>
                                <th style={{ width: "30%" }}>Total Rental Revenue</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    chunkedData.map((chunk, index) => {
                                        return chunk?.map((rental: RentalInterface) => (
                                            <tr className={`chunks ${index > 0 ? (viewAll ? '' : "hide-rentals") : ''}`} key={index}>
                                                <td>{rental.userFirstName} {rental.userLastName}</td>
                                                <td>
                                                    <Link className='rental-history-link' to={`/rental-details/${rental.id}`}>{rental.rentalNumber}</Link>
                                                </td>
                                                <td>
                                                    {getStartDate(rental)}
                                                    {/* {rental?.pickupAt ? moment(rental.pickupAt).format("LL") : "-"} */}
                                                </td>
                                                <td>
                                                    {getEndDate(rental)}
                                                    {/* {rental?.returnAt ? moment(rental.returnAt).format("LL") : "-"} */}
                                                </td>
                                                <td>
                                                    {rental.switch ? getRevenue(rental) : formatAmount(rental.TotalAmount)}
                                                </td>
                                            </tr>
                                        ))
                                    })
                                }
                            </tbody>
                        </table>
                        </div>
                        <div className="text-right p-3 view-more">
                        {
                            viewAll ? /* eslint-disable-next-line  */
                            <a className="btn btn-orange btn-sm" href="javascript:void(0);" onClick={() => setViewAll(false)}>
                                Hide
                            </a>
                                :/* eslint-disable-next-line  */
                                <a className="btn btn-orange btn-sm" href="javascript:void(0);" onClick={() => setViewAll(true)}>
                                View More
                                </a>
                        }
                        </div>
                    </div>
            </>
            :
            <div className="card-body">No Rentals Found.</div>
        }
        
    </section>
  );
};

export default VehicleRental;
