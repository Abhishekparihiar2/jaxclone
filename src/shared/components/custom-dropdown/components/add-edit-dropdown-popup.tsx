import React, { FC, useState } from "react";
import { StoreInterface } from "../../../../store";
import
{
  DropdownValuesState,
} from "../../../../store/dropdownValues/model";
import
{
  addDropDownValue,
  editDropdownValue
} from "../../../../store/dropdownValues/action";
import { useDispatch, useSelector } from "react-redux";

interface AddEditDropdownPopupInterface
{
  type: string;
  setAddEditPopup: ( value: boolean ) => void;
  onUpdate:(value:string ) => void;
}

const AddEditDropdownPopup: FC<AddEditDropdownPopupInterface> = (
  props: AddEditDropdownPopupInterface
) =>
{
  const { type, setAddEditPopup, onUpdate } = props;
  const dispatch = useDispatch();

  // form values
  const [ name, setName ] = useState( "" );
  const [ id, setId ] = useState( 0 );
  const [ mode, setMode ] = useState( "ADD" );
  const [error, setError] = useState( "" );

  const dropdownValues: DropdownValuesState = useSelector(
    ( state: StoreInterface ) => state.dropdownValues
  );
  const list = dropdownValues?.dropdownValues?.length
    ? dropdownValues.dropdownValues.filter( ( item ) => item.type === type )
    : [];

  const validateNewValue = (valueToValidate:string) => {
    const duplicates = list.filter( ( item ) => item.title.toLowerCase() === valueToValidate.toLowerCase() );
    return duplicates.length === 0;
  }

  const validateEditValue = (id:number, valueToValidate:string) => {
    const duplicates = list.filter( ( item ) => item.title.toLowerCase() === valueToValidate.toLowerCase() && item.id !== id );
    return duplicates.length === 0;
  }

  const handleSubmit = () =>
  {
    if ( mode === "ADD" )
    {
      if ( name && type)
      {
        if ( !validateNewValue(name) )
        {
          setError("Value Already exists in the dropdown!")
        } else
        {          
          dispatch( addDropDownValue( name, type ) )
          onUpdate( name );
          setAddEditPopup( false );
        }
      }
    } else if ( mode === "EDIT" )
    {
      if ( id && name && type )
      {
        if ( !validateEditValue( id, name ) )
        {
          setError("Value Already exists in the dropdown!")
        } else
        {          
          dispatch( editDropdownValue( id, name, type ) );
          onUpdate( name );
          setAddEditPopup( false );
        }
      }
    }
  }

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="form-group">
          <select
            className="form-control"
            value={ mode }
            onChange={ ( e ) =>
            {
              setMode( e.target.value );
              setError( "" );
            } }
          >
            <option value="ADD" selected={ mode === "ADD" }>
              Add
            </option>
            { list?.length ? <option value="EDIT" selected={ mode === "EDIT" }>
              Edit
            </option> : "" }
          </select>
        </div>
      </div>
      <div className="col-md-4">
        { mode === "EDIT" ? (
          <div className="form-group">
            <select
              className="form-control"
              value={ id }
              onChange={ ( e ) =>
              {
                setId( Number( e.target.value ) );
              } }
            >
              <option value="">Select the value</option>
              { list?.length ? list.map( ( item ) =>
              {
                return ( <option selected={ item.id === id } value={ item.id }>{ item.title }</option> );
              } ) : "" }

            </select>
          </div>
        ) : (
          ""
        ) }
        <div className="form-group">
          <input
            type="text"
            className="form-control placeholder-dark"
            placeholder="Enter Value"
            value={ name }
            name="name"
            onChange={ ( e ) => { setName( e.target.value ) } }
          />
          <span style={ { color: "red", fontSize: '10px' } }>
            { error}
          </span>
        </div>
      </div>
      <div className="col-md-4">
        <div className="form-group text-right">
          <button className="btn btn-orange" type="submit" onClick={ handleSubmit }>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditDropdownPopup;
