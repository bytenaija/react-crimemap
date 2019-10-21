import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const IncidentThumbnail = ({ incident, color }) => {
  return (
    <IncidentWrapper color={color} href={`/incident/${incident._id}`}>
      <h4>{incident.type}</h4>
      <h6>{incident.address}</h6>
      <div>
        <Icon name="eye" />
        <span>{incident.viewCount.length}</span>
      </div>
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


export default IncidentThumbnail;
