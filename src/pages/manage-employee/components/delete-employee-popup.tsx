import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../../Api";
import { StoreInterface } from "../../../store";
import { fetchEmployees, updatePopupStatus } from "../../../store/employees/action";
import { ManageEmployeesPage, PopupMode } from "../../../store/employees/model";
import { Loader } from "../../../store/loader/model";
import { ResponseSuccess } from "../../../store/shared/model";

const DeleteEmployeePopup = () => {
  const dispatch = useDispatch();
  const pageInfo: ManageEmployeesPage = useSelector(
    (state: StoreInterface) => state.manageEmployeesState
  );
  const [isDeleting, setIsDeleting] = useState<boolean>();
  const deleteEmployee = () => {
     if(pageInfo.empDeleteId){
      setIsDeleting(true);
      dispatch(new Loader(true).action());
      Api.delete(`/api/v1/users/${pageInfo.empDeleteId}/delete/admin`).then(function (response) {
        dispatch(new Loader(false).action());
        dispatch(new ResponseSuccess(response.data.message).action())
        setIsDeleting(false);
        dispatch(fetchEmployees(10, 0));
        dispatch(updatePopupStatus(PopupMode.OFF));
      })
    };
  }

  return (
    <>
      <h5>Are you sure you want to delete employee? </h5>
      <button className="btn btn-orange mt-3" type="submit" disabled={isDeleting} onClick={()=>deleteEmployee()}>
        Yes
      </button>
      <button className="btn btn-orange mt-3 ml-3" type="submit" disabled={isDeleting} onClick={()=>dispatch(updatePopupStatus(PopupMode.OFF))}>
        No
      </button>
    </>
  );
};

export default DeleteEmployeePopup;
