/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Modal } from 'semantic-ui-react';
import Creatable from 'react-select/creatable';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Calendar from 'react-calendar';
import Geocode from 'react-geocode';
import Types from '../store/crimes/types';
import { googleKey } from '../config';

const AddIncidentModal = () => {
  const addNewIncident = useSelector((state) => state.Crimes.addNewIncident);
  const crimes = useSelector((state) => state.Crimes.crimes);
  const dispatch = useDispatch();
  const [active, setActive] = useState('active');
  const [address, setAddress] = useState('');
  const [position, setPosition] = useState({ type: 'Point', coordinates: [] });
  const [type, setType] = useState('');
  const [date, setDate] = useState(new Date());
  const [details, setDetails] = useState('');

  const options = crimes.reduce((acc, current) => {
    if (!acc.find((option) => option.value === current.type)) {
      acc.push({ value: current.type, label: current.type });
    }
    return acc;
  }, []);

  const handleClose = () => {
    dispatch({ type: Types.ADD_NEW_INCIDENT });
  };

  const handleSelect = (selectedAddress) => {
    setAddress(selectedAddress);
    geocodeByAddress(selectedAddress)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log(latLng);
        setPosition({ type: 'Point', coordinates: [latLng.lng, latLng.lat] });
        console.log(position);
      })
      .catch((error) => console.error('Error', error));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const incidentDate = active === 'active' ? new Date() : date;
    if (position.coordinates.length < 2) {
      Geocode.setApiKey(googleKey);
      const response = await Geocode.fromAddress(address);
      const { lat, lng } = response.results[0].geometry.location;
      position.coordinates = [lng, lat];
    }
    const data = {
      address,
      location: position,
      details,
      date: incidentDate,
      type: type.label,
    };

    dispatch({ type: Types.ADD_CRIME, payload: data });
  };

  const handleOnChange = (e) => {
    options.push({ label: e.label, value: e.value });
    setType(e);
  };

  return (
    <Modal open={addNewIncident} onClose={handleClose}>
      <Modal.Header>Add Incident</Modal.Header>
      <ModalContent>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <PlacesAutocomplete
              value={address}
              onChange={(typedAddress) => setAddress(typedAddress)}
              onSelect={handleSelect}
              id="name"
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'location-search-input',
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
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
            {position.coordinates > 1 && (
              <div>
                Latitude:
                {' '}
                {position.coordinates[1]}
                Longitude:
                {' '}
                {position.coordinates[0]}
              </div>
            )}
          </Form.Field>
          <Form.Field>
            <label>Incident Type</label>
            <Creatable
              multi={false}
              options={options}
              onChange={handleOnChange}
              value={type}
              showNewOptionAtTop
            />
          </Form.Field>

          <Form.Field>
            <label>Details (Optional)</label>
            <textarea
              placeholder="Details"
              onChange={(e) => setDetails(e.target.value)}
            />
          </Form.Field>

          <Form.Radio
            label="Active"
            value="active"
            checked={active === 'active'}
            onChange={() => setActive('active')}
          />

          <Form.Radio
            label="Historic"
            value="historic"
            checked={active === 'historic'}
            onChange={() => setActive('historic')}
          />

          {active === 'historic' && (
            <Form.Field>
              <label>Date of Incident</label>
              <Calendar
                onChange={(selectedDate) => setDate(selectedDate)}
                value={date}
              />
            </Form.Field>
          )}
          <SubmitButton type="submit" color="purple">
            Submit
          </SubmitButton>
          <SubmitButton onClick={handleClose} color="teal">
            Cancel
          </SubmitButton>
        </Form>
      </ModalContent>
    </Modal>
  );
};

const ModalContent = styled(Modal.Content)`
  &&&& {
    display: flex;
    flex-direction: column;
  }
`;

const SubmitButton = styled(Button)`
  &&&& {
    margin: 1rem 1rem;
    width: 40%;
  }
`;

export default AddIncidentModal;
