import React from 'react';

export default function Stats({ freeScooters }) {
  const totalScooters = freeScooters.length;
  const totalKilometers = freeScooters.reduce((acc, scooter) => acc + scooter.totalRideKilometers, 0);

  return (
    <div className="stats">
      <p><strong>Total Scooters:</strong><span className='dots'></span> {totalScooters}</p>
      <p><strong>Total Kilometers:</strong><span className='dots'></span> {totalKilometers.toFixed(2)} km</p>
    </div>
  );
}
