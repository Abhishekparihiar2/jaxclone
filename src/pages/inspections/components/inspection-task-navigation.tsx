import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { StoreInterface } from "../../../store";
import Tasks from "../tasks";
import InspectionsList from "./inspection-list";
import TaskList from "./task-list";

const InspectionTaskNav = () => {
  const show = useSelector((state: StoreInterface) => state.hamburger.show);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <header className={`page-header ${show === false ? "expanded-header" : ""}`}>
        <div className="page_title">
          <h2>Inspections</h2>
        </div>
      </header>
      <div className="page_content">
        <div className="white-box">
          <div className="tabs-column">
            <ul className="nav nav-tabs inspections-list-page" id="myTab" role="tablist">
              <li className="nav-item">
                <a
                  className={location.pathname === '/inspections' ? "nav-link active" : "nav-link"}
                  id="inspections-tab"
                  data-toggle="tab"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                  onClick={() => navigate('/inspections')}
                >
                  <i className="fa fa-search" aria-hidden="true"></i>{" "}
                  Inspections
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={location.pathname === '/tasks' ? "nav-link active" : "nav-link"}
                  id="inspections-task-tab"
                  data-toggle="tab"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                  onClick={() => navigate('/tasks')}
                >
                  <i className="fa fa-file-text-o" aria-hidden="true"></i>{" "}
                  Tasks
                </a>
              </li>
            </ul>
            <div className="tab-content">
              {location.pathname === '/inspections' && <InspectionsList />}
              {location.pathname === '/tasks' && <TaskList />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InspectionTaskNav;
