import React, { useEffect, useState } from "react";
import moment from "moment";
import Api from '../../../Api'
import { useDispatch } from "react-redux";
import { sendError, sendSuccess } from "../../../store/shared/action";
import { formatDate } from "../../../utils";
import JAXModal from "../../../shared/components/modal/jax-modal";
import { Task } from "../../../store/shared/model";



const VehicleTaskCard = ({ vehicleData, setUpdate }: { vehicleData: Task[], setUpdate?: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const dispatch = useDispatch();
    const [alert, setAlert] = useState<any>(false)
    const [updateTaskId, setUpdateTaskId] = useState<any>(null);
    const [status, setUpdateStatus] = useState<any>(null);
    const [open, setOpen] = useState(false);
    const onUpdateCheckBox = () => {
        Api.put(`/api/v1/tasks/update/${updateTaskId}`, {
            status
        }).then((d)=>{
            if(setUpdate)
                setUpdate(true);
            setOpen(false);
            setAlert(false);
            setUpdateTaskId(null);
            dispatch(sendSuccess(d.data.message));
        }).catch(e=>dispatch(sendError(e.data.message)));
    }
    
    const updateTaskStaus = (id: number, status: string = 'COMPLETED') => {
        setAlert(true);
        setUpdateTaskId(id);
        setUpdateStatus(status);
    }
    
    const showDateTime = () => {
        let completedCounter = 0
        let startTask;
        let endTask;
        vehicleData.forEach((data) => {
            return data.status === "COMPLETED" ? completedCounter ++ : 0   
        })
        if(completedCounter === vehicleData.length) {
            const startDate = JSON.parse(JSON.stringify(vehicleData));
            const closedData = JSON.parse(JSON.stringify(vehicleData));
            startDate.sort((t: any, c: any)=>(new Date(t.createdAt) as any) - (new Date(c.createdAt) as any));
            closedData.sort((t: any, c: any)=>(new Date(t.closedDate) as any) - (new Date(c.closedDate) as any));
            return (
                <>
                    {`${moment( startDate[0].createdAt  ).format( "LL" )} ${moment(startDate[0].createdAt).format( "hh:mm A" )} - ${moment( closedData[closedData.length - 1].closedDate  ).format( "LL" )} ${moment(closedData[closedData.length - 1].closedDate).format( "hh:mm A" )}`}
                </>
            )
        } else {
            const tasks = JSON.parse(JSON.stringify(vehicleData));
            tasks.sort((t: any, c: any)=>(new Date(t.createdAt) as any) - (new Date(c.createdAt) as any));
            return (
                <>
                    {moment( tasks[0]?.createdAt  ).format( "LL" )} {moment( tasks[0]?.createdAt  ).format( "hh:mm A" )}
                </>
            )
        }
    }
    return (
        <>
            <section className={ `card mb20 task-card ${open ? 'task-open' : ''}` }>
                <header className="card-header 1" onClick={(e) => setOpen(!open)}>
                    <h2 className="card-title">{vehicleData?.[0]?.number} - {moment(vehicleData?.[0]?.year).format("YYYY")} {vehicleData?.[0]?.make} {vehicleData?.[0]?.model} ({vehicleData?.length})</h2>
                    <small className="small-text">
                        {showDateTime()}
                    </small>
                </header>
                <div className="card-body p-0">
                    <ul className="task-list">
                        {vehicleData && vehicleData.length && vehicleData.map((taskData)=><li>
                            <div className="control_inline">
                                <label className="control control--checkbox">
                                    {taskData.name}
                                    <input
                                        type="checkbox"
                                        checked={taskData.status === 'COMPLETED'}
                                        className="form-check-input"
                                        onClick={()=>taskData?.id && updateTaskStaus(taskData?.id, taskData.status === 'ACTIVE' ? 'COMPLETED' : 'ACTIVE')}
                                    />
                                    <div className="control__indicator"></div>
                                </label>
                            </div>
                        </li>)}
                    </ul>
                </div>
                <JAXModal
                    heading={`Confirmation`}
                    show={alert}
                    handleClose={ () => setAlert(false) }
                >
                <div className='text-center'>
                    {status === 'COMPLETED' ? 'Are you sure you want to close this task ?' : 'Are you sure you want to re-open this task ?'}
                    <div className='row text-center mt-3 flex-display'>
                        <button className="btn btn-orange" onClick={()=>onUpdateCheckBox()}>OK</button>
                        <button className="btn btn-orange ml-2" onClick={()=>setAlert(false)}>Cancel</button>
                    </div>
                </div>
            </JAXModal>
            </section>
        </>
    );
};

export default VehicleTaskCard;
