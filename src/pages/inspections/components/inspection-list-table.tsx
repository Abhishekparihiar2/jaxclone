import moment from "moment";
import { useNavigate } from "react-router-dom";
import Sorter from "../../../shared/components/sorting/sorter";
import { Inspection, InspectionStatus } from "../../../shared/models";

const InspectionListTable = ( {
  inspections,
  sortBy,
  sortType,
  setSortBy,
  setSortType
}: {
  inspections: Inspection[],
  sortBy: string;
  sortType: string;
  setSortBy: any;
  setSortType: any;
} ) =>
{
  const navigate = useNavigate();

  return (
    <div className="jax-table-outer ml-1rem mr-1rem">
      <div className="table-responsive jax-table">
        <table className="table mb-0 table-striped">
          <thead>
            <tr>
              <th style={ { width: "15%" } } onClick={()=>{ setSortBy('date'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                Inspection Date
                <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'date'} />
              </th>
              <th style={ { width: "15%" } } onClick={()=>{ setSortBy('vehicleNumber'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                Vehicle No.
                <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'vehicleNumber'} />
                </th>
              <th style={ { width: "12%" } } onClick={()=>{ setSortBy('vin'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                VIN
                <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'vin'} />
                </th>
              <th style={ { width: "32%" } } onClick={()=>{ setSortBy('make'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                Vehicle
                <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'make'} />
                </th>
              <th style={ { width: "13%" } } onClick={()=>{ setSortBy('inspector'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                Inspector
                <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'inspector'} />
                </th>
              <th style={ { width: "13%" } } onClick={()=>{ setSortBy('status'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                Status
                <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'status'} />
                </th>
            </tr>
          </thead>
          <tbody>
            { inspections && inspections.map( ( inspection ) => <tr>
              <td><a
                                        className="text-primary"
                                        href={`/view-inspection/?inspectionId=${ inspection.id }`}
                                      >{ inspection?.date ? moment( inspection.date ).format('L') : 'Date Not Found' }</a></td>
              <td>{ inspection.vehicleNumber }</td>
              <td>{ inspection.vin }</td>
              <td>{ `${moment(inspection.year).format('YYYY')} ${inspection.make} ${inspection.model}` }</td>
              <td>{ inspection.inspector }</td>
              <td>{ inspection?.status ? (InspectionStatus as any)[inspection.status] : '' }</td>
            </tr> ) }
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default InspectionListTable;
