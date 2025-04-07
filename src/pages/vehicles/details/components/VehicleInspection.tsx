import React, { useEffect } from "react";
import { VehicleInspectionInterface } from "../../interface";
import axios from "../../../../Api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Inspection, InspectionType } from "../../../../shared/models";


const VehicleInspection = ({ vehicle }: VehicleInspectionInterface) => {
  const [inspections, setInspections] = useState<Inspection[] | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (vehicle?.id) {
      fetchInspections(vehicle.id);
    }
  }, [vehicle]);

  const fetchInspections = async (vehicleId: number) => {
    try {
      const response = await axios.post(`/api/v1/inspections/search/10/0`, {
        vehicleId: vehicleId,
      });
      if (response && response.data && response.data.data.length > 0)
        setInspections(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const viewInspection = (inspectionId: number) => {
    navigate(`/view-inspection/?inspectionId=${inspectionId}`);
  };

  return (
    <section className="card mb20">
      <header className="card-header pl-5rem">
        <h2 className="card-title">Inspection</h2>
      </header>
      {inspections && inspections?.length ? (
        <>
          <div className="card-body p-0 border-none">
            <div className="table-responsive table-common">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th style={{ width: "50%" }}>Inspection Type</th>
                    <th style={{ width: "30%" }}>Vehicle No.</th>
                    <th style={{ width: "20%" }}>View</th>
                  </tr>
                </thead>
                <tbody>
                  {inspections &&
                    inspections.map((inspection) => (
                      <tr>
                        <td>
                          {inspection.inspectionTypeId
                            ? InspectionType[inspection.inspectionTypeId]
                            : ""}
                        </td>
                        <td>{inspection.vehicleNumber}</td>
                        <td>
                          {/* eslint-disable-next-line  */}
                          <a
                            href="#"
                            className="link-secondary td-view-action"
                            title="View"
                            onClick={() =>
                              inspection.id && viewInspection(inspection.id)
                            }
                          >
                            <i className="fa fa-eye" aria-hidden="true"></i>
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>{" "}
          </div>
        </>
      ) : (
        <>
          <div className="card-body">No Inspections Found.</div>
        </>
      )}
    </section>
  );
};

export default VehicleInspection;
