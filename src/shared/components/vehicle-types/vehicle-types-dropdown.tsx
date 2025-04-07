import { useState, FC, useLayoutEffect, useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import JAXModal from "../modal/jax-modal";
import { RootState } from "../../../store";
import AddEditDropdownPopup from "./components/add-edit-vehicle-types-popup";
import { fetchVehicleTypes } from "../../../store/vehicleTypes/action";

interface CustomDropdownInterface
{
  placeholder: string;
  name: string;
  value: string;
  onChange: ( value: string, name: string ) => void;
  allowEdit?: boolean;
}

const VehicleTypesDropDown: FC<CustomDropdownInterface> = (
  props: CustomDropdownInterface
) =>
{
  const { onChange, name, placeholder, value, allowEdit } = props;
  const [ addEditPopup, setAddEditPopup ] = useState( false );
  const [addValue, setAddValue] = useState('');
  const dispatch = useDispatch();
  const vehicleTypes = useSelector((state: RootState)=>state.vehicleTypesValues.vehicleTypes);
  useLayoutEffect(()=>{ 
    dispatch(fetchVehicleTypes());
    // eslint-disable-next-line
  }, []);  

  useEffect(()=>{
    if(addValue !== ''){
      let id = Object.keys(vehicleTypes).find((key: any) => vehicleTypes[key] === addValue);
      if(id){
        onChange(name, id);
      } 
    } 
    // eslint-disable-next-line
  }, [vehicleTypes]);

  const handleChange = (  valueInput: string ) =>
  {
    onChange(name, valueInput);
    setAddValue(valueInput);
  };

  return (
    <>
      <select
        className={ `form-control ${ value ? '' : 'custom-unselected-select' }` }
        name={ name }
        value={ value }
        onChange={ ( e ) =>
        {
          if ( e.target.value === "-1" )
          {
            e.preventDefault();
            setAddEditPopup( true );
          } else
          {
            handleChange( e.target.value );
          }
        } }
      >
        <option hidden disabled selected value={ "" }> { placeholder } </option>
        { allowEdit ? (
          <option selected={ false } value="-1">
            Add/Edit Value
          </option>
        ) : (
          ""
        ) }
        { Object.keys(vehicleTypes || {})?.length
          ? Object.keys(vehicleTypes || {}).map( ( item : string) =>
          {
            return (
              <option selected={ item === value } value={ item }
              >
                { vehicleTypes[item as any] }
              </option>
            );
          } )
          : "" }
      </select>
      { allowEdit ? (
        <JAXModal
          heading={ `Add/Edit Value` }
          show={ addEditPopup }
          handleClose={ () => setAddEditPopup( false ) }
        >
          <AddEditDropdownPopup
            dropdownValues={vehicleTypes}
            setAddEditPopup={ setAddEditPopup }
            onUpdate={handleChange}
          ></AddEditDropdownPopup>
        </JAXModal>
      ) : (
        ""
      ) }
    </>
  );
};

export default VehicleTypesDropDown;
