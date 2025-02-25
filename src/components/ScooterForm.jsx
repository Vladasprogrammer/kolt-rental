import { useState } from "react";

function generateCode() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export default function ScooterForm({ onAdd }) {
  const [lastUseTime, setLastUseTime] = useState("");
  const [totalRideKilometres, setTotalRideKilometres] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!lastUseTime || !totalRideKilometres) return;

    const newScooter = {
      id: Date.now(),
      registrationCode: generateCode(),
      isBusy: 0,
      lastUseTime,
      totalRideKilometres: parseFloat(totalRideKilometres),
    };

    onAdd(newScooter);
    setLastUseTime("");
    setTotalRideKilometres("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        value={lastUseTime}
        onChange={(e) => setLastUseTime(e.target.value)}
        required
      />
      <input
        type="number"
        step="0.01"
        value={totalRideKilometres}
        onChange={(e) => setTotalRideKilometres(e.target.value)}
        required
      />
      <button type="submit">Pridėti</button>
    </form>
  );
}
