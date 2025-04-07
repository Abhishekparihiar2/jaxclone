import React from "react";

const CustomerNotes = () => {
  return (
    <>
      <section className="card mb20">
        <header className="card-header">
          {/* <h2 className="card-title">Notes</h2> */}
          <div className="card-head-actions">
            <a
              className="btn btn-orange"
              href="#"
              data-toggle="modal"
              data-target="#addNotes"
            >
              Add Notes
            </a>
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive notes-table mb20">
            <table className="table table-bordered mb-0">
              <thead>
                <tr>
                  <th style={{ width: "40%" }}>Notes</th>
                  <th style={{ width: "17%" }}>Created Date</th>
                  <th style={{ width: "15%" }}>Author</th>
                  <th style={{ width: "13%" }} className="th-action"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since.
                  </td>
                  <td>
                    Sep 9, 2021 <br />
                    06:00 PM
                  </td>
                  <td>Jada M</td>
                  <td className="td-action">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-xs mr-1"
                      title="Edit"
                    >
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-xs mr-1"
                      data-toggle="modal"
                      data-target="#deleteModal"
                      title="Delete"
                    >
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-responsive notes-table">
            <table className="table table-bordered mb-0">
              <thead>
                <tr>
                  <th style={{ width: "40%" }}>Notes</th>
                  <th style={{ width: "17%" }}>Created Date</th>
                  <th style={{ width: "15%" }}>Author</th>
                  <th style={{ width: "13%" }} className="th-action"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since.
                  </td>
                  <td>
                    Sep 9, 2021 <br />
                    06:00 PM
                  </td>
                  <td>Jada M</td>
                  <td className="td-action">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-xs mr-1"
                      title="Edit"
                    >
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-xs mr-1"
                      data-toggle="modal"
                      data-target="#deleteModal"
                      title="Delete"
                    >
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomerNotes;
