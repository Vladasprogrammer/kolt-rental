import { useState } from "react";
import './styles/EditModal.css';


export default function EditModal({ scooter, onSave, onClose }) {
  const [newData, setNewData] = useState({
    newUseTime: '',
    newKilometers: '',
    isBusy: scooter.isBusy
  });

  const doChange = e => {
    const { name, value, type, checked } = e.target;
    setNewData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const doSubmit = e => {
    e.preventDefault();
    onSave({
      ...scooter,
      lastUseTime: newData.newUseTime || scooter.lastUseTime,
      totalRideKilometers: (scooter.totalRideKilometers) + (newData.newKilometers || 0),
      isBusy: newData.isBusy
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Redaguoti paspirtuką</h2>
        <form >
          <p><span>Registracijos kodas:</span><span className='dots' /><span>{scooter.registrationCode}</span></p>

          <p><span>Paskutinio naudojimo data:</span><span className='dots' /><span>{scooter.lastUseTime}</span></p>

          <label>Pakeisti į naują datą:
            <input
            type="date" 
            name="newUseTime" 
            value={newData.newUseTime} 
            onChange={doChange} />
          </label>

          <p><span>Bendras kilometražas:</span><span className='dots' /><span>{scooter.totalRideKilometers} km</span></p>

          <label>Šiandien nuvažiuoti km:
            <input
              type="number"
              name="newKilometers"
              min="0"
              placeholder="Įrašykite km"
              value={newData.newKilometers}
              onChange={doChange}
            />
          </label>

          <p><span>Užimtumas:</span><span className='dots' />
            <span>
              {scooter.isBusy ? 'Užimtas' : 'Laisvas'}
            </span>
          </p>

          <label>Pakeisti būseną į užimtą?
            <input
              type="checkbox"
              name="isBusy"
              checked={newData.isBusy}
              onChange={doChange} />
          </label>

          <div className="buttons">
            <button type="submit" className="save-btn" onClick={doSubmit}>Išsaugoti</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Atšaukti</button>
          </div>
        </form>
      </div>
    </div>
  );
}