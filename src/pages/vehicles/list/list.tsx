import { useEffect } from 'react'
import { Link } from 'react-router-dom';
// import { VehicleType } from '../../../store/vehicles/interface';
import { VehicleListInterface } from '../interface'
import { VehicleStatus } from "../../../shared/models/index";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { fetchVehicleTypes } from '../../../store/vehicleTypes/action';
import Sorter from '../../../shared/components/sorting/sorter';
const VehicleList = ({
    pageInfo,
    sortBy,
    sortType,
    setSortBy,
    setSortType
}: VehicleListInterface) => {
    const dispatch = useDispatch();
    const vehicleTypes = useSelector((state: RootState) => state.vehicleTypesValues.vehicleTypes);
    useEffect(() => {
        dispatch(fetchVehicleTypes());
     // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <div className="jax-table-outer ml-1rem mr-1rem">
                <div className="table-responsive jax-table">
                    <table className="table mb-0 table-striped">
                        <thead>
                            <tr>
                                <th style={{ width: "8%" }}  onClick={()=>{ setSortBy('year'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                                    Year
                                    <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'year'} />
                                </th>
                                <th style={{ width: "10%" }}  onClick={()=>{ setSortBy('make'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                                    Make
                                    <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'make'} />
                                </th>
                                <th style={{ width: "10%" }}  onClick={()=>{ setSortBy('model'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                                    Model
                                    <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'model'} />
                                </th>
                                <th style={{ width: "12%" }} onClick={()=>{ setSortBy('number'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                                    Vehicle No.
                                    <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'number'} />
                                </th>
                               
                                <th style={{ width: "10%" }}  onClick={()=>{ setSortBy('tagNumber'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                                    Tag No.
                                    <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'tagNumber'} />
                                </th>
                                <th style={{ width: "10%" }}  onClick={()=>{ setSortBy('vin'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                                    VIN
                                    <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'vin'} />
                                </th>
                                <th style={{ width: "8%" }}  onClick={()=>{ setSortBy('color'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                                    Color
                                    <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'color'} />
                                </th>
                                <th style={{ width: "10%" }}  onClick={()=>{ setSortBy('vtName'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                                    Vehicle Type
                                    <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'vtName'} />
                                 </th>
                                <th style={{ width: "10%" }}  onClick={()=>{ setSortBy('state'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                                    Location
                                    <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'state'} />
                                </th>
                                <th style={{ width: "12%" }}  onClick={()=>{ setSortBy('status'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                                    Status
                                    <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'status'} />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageInfo &&
                                pageInfo?.vehiclesList &&
                                pageInfo?.vehiclesList.map((vehicle) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>
                                                    {new Date(vehicle.year || "").getFullYear()}
                                                </td>
                                                <td>{vehicle.make}</td>
                                                <td>{vehicle.model}</td>
                                                <td>
                                                    <Link className="text-primary" to={`/vehicle-detail/${vehicle.id}`}>
                                                        {vehicle.number}
                                                    </Link>
                                                </td>                                                
                                                <td>{vehicle.tagNumber}</td>
                                                <td>{vehicle.vin}</td>
                                                <td>{vehicle.color}</td>
                                                <td>
                                                    {vehicle.vehicleTypeId ? vehicleTypes?.[vehicle.vehicleTypeId] : "-"}
                                                </td>
                                                <td>{vehicle.state}</td>
                                                <td>{(VehicleStatus as any)[vehicle.status]}</td>
                                            </tr>
                                        </>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default VehicleList