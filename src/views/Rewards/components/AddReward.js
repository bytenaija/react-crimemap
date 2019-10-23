import React, { useState } from 'react';
import { Button, Form, Modal, Checkbox } from 'semantic-ui-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import Geocode from 'react-geocode';
import { withRouter } from 'react-router-dom';
import { googleKey } from '../../../config';
import Rewards from '..';
import Paypal from '../../../components/Paypal';

const AddReward = ({ isOpen, handleClose }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [criteria, setCriteria] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reward, setReward] = useState(0);
  const [payout, setPayout] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [totalPrice, setTotalPrice] = useState(reward * payout);
  const [location, setLocation] = useState({
    type: 'Point',
    coordinates: [],
  });

  console.log(totalPrice);

  const handleSelect = selectedAddress => {
    setAddress(selectedAddress);
    geocodeByAddress(selectedAddress)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        setLocation({
          type: 'Point',
          coordinates: [latLng.lng, latLng.lat],
        });
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (location.coordinates.length < 2) {
      Geocode.setApiKey(googleKey);
      const response = await Geocode.fromAddress(address);
      const { lat, lng } = response.results[0].geometry.location;
      location.coordinates = [lng, lat];
    }
    setShowPayment(true);
  };
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Modal.Header>Add Incident</Modal.Header>
      <ModalContent>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <PlacesAutocomplete
              value={address}
              onChange={typedAddress => setAddress(typedAddress)}
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
                      placeholder: 'Search Address ...',
                      className: 'location-search-input',
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? {
                            backgroundColor: '#fafafa',
                            cursor: 'pointer',
                          }
                        : {
                            backgroundColor: '#ffffff',
                            cursor: 'pointer',
                          };
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
            {location.coordinates > 1 && (
              <div>
                Latitude:
                {location.coordinates[1]}
                Longitude:
                {location.coordinates[0]}
              </div>
            )}
          </Form.Field>
          <Form.Field>
            <label htmlFor="title">
              Title of Reward
              <input
                placeholder="Title of Reward"
                onChange={e => setName(e.target.value)}
              />
            </label>
          </Form.Field>

          <Form.Field>
            <label htmlFor="criteria">
              How many Incident before a user is qualified for a
              reward
              <input
                placeholder="Criteria for Payout"
                onChange={e => setCriteria(e.target.value)}
                id="criteria"
              />
            </label>
          </Form.Field>

          <Form.Field>
            <label htmlFor="criteria">
              Number of Reward to be Given Out
              <input
                placeholder="Number of Awardees"
                onChange={e => {
                  setReward(e.target.value);
                  setTotalPrice(reward * payout);
                }}
                id="criteria"
              />
            </label>
          </Form.Field>

          <Form.Field>
            <label htmlFor="payout">
              How Much will Each awardee Get
              <input
                placeholder="Payout Amount"
                onChange={e => {
                  setPayout(e.target.value);
                  setTotalPrice(reward * payout);
                }}
                id="payout"
              />
            </label>
          </Form.Field>

          <Form.Field>
            <label htmlFor="date">
              Start Date of Reward
              <Calendar
                onChange={selectedDate => setStartDate(selectedDate)}
                value={startDate}
              />
            </label>
          </Form.Field>

          <Form.Field>
            <label htmlFor="date">
              End Date of Reward
              <Calendar
                onChange={selectedDate => setEndDate(selectedDate)}
                value={endDate}
              />
            </label>
          </Form.Field>

          <SubmitButton type="submit" color="purple">
            Submit
          </SubmitButton>
          <SubmitButton onClick={handleClose} color="teal">
            Cancel
          </SubmitButton>
        </Form>
        {showPayment && (
          <Paypal
            product={{
              name,
              address,
              criteria,
              startDate,
              endDate,
              reward,
              payout,
              showPayment,
              totalPrice: reward * payout,
              location,
            }}
            handleClose={handleClose}
          />
        )}
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

export default AddReward;
