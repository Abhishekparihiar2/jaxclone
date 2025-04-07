import React from 'react'

const VehicleDamage = () => {
    return (
        <section className="card mb20">
                <header className="card-header pl-5rem">
                    <h2 className="card-title">Damage Log</h2>
                </header>
            <div className="card-body p-0 border-none">
                <div className="table-responsive table-common">
                    <table className="table mb-0">
                        <thead>
                            <tr>
                                <th style={{ width: "35%" }}>
                                    Damage Type
                                </th>
                                <th style={{ width: "15%" }}>Damage Size</th>
                                <th style={{ width: "20%" }}>Damage Location</th>
                                <th style={{ width: "15%" }}>Repaired</th>
                                <th style={{ width: "5%" }}>Image</th>
                                <th style={{ width: "10%" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Body Scratch</td>
                                <td>Small</td>
                                <td>Atlanta</td>
                                <td>No</td>
                                <td>
                                    <a
                                    href="#"
                                    className="link-secondary td-view-action"
                                    title="View"
                                    >
                                    <i
                                        className="fa fa-eye"
                                        aria-hidden="true"
                                    ></i>
                                    </a>
                                </td>
                                <td className="td-action">
                                    <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-xs mr-1"
                                    title="Edit"
                                    >
                                        <i
                                            className="fa fa-pencil"
                                            aria-hidden="true"
                                        ></i>
                                    </button>
                                    <button
                                    type="button"
                                    className="btn btn-outline-danger btn-xs mr-1"
                                    data-toggle="modal"
                                    data-target="#deleteModal"
                                    title="Delete"
                                    >
                                        <i
                                            className="fa fa-trash-o"
                                            aria-hidden="true"
                                        ></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default VehicleDamage