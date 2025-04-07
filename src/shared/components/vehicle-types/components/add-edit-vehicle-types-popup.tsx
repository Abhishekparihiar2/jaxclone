import { FC, useState } from "react";
import
{
  addVehicleTypes,
  editVehicleTypes,
} from "../../../../store/vehicleTypes/action";
import { useDispatch } from "react-redux";

interface AddEditVehicleDropdownInterface
{
  dropdownValues: any;
  setAddEditPopup: ( value: boolean ) => void;
  onUpdate:(value:string ) => void;
}

const AddEditVehicleDropdownPopup: FC<AddEditVehicleDropdownInterface> = (
  props: AddEditVehicleDropdownInterface
) =>
{
  const { dropdownValues, setAddEditPopup, onUpdate } = props;
  const dispatch = useDispatch();

  // form values
  const [ name, setName ] = useState( "" );
  const [ id, setId ] = useState( 0 );
  const [ mode, setMode ] = useState( "ADD" );
  const [error, setError] = useState( "" );

  const validateNewValue = (valueToValidate:string) => {
    const duplicates = Object.keys(dropdownValues).filter( ( item ) => dropdownValues[item].toLowerCase() === valueToValidate.toLowerCase() );
    return duplicates.length === 0;
  }

  const validateEditValue = (id:number, valueToValidate:string) => {
    const duplicates = Object.keys(dropdownValues).filter( ( item ) => dropdownValues[item].toLowerCase() === valueToValidate.toLowerCase() && Number(item) !== id );
    return duplicates.length === 0;
  }  
  const handleSubmit = () =>
  {
    if ( mode === "ADD" )
    {
      if ( name )
      {
        if ( !validateNewValue(name) )
        {
          setError("Value Already exists in the dropdown!")
        } else
        {          
          dispatch(addVehicleTypes(name))
          onUpdate( name );
          setAddEditPopup( false );
        }
      }
    } else if ( mode === "EDIT" )
    {
      if ( id && name )
      {
        if ( !validateEditValue( id, name ) )
        {
          setError("Value Already exists in the dropdown!")
        } else
        {          
          dispatch( editVehicleTypes( id, name  ) );
          onUpdate( String(id) );
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
            { dropdownValues && Object.keys(dropdownValues)?.length ? <option value="EDIT" selected={ mode === "EDIT" }>
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
              { Object.keys(dropdownValues || {})?.length > 0 ? Object.keys(dropdownValues || {})?.map( ( item ) =>
              {
                return ( <option selected={ Number(item) === id } value={ item }>{ dropdownValues[item] }</option> );
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

export default AddEditVehicleDropdownPopup;
