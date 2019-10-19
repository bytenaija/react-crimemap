import React from "react";
import { Card, CardContent } from "semantic-ui-react";
import styled from "styled-components";

export const CrimeList = ({ crime }) => {
  return (
    <CardView>
      <CardContent>
        <h2>Type: {crime.type}</h2>
      </CardContent>
    </CardView>
  );
};

const CardView = styled(Card)`
  &&&& {
    width: 30%;
    min-width: 30%;
    height: 100px;
    box-shadow: 1px 1px 10px black;
    padding: .5rem;
  }
`;


