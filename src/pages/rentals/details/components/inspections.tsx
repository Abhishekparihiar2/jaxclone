import { FC, useEffect } from "react";
import
{
  Rental,
  RentalDetailsPage,
} from "../../../../store/rentals/model";
import { fetchInspections } from "../../../../store/rentals/action";
import { StoreInterface } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { Inspection } from "../../../../shared/models";
import { InspectionType } from "../../../../shared/models"

interface RentalInspectionsInterface
{
  rental: Rental;
}

const Inspections: FC<RentalInspectionsInterface> = (
  props: RentalInspectionsInterface
) =>
{
  const { rental } = props;
  const dispatch = useDispatch();
  const pageInfo: RentalDetailsPage = useSelector(
    ( state: StoreInterface ) => state.rentalDetailsPage
  );

  useEffect( () =>
  {
    if ( rental?.id )
    {
      dispatch( fetchInspections( rental.id ) );
    }
  }, [ rental ] );

  return (
    <section className="card mb20">
      <header className="card-header pl-5rem">
        <h2 className="card-title">Inspection</h2>
      </header>
      { pageInfo?.inspections && pageInfo?.inspections?.length ? (
        <>
          <div className="card-body p-0 border-none">
            <div className="table-responsive table-common">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th style={ { width: "50%" } }>Inspection Type</th>
                    <th style={ { width: "30%" } }>Vehicle No.</th>
                    <th style={ { width: "20%" } }>View</th>
                  </tr>
                </thead>
                <tbody>
                  { pageInfo?.inspections.map( ( insp: Inspection ) =>
                  {
                    return (
                      <>
                        <tr>
                          <td>
                            { insp.inspectionTypeId
                              ? InspectionType[ insp.inspectionTypeId ]
                              : "" }
                          </td>
                          <td>{ insp.vehicleNumber }</td>
                          <td>
                            <a
                              href={ insp.id ? `/view-inspection/?inspectionId=${ insp.id }` : "#" }
                              className="link-secondary td-view-action"
                              title="View"
                            >
                              <i className="fa fa-eye" aria-hidden="true"></i>
                            </a>
                          </td>
                        </tr>
                      </>
                    );
                  } ) }
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          { " " }
          <div className="card-body">No Inspections Found.</div>
        </>
      ) }
    </section>
  );
};

export default Inspections;
