import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store";
import { fetchTask } from "../../../store/task/action";
import VehicleTaskCard from "./vehicle-task-card";

const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openTasks = useSelector((state: RootState) => state.taskViewPage.openTask);
  const closeTasks = useSelector((state: RootState) => state.taskViewPage.closeTask);
  const [update, setUpdate] = useState(false);

  const intialData = ()=>{
    dispatch(fetchTask(true, 10, 0, false));
    dispatch(fetchTask(false, 10, 0, false));
  } 
  
  useEffect(()=>{
    update && intialData();
  
    setUpdate(false);
    // eslint-disable-next-line
  }, [update]);

  useEffect(()=>{
    intialData();
    // eslint-disable-next-line
  }, []);


  return (
    <div
      id="inspectionsTaskDetail"
      role="tabpanel"
      aria-labelledby="inspections-task-tab"
    >
      <div className="row">
        <div className="col-md-6">
          <a className="text-primary" href="/tasks/open"><span className="custom-heading pointer" >Open Tasks ({openTasks?.count})</span></a>
          {Object.keys(openTasks?.data || {}).map((list) => <VehicleTaskCard setUpdate={setUpdate} vehicleData={openTasks?.data[list as any] as any} />)}
          {openTasks && Object.keys(openTasks?.data || {}).length > 0 && <button onClick={()=>navigate('/tasks/open')} className={'btn btn-orange'}>View All</button>}
        </div>
        <div className="col-md-6">
        <a className="text-primary" href="/tasks/closed"><span className="custom-heading pointer">Closed Tasks ({closeTasks?.count})</span></a>
          {Object.keys(closeTasks?.data || {}).map((list) => <VehicleTaskCard setUpdate={setUpdate} vehicleData={closeTasks?.data[list as any] as any} />)}
          {closeTasks && Object.keys(closeTasks?.data || {}).length > 0 && <button onClick={()=>navigate('/tasks/closed')} className={'btn btn-orange'}>View All</button>}
        </div>
      </div>        </div>
  );
};

export default TaskList;
