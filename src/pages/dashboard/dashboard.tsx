import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useState } from "react";
import { updateDashboard } from "../../store/dashboard/action";
import { RootState, StoreInterface } from "../../store/index";
import Layout from "../../shared/components/layout/layout";
import { fetchTask } from "../../store/task/action";
import VehicleTaskCard from '../inspections/components/vehicle-task-card';
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { fetchVehiclesRegistrations } from "../../store/vehicles/action";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageInfo = useSelector((state: StoreInterface) => state.dashboard);
  const [vehicleWidgetDisplay, setVehicleWidgetDisplay] = useState("count");
  const openTasks = useSelector((state: RootState) => state.taskViewPage.openTask)
  const vehicleRegistrations = useSelector((state: RootState) => state.vehiclesPage.vehiclesRegistrationList)
  const vehicleRegistrationsCount = useSelector((state: RootState) => state.vehiclesPage.count)
  useEffect(() => {
    dispatch(updateDashboard());
  }, []);
  useEffect(() => {
    dispatch(fetchVehiclesRegistrations({
      pageNumber: 0,
      pageSize: 4
    }));
  }, []);
  useLayoutEffect(() => {
    dispatch(fetchTask(true, 4, 0, false));
  }, [])
  console.log(openTasks)

  const showDateTime = (vehicleData: any) => {
    let completedCounter = 0
    let startTask;
    let endTask;
    vehicleData.forEach((data: any) => {
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
    <Layout>
      {" "}
      <section className="content-body">
        <header className="page-header">
          <div className="page_title">
            <h2> Dashboard</h2>
          </div>
          <div className="page-header-right"></div>
        </header>

        <div className="page_content">
          <div className="row card-widgit">
            <div className="col-lg-7 col-md-6">
              <div className="widget widget-vehicle">
                <h1>{process.env.REACT_APP_ADMIN}</h1>
                <h4>All Vehicles  {pageInfo?.vehiclesWidget?.totalCount ? `(${pageInfo?.vehiclesWidget?.totalCount})` :  ''}</h4>
                <ul className="list-style-none widget-vehicle-list mb-3">
                  {pageInfo?.vehiclesWidget?.vehicles.map((vehicle) => {
                    return (
                      <>
                        <li key={vehicle.status}>
                          <div className="item">
                            <span
                              style={{
                                backgroundColor: vehicle.backgroundColor,
                              }}
                            ></span>{" "}
                            {vehicle.displyName} (
                            {vehicleWidgetDisplay === "count"
                              ? vehicle.count
                              : Math.round(vehicle.percentage) + '%'}
                            )
                          </div>
                        </li>
                      </>
                    );
                  })}
                </ul>
                <div className="control_inline">
                  <label
                    className="control control--radio"
                    onClick={() => setVehicleWidgetDisplay("count")}
                  >
                    Vehicles Count
                    <input
                      type="radio"
                      className="form-check-input"
                      name="vehicleWidgetDisplay"
                      checked={vehicleWidgetDisplay === "count"}
                      onChange={() => setVehicleWidgetDisplay("percentage")}
                    />
                    <div className="control__indicator"></div>
                  </label>
                  <label className="control control--radio">
                    Percentage
                    <input
                      type="radio"
                      className="form-check-input"
                      name="vehicleWidgetDisplay"
                      checked={vehicleWidgetDisplay === "percentage"}
                      onChange={() => setVehicleWidgetDisplay("percentage")}
                    />
                    <div className="control__indicator"></div>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-6">
              <div className="widget widget-background">
                <div className="widget-item">
                  <figure>
                    <img src="/static/images/background-checks.png" alt="" />
                  </figure>
                  <div className="widget-item-detail">
                    <h3>
                      Background <br />
                      Checks
                    </h3>
                    <span className="count">
                      {pageInfo?.backgroundChecksWidget?.count}
                    </span>
                  </div>
                </div>
                <div className="widget-arrow">
                  <span>
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <title />
                      <g data-name="Layer 2" id="Layer_2">
                        <path d="M22,9a1,1,0,0,0,0,1.42l4.6,4.6H3.06a1,1,0,1,0,0,2H26.58L22,21.59A1,1,0,0,0,22,23a1,1,0,0,0,1.41,0l6.36-6.36a.88.88,0,0,0,0-1.27L23.42,9A1,1,0,0,0,22,9Z" />
                      </g>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row card-widgit">
            <div className="col-lg-6 col-md-6">
              <div className="widget widget-backgroun">
                <div className="widget-item">
                  <div className="col-md-12">
                    <a className="text-primary dashboard-custom-heading" href="/tasks/open"><span className="custom-heading pointer" >Open Tasks ({openTasks?.count})</span></a>
                    {Object.keys(openTasks?.data || {}).map((list) => {
                      const vehicleData = openTasks?.data[list as any] as any
                      return (
                        <section className={ `card mb20 task-card dashboard-card` }>
                          <header className="dashboard-card-header 1">
                              <h2 className="card-title">{vehicleData?.[0]?.number} - {moment(vehicleData?.[0]?.year).format("YYYY")} {vehicleData?.[0]?.make} {vehicleData?.[0]?.model} ({vehicleData?.length})</h2>
                              <small className="small-text">
                                  {showDateTime(vehicleData)}
                              </small>
                          </header>
                      </section>
                      )
                    })}
                    {openTasks && Object.keys(openTasks?.data || {}).length > 0 && <button onClick={()=>navigate('/tasks/open')} className={'btn dashboard-button'}>View More</button>}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="widget widget-backgroun">
                <div className="widget-item">
                  <div className="col-md-12">
                    <a className="text-primary dashboard-custom-heading" href="#"><span className="custom-heading pointer" >Vehicle Registration Expiration</span></a>
                    {vehicleRegistrations && vehicleRegistrations.map((vehicle) => {
                      return (
                        <section className={ `card mb20 task-card dashboard-card` }>
                          <header className="dashboard-card-header 1">
                              <h2 className="card-title">{vehicle.number} - {moment(vehicle.year).format("YYYY")} {vehicle.make} {vehicle.model}</h2>
                              <small className="small-text">
                                {moment( vehicle.registrationExpDate  ).format( "LL" )}
                              </small>
                          </header>
                      </section>
                      )
                    })}
                    {vehicleRegistrations && vehicleRegistrationsCount > 4 && <button onClick={()=>navigate('/vehicle-registrations')} className={'btn dashboard-button'}>View More</button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
