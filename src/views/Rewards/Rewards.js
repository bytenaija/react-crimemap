import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import AddReward from './components/AddReward';
import { Button } from 'semantic-ui-react';
import Navbar from '../../components/Navbar';
import Reward from './components/Reward';
import Types from '../../store/rewards/types';

const Rewards = () => {
  const [isOpen, setAddRewardOpen] = useState(false);
  const rewards = useSelector(state => state.Reward.rewards);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: Types.GET_REWARD });
  }, [])

  const handleClose = () => {
    setAddRewardOpen(false);
  };
  return (
    <RewardsWrapper>
      <Navbar />
      <RewardsContainer>
        <Button onClick={() => setAddRewardOpen(true)} color="purple">
          Add Reward
        </Button>
        <RewardListContainer>
          {rewards.map(reward => {
            return <Reward key={reward._id} reward={reward} />;
          })}
        </RewardListContainer>
        <AddReward isOpen={isOpen} handleClose={handleClose} />
      </RewardsContainer>
    </RewardsWrapper>
  );
};

const RewardsWrapper = styled.div`
  width: 100%;
`;

const RewardsContainer = styled.div`
  background: #ffffff;
  padding: 2rem;
  width: 100%;
`;

const RewardListContainer = styled.div`
  margin: 2rem 0;
`;
export default Rewards;
