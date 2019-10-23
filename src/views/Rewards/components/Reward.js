import React from 'react'
import styled from 'styled-components'
import {Card} from 'semantic-ui-react'

const Reward = ({ reward }) => {
  return (
    <RewardWrapper>
      {reward.name}
      
    </RewardWrapper>
  )
}

const RewardWrapper = styled(Card)`
width: 80%;
`
export default Reward
