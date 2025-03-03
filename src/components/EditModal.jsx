import { useState } from "react";

export default function EditModal({ scooter, onSave, onClose }) {
  const [date, setDate] = useState(scooter.lastUseTime);
  const [kilometers, setKilometers] = useState(scooter.totalRideKilometers);

  const handleSubmit = e => {
    e.preventDefault();
    if (!date || kilometers < 0) return;

    onSave(scooter.id, { lastUseTime: date, totalRideKilometers: kilometers});
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Redaguoti paspirtuką</h2>
        <form onSubmit={handleSubmit}>
          <label>Data:</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          <label>Kilometrai:</label>
          <input type="number" min='0' value={kilometers} onChange={e => setKilometers(parseFloat(e.target.value) || 0)} />
          <button type="submit">Išsaugoti</button>
          <button type="button" onClick={onClose}>Atšaukti</button>
        </form>
      </div>
    </div>
  );
}
