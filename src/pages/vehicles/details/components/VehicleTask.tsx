import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import JAXModal from '../../../../shared/components/modal/jax-modal';
import { StoreInterface } from '../../../../store';
import { addTask, fetchVehicle } from '../../../../store/vehicles/action';
import { VehicleTaskInterface } from '../../interface';
import axios from '../../../../Api';
import { sendError, sendSuccess } from '../../../../store/shared/action';
import { VehicleTaskCompleted } from '../../../../store/vehicles/models';

const VehicleTask = ({
    vehicle
}: VehicleTaskInterface) => {
    const [showAddTask, setShowAddTask] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const [alert, setAlert] = useState<any>(false)
    const [updateTaskId, setUpdateTaskId] = useState<any>(null)


    const dispatch = useDispatch()
    const userId = useSelector((state: StoreInterface) => state.login.userId)
    //const success = useSelector((state: StoreInterface) => state.response.successResponse)

    const validate = () => {
        let errorText = ""
        let valid = true
        if (!name || name.length === 0) {
            errorText = "Please provide name of the task";
            valid = false
        }
        if (!valid) {
            setError(errorText)
        }
        return valid
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (validate() && vehicle?.id && userId) {
            try {
                await dispatch(addTask({ vehicleId: vehicle?.id, name, userId }));
                setShowAddTask(false);
            } catch (e) {
                throw e
            }
        }
    }

    const onUpdateCheckBox = () => {
        axios.put(`/api/v1/tasks/update/${updateTaskId}`, {
            status: "COMPLETED"
        }).then((d) => {
            if (vehicle && vehicle.id)
                dispatch(new VehicleTaskCompleted(updateTaskId, vehicle.id).action())
            setAlert(false)
            setUpdateTaskId(null);
            dispatch(sendSuccess(d.data.message));
            dispatch(fetchVehicle(Number(vehicle?.id)))
        }).catch(e => dispatch(sendError(e.data.message)));
    }

    const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        setAlert(true);
        setUpdateTaskId(id);
    }

    const handleCreateTask = () =>
    {
        if ( vehicle?.status === 'PENDING_DELIVERY' )
        {
            dispatch( sendError( "A task can not be created until Initial Inspection is done." ) );
        } else
        {
            setShowAddTask( true );
        }
    }

    return (
        <section className="card mb20">
            <header className="card-header card-head-icon">
                <h2 className="card-title">Task</h2>
                <div className="card-head-actions">
                {/* eslint-disable-next-line  */}
                    <a className="btn p-0" href="#" onClick={handleCreateTask}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </a>
                </div>
            </header>
            {vehicle?.vehicleTasks?.length ? (<>
                <div className="card-body p-0">
                    <ul className="task-list">
                        {
                            vehicle?.vehicleTasks && vehicle?.vehicleTasks.map((task) => <li>
                                <div className="control_inline">
                                    <label className="control control--checkbox">
                                        {task.name}
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            onChange={(e) => handleCheckBox(e, task.id)}
                                            checked={task.status === 'COMPLETED' ? true : false}
                                        />
                                        <div className="control__indicator"></div>
                                    </label>
                                </div>
                            </li>)
                        }
                    </ul>
                </div>
            </>) : (<>
                <div className="card-body">No Tasks Found.</div>
            </>)}
            <JAXModal
                heading={`Confirmation`}
                show={alert}
                handleClose={() => setAlert(false)}
            >
                <div className='text-center'>
                    Are you sure you want to close this task ?
                    <div className='row text-center mt-3 flex-display'>
                        <button className="btn btn-orange" onClick={() => onUpdateCheckBox()}>OK</button>
                        <button className="btn btn-orange ml-2" onClick={() => setAlert(false)}>Cancel</button>
                    </div>
                </div>
            </JAXModal>
            <JAXModal
                heading={`Add Task`}
                show={showAddTask}
                handleClose={() => setShowAddTask(false)}
            >
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control placeholder-dark"
                                    placeholder="Task Name"
                                    name="name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <span style={{ color: "red" }}>
                                    {error ? error : ""}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group text-left">
                                <button className="btn btn-orange" type="submit">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </JAXModal>
        </section>
    )
}

export default VehicleTask