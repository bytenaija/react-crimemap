import React from 'react';

export const CrimeList = ({crime}) => {
  return (
    <div>
      <h2>Type: {crime.type}</h2>
    </div>
  )
}