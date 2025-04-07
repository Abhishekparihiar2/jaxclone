import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Inspection } from "../../shared/models";
import { StoreInterface } from "../../store";
import { fetchInspectionById } from "../../store/inspections/action";
import InspectionFields from "./components/inspection-fields";
const ViewInspection = () => {
  let [searchParams] = useSearchParams()
  const inspectionId  = searchParams.get("inspectionId")
  const dispatch = useDispatch();
  const inspectionData: Inspection = useSelector(
    (state: StoreInterface) => state.viewInspectionPage.inspection
  );
  useEffect(() => {
    if(inspectionId){
      dispatch(fetchInspectionById(Number(inspectionId) ));
    }
  }, [inspectionId] );
  return (
     <InspectionFields isView={true} inspectionData={inspectionData} />
  );
};

export default ViewInspection;
