import React, { useState } from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

const GeoLocation = ({onSelecting, selectedAddress, onChange}: any) => {
    const [address, setAddress] = useState("")
    const handleChange = (add: any) => {
        onChange(add)
        setAddress(add);
    };
    
    const handleSelect = (add: any) => {
        geocodeByAddress(add)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
              onSelecting({...latLng, add})
            })
            .catch(error => console.error('Error', error));
    };
    return (
        <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input form-control',
              })}
              value={selectedAddress}
              // onKeyPress={(e: any) => {
              //   console.log(e.target.value)
              //   onChange(e.target.value)
              // }}
              // placeholder={selectedAddress}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    )
}

export default GeoLocation