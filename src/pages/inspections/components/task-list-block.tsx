import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../shared/components/layout/layout";
import { RootState, StoreInterface } from "../../../store";
import { fetchTask } from "../../../store/task/action";
import VehicleTaskCard from "./vehicle-task-card";

const TaskListBlock = ({ status }: {
    status: string
}) => {
  const dispatch = useDispatch();
  const [fetchCount, setFetchCount] = useState(0);
  const [update, setUpdate] = useState(false);
  const openTasks = useSelector((state: RootState) => status === 'ACTIVE' ? state.taskViewPage.openTask : state.taskViewPage.closeTask);
  const show = useSelector((state: StoreInterface) => state.hamburger.show);

  useEffect(()=>{
    update && dispatch(fetchTask(status === 'ACTIVE', 12, fetchCount));
    setUpdate(false);
  }, [update]);

  useEffect(()=>{
    dispatch(fetchTask(status === 'ACTIVE', 12, fetchCount));
  }, [fetchCount]);

  useEffect(()=>{
    dispatch(fetchTask(status === 'ACTIVE', 12, fetchCount));
  }, []);
  return (
    <>
      <Layout>
      <header className={`page-header ${show === false ? "expanded-header" : ""}`}>
        <div className="page_title">
          <h2>Inspections</h2>
        </div>
      </header>
        <section className={`content-body`}>
          <div className="page_content">
            <div className="white-box">
              <div className="open-task-listing">
                <div className="row">
                  <div className="col-lg-12">
                    <h2 className="custom-heading">{status === 'COMPLETED' ? 'Closed' : 'Open'} Tasks ({openTasks?.count})</h2>
                  </div>
                  {Object.keys(openTasks?.data || {}).map((list, index) => <div key={index} className="col-lg-4 col-md-6">
                    <VehicleTaskCard setUpdate={setUpdate} vehicleData={openTasks?.data[list as any] as any} />
                  </div>)}
                </div>
                {openTasks && (fetchCount + 12) < openTasks?.count && <div className="row flex-display">
                  <button className="btn btn-orange" onClick={()=> openTasks && fetchCount < openTasks?.count ? setFetchCount(fetchCount + 12) : false}>View More</button>
                </div>}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default TaskListBlock;
