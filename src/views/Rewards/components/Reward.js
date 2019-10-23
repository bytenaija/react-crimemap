import React from 'react';
import styled from 'styled-components';
import { Card } from 'semantic-ui-react';

const Reward = ({ reward }) => {
  return (
    <RewardWrapper>
      <h3>{reward.name}</h3>
      <strong>Reward: </strong>
      <span>USD {reward.payout}</span>
      <h4>
        To win this reward you must report {reward.criteria} incidents
        that happen 5km from {reward.address} between{' '}
        {new Date(reward.startDate).toLocaleDateString()} and{' '}
        {new Date(reward.endDate).toLocaleDateString()}
      </h4>
    </RewardWrapper>
  );
};

const RewardWrapper = styled(Card)`
  &&&& {
    padding: 2rem;
    min-height: 100px;
    width: 80%;
  }
`;
export default Reward;
