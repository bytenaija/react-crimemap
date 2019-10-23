import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { MetaCount } from './Incident';

export default ({ crime }) => {
  const downVotes = crime.votes.filter(vote => vote.vote === -1);
  const upVotes = crime.votes.filter(vote => vote.vote === 1);
  const { comments = [] } = crime;
  return (
    <CardView>
      <CardContent href={`/incident/${crime._id}`}>
        <h2>{crime.type}</h2>
        <h4>{crime.address}</h4>
        <MetaCount>
          <span>
            <Icon name="thumbs down" />
            <span>{downVotes.length}</span>
          </span>
          <span>
            <Icon name="eye" />
            <span>{crime.viewCount.length}</span>
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
      </CardContent>
    </CardView>
  );
};

const CardContent = styled.a`
  width: 100%;
  color: black;
`;
const CardView = styled(Card)`
  &&&& {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0;
  }
`;
