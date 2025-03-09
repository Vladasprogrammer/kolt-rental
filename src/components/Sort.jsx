import React from 'react';

export default function Sort({ onSort }) {
  const handleSort = (property) => {
    onSort(property);
  };

  return (
    <div className="sort-buttons">
      <button onClick={_ => handleSort('id')}>Sort by ID</button>
      <button onClick={_ => handleSort('lastUseTime')}>Sort by Date</button>
      <button onClick={_ => handleSort('totalRideKilometers')}>Sort by Kilometers</button>
    </div>
  );
}
