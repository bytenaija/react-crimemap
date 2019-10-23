import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const IncidentThumbnail = ({ incident, color }) => {
  let downVotes = [];
  let upVotes = [];
  if (incident.votes) {
    downVotes = incident.votes.filter(vote => vote.vote === -1);
    upVotes = incident.votes.filter(vote => vote.vote === 1);
  }
  const { comments = [] } = incident;
  return (
    <IncidentWrapper color={color} href={`/incident/${incident._id}`}>
      <h4>{incident.type}</h4>
      <h6>{incident.address}</h6>
      <MetaCount>
        <span>
          <Icon name="thumbs down" />
          <span>{downVotes.length}</span>
        </span>
        <span>
          <Icon name="eye" />
          <span>{incident.viewCount.length}</span>
        </span>

        <span>
          <Icon name="thumbs up" />
          <span>{upVotes.length}</span>
        </span>

        <span>
          <Icon name="comments" />
          <span>{comments.length}</span>
        </span>
      </MetaCount>
    </IncidentWrapper>
  );
};
const IncidentWrapper = styled.a`
  background: ${props => props.color};
  flex-grow: 1;
  color: #ffffff;
  margin: 0.5rem;
  padding: 0.5rem;
  text-align: center
  box-shadow: 1px 1px 10px ${props => props.color}
  display: block;
    &:hover{
      color: #ffffff
    }
    &:active{
      color: #ffffff
    }
`;

export const MetaCount = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
`;
export default IncidentThumbnail;
