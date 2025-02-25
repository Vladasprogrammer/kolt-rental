export default function Stats({ scooters }) {
    const totalKm = scooters.reduce((sum, s) => sum + s.totalRideKilometres, 0);
  
    return (
      <div>
        <p>Bendras paspirtukų kiekis: {scooters.length}</p>
        <p>Viso nuvažiuota km: {totalKm.toFixed(2)}</p>
      </div>
    );
  }
  