import { useState } from "react";
import JAXModal from "../../../shared/components/modal/jax-modal";
import { Inspection } from "../../../shared/models";
import { Task } from "../../../store/shared/model";
import { formatDate } from "../../../utils";

const VehicleTasks = ({
  form,
  isView
}: {
  form: Inspection,
  isView: boolean
}) => {
  const [showAddTask, setShowAddTask] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string | null>(null)

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

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (validate()) {
      setShowAddTask(false);
      form.tasks?.push({
        name: name,
        status: 'ACTIVE',
        vehicleId: form.vehicleId,
        createdAt: new Date()
      })
    }
  }

  return (
    <>
      <div className="col-md-6">
        {!isView && (
          <section className="card mb20 insp-task-card">
            <div className="card-body p-0 border-none">
              <div className="table-responsive table-common">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th style={{ width: "60%" }}>Task</th>
                      <th style={{ width: "30%" }}>Added On</th>
                      <th style={{ width: "10%" }}>
                        <a
                          className="link-primary"
                          title="Add"
                          href="#"
                          data-toggle="modal"
                          data-target="#inspTasksModal"
                          onClick={() => setShowAddTask(true)}
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </a>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.tasks && form.tasks.map((task: Task, index) => (<tr key={index}>
                      <td>
                        <div className="control_inline">
                          <label className="control control--checkbox">
                            {task.name}
                            <input
                              type="checkbox"
                              className="form-check-input"
                              onChange={(e)=>task.status = e.target.checked ? 'COMPLETED' :  'ACTIVE'}
                            />
                            <div className="control__indicator"></div>
                          </label>
                        </div>
                      </td>
                      <td>{formatDate(task.createdAt as Date)}</td>
                      <td></td>
                    </tr>))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
        {isView && (
          <section className="card mb20 insp-task-card view-insp-task-card">
            <div className="card-body p-0 border-none">
              <div className="table-responsive table-common">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th style={{ width: "60%" }}>Task</th>
                      <th style={{ width: "30%" }}></th>
                      <th style={{ width: "10%" }} className="text-right">
                        <a
                          className="link-primary"
                          title="Add"
                          href="#"
                          data-toggle="modal"
                          data-target="#inspTasksModal"
                        >
                          {/* <i className="fa fa-plus" aria-hidden="true"></i> */}
                        </a>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.tasks && form.tasks.map((task: Task) => (<tr>
                      <td>
                        <div className="control_inline">
                          <label className="control control--checkbox">
                            {task.name}
                            <input
                              type="checkbox"
                              className="form-check-input"
                              defaultChecked={task.status === 'COMPLETED'}
                              disabled={true}
                            />
                            <div className="control__indicator"></div>
                          </label>
                        </div>
                      </td>
                      <td>{formatDate(task.createdAt as Date)}</td>
                      <td></td>
                    </tr>))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </div>
      <JAXModal
        heading={`Add Task`}
        show={showAddTask}
        handleClose={() => setShowAddTask(false)}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
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
                <span style={{ color: "red", fontSize: '10px' }}>
                  {error ? error : ""}
                </span>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group text-right">
                <button className="btn btn-orange" type="submit">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </JAXModal>
    </>
  );
};

export default VehicleTasks;
