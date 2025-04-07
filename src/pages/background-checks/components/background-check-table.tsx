import Sorter from "../../../shared/components/sorting/sorter";
import { BackgroundChecksStatus } from "../../../shared/models";
import { BackgroundChecksData } from "../../../store/backgroundChecks/models";
import { formatDate } from "../../../utils";
import { useState } from 'react';
import Api from "../../../Api";
import { useDispatch } from 'react-redux';
import { ResponseError, ResponseSuccess } from "../../../store/shared/model";
var moment = require('moment-timezone');

const BackgroundCheckTable = ({
  backgroundChecks,
  sortBy,
  sortType,
  setSortBy,
  setSortType,
  searchBackgroundChecks,
  pageSize,
  setPageNumber
}: {
  backgroundChecks: BackgroundChecksData[],
  sortBy: string;
  sortType: string;
  setSortBy: any;
  setSortType: any;
  searchBackgroundChecks: (page: number, size: number) => void;
  pageSize: number;
  setPageNumber: (pageNumber: number) => void;
}) => {
  const [edit, setEdit] = useState(false)
  const [status, setStatus] = useState("COMPLETED")
  const [editId, setEditId] = useState<any>(null)
  const dispatch = useDispatch();
  const handleDate = (date: any) => {
    const localDate = moment(date).local().format('MM/DD/YYYY')
    console.log(moment(date).local())
    console.log(moment.utc(date).local())
    console.log(new Date(date).toLocaleDateString())
    return localDate
  }

  const handleUpdate = async (id: number) => {
    Api.put(`/api/v1/background-checks/${id}`, {status}).then(d => {
      searchBackgroundChecks(0, pageSize)
      setPageNumber(0)
      setEdit(false)
      dispatch(new ResponseSuccess('Status Updated').action())
    }).catch(e => dispatch(new ResponseError(e.data.message).action()))
  }
  console.log(status)
  return (
    <div className="jax-table-outer ml-1rem mr-1rem">
      <div className="table-responsive jax-table">
        <table className="table mb-0 table-striped">
          <thead>
            <tr>
              <th style={{ width: "20%" }} onClick={()=>{ setSortBy('firstName'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                Full Name
                <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'firstName'} />
                </th>
              <th style={{ width: "20%" }} onClick={()=>{ setSortBy('dld.state'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                Dl State
                <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'dld.state'} />
                </th>
              <th style={{ width: "20%" }} onClick={()=>{ setSortBy('registeredOn'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                Registered On
                <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'registeredOn'} />
                </th>
              <th style={{ width: "20%" }} onClick={()=>{ setSortBy('dlNumber'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                DL Number
                <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'dlNumber'} />
                </th>
              <th style={{ width: "20%" }} onClick={()=>{ setSortBy('status'); setSortType( sortType === 'ASC' ? 'DESC' : 'ASC'); }} className='pointer'>
                Status
                <Sorter setSortType={setSortType} sortType={sortType} isActive={sortBy === 'status'} />
                </th>
            </tr>
          </thead>
          <tbody>
          { backgroundChecks && backgroundChecks.map( ( backgroundCheck ) => (<tr>
              <td>{backgroundCheck.firstName + ' ' + backgroundCheck.lastName}</td>
              <td>{backgroundCheck.state}</td>
              <td>{handleDate(backgroundCheck.registeredOn)}</td>
              <td>{backgroundCheck.dlNumber}</td>
              <td>
                {
                  edit && (editId === backgroundCheck.id) ?
                  <div className="edit-background">
                    <select name="status" onChange={(e) => {
                      setStatus(e.target.value)
                    }} className="bg-status">
                      <option value="COMPLETED" selected={backgroundCheck.status === 'COMPLETED'}>Approved</option>
                      <option value="REJECTED" selected={backgroundCheck.status === 'REJECTED'}>Declined</option>
                      <option value="PENDING" selected={backgroundCheck.status === 'PENDING'}>Pending</option>
                    </select>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-xs editBgButton"
                      title="Save"
                      onClick={() => {
                        handleUpdate(backgroundCheck.id)
                      }}
                    >
                      <i
                        className="fa fa-floppy-o"
                        aria-hidden="true"
                      ></i>
                    </button>  
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-xs editBgButton"
                      title="Edit"
                      onClick={() => {
                        setEdit(false)
                        setStatus("")
                      }}
                    >
                      <i
                        className="fa fa-times"
                        aria-hidden="true"
                      ></i>
                    </button>    
                  </div>
                  :
                  <>
                    {BackgroundChecksStatus[backgroundCheck.status as keyof typeof  BackgroundChecksStatus]}
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-xs editButton"
                        title="Edit"
                        onClick={() => {
                          setEdit(true)
                          setEditId(backgroundCheck.id)
                          setStatus(backgroundCheck.status)
                        }}
                      >
                        <i
                          className="fa fa-pencil"
                          aria-hidden="true"
                        ></i>
                      </button>
                  </>
                }
              </td>
            </tr>))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default BackgroundCheckTable;
