import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Form, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import moment from 'moment';
import Types from '../../store/crimes/types';
import Navbar from '../../components/Navbar';
import Map from '../../components/Map';
import { usePosition } from '../../hooks/usePosition';
import AddIncidentModal from '../../components/AddIncidentModal';
import CommentPane from './components/CommentPane';

const IncidentView = ({ match }) => {
  const dispatch = useDispatch();
  const incident = useSelector(state => state.Crimes.currentCrime);
  let downVotes = [];
  let upVotes = [];
  const viewCount = incident.viewCount || [];
  if (incident.votes) {
    downVotes = incident.votes.filter(vote => vote.vote === -1);
    upVotes = incident.votes.filter(vote => vote.vote === 1);
  }
  const { latitude, longitude } = usePosition();
  useEffect(() => {
    const { incidentId } = match.params;
    dispatch({ type: Types.GET_CRIME, payload: incidentId });
  }, [dispatch, match]);

  const [comment, setComment] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    const clonedComment = comment.slice(0);
    setComment('');
    dispatch({
      type: Types.ADD_COMMENT,
      payload: { incidentId: incident._id, comment: clonedComment },
    });
  };

  return (
    <div>
      <Navbar />
      <RecentIncidentsMapWrapper>
        <MapWrapper>
          <Map
            zoom={14}
            crimes={[incident]}
            center={{ latitude, longitude }}
          />
        </MapWrapper>
        <IncidentWrapper>
          <h5>Address</h5>
          <span>{incident.address}</span>

          {incident.details && (
            <>
              <h5>Details</h5>
              <span>{incident.details}</span>
            </>
          )}

          {incident.userId && (
            <>
              <h5>Reported By</h5>
              <a href={`/incidents/author/${incident.userId._id}`}>
                {incident.userId.username}
              </a>
            </>
          )}
          <h5>Reported</h5>
          <span>{moment(incident.createdAt).fromNow()}</span>
        </IncidentWrapper>
      </RecentIncidentsMapWrapper>
      <AddIncidentModal />
      <MetaCount>
        <span>
          <Icon
            name="thumbs down"
            link
            onClick={() => {
              dispatch({
                type: Types.VOTE,
                payload: { incidentId: incident._id, vote: -1 },
              });
            }}
          />
          <span>{downVotes.length}</span>
        </span>
        <span>
          <Icon name="eye" />
          <span>{viewCount.length}</span>
        </span>

        <span>
          <Icon
            name="thumbs up"
            link
            onClick={() => {
              dispatch({
                type: Types.VOTE,
                payload: { incidentId: incident._id, vote: 1 },
              });
            }}
          />
          <span>{upVotes.length}</span>
        </span>
      </MetaCount>

      <CommentWrapper>
        <h3>Comments</h3>
        <CommentInnerWrapper>
          <FormWrapper>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label htmlFor="details">
                  Comment
                  <textarea
                    placeholder="Comment"
                    onChange={e => setComment(e.target.value)}
                    value={comment}
                  />
                </label>
              </Form.Field>

              <SubmitButton type="submit" color="purple">
                Submit
              </SubmitButton>
            </Form>
          </FormWrapper>
          <CommentPane comments={incident.comments} />
        </CommentInnerWrapper>
      </CommentWrapper>
    </div>
  );
};

const MetaCount = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-around;
  justify-items: center;
  background: #ffffff;
  padding: 3rem;
  font-size: 26px;
`;

const CommentWrapper = styled.div`
  background: #ffffff;
  padding: 2rem;
`;

const CommentInnerWrapper = styled.div`
  display: flex;
`;

const SubmitButton = styled(Button)`
  &&&& {
    margin: 1rem 1rem;
    width: 40%;
  }
`;

const FormWrapper = styled.div`
  padding: 2rem;
  margin-bottom: 3rem;
  width: 50%;
  background: #ffffff;
`;

const RecentIncidentsMapWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const MapWrapper = styled.div`
  width: 75%;
`;

const IncidentWrapper = styled.div`
  padding: 1rem;
  width: 25%;
  background: #ffffff;
  max-height: 699.5px;
  overflow: hidden;
`;
export default IncidentView;
