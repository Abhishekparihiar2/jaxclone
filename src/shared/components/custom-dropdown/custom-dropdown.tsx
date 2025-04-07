import React, { useState, FC, } from "react";
import { useSelector } from "react-redux";
import JAXModal from "../modal/jax-modal";
import { StoreInterface } from "../../../store";
import
{
  DropdownValuesState,
} from "../../../store/dropdownValues/model";
import AddEditDropdownPopup from "./components/add-edit-dropdown-popup";

interface CustomDropdownInterface
{
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: ( value: string, name: string ) => void;
  allowEdit?: boolean;
}

const CustomDropdown: FC<CustomDropdownInterface> = (
  props: CustomDropdownInterface
) =>
{
  const { type, onChange, name, placeholder, value, allowEdit } = props;

  const [ addEditPopup, setAddEditPopup ] = useState( false );

  const dropdownValues: DropdownValuesState = useSelector(
    ( state: StoreInterface ) => state.dropdownValues
  );
  const list = dropdownValues?.dropdownValues?.length
    ? dropdownValues.dropdownValues.filter( ( item ) => item.type === type ).sort((item, itemB)=>(item.title.toUpperCase() < itemB.title.toUpperCase()) ? -1 : (item.title.toUpperCase() > itemB.title.toUpperCase()) ? 1 : 0)
    : [];
  const handleChange = (  valueInput: string ) =>
  {
    onChange( name, valueInput );
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
        { list?.length
          ? list.map( ( item ) =>
          {
            return (
              <option selected={ item.title === value } value={ item.title }>
                { item.title }
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
            type={ type }
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

export default CustomDropdown;
