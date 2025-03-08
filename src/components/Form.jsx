import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLastId, getScooters, saveLastId, saveScooters } from "../utils/localStorageUtils";
import { Scooter } from "../models/Scooter";
import generateRegCode from "../functions/GenerateCode";
import { vDate } from "../functions/vDate";
import { vKilometers } from "../functions/vKilometers";

export default function Form({ onAdd }) {

  const [newScooter, setNewScooter] = useState(_ =>
    new Scooter(getLastId(), generateRegCode(), false, '', '')
  );

  const handleSubmit = e => {
    e.preventDefault();

    const date = vDate(newScooter.lastUseTime);
    const kilometers = vKilometers(Number(newScooter.totalRideKilometers));
    
    if (!date.valid) {
      toast.error(date.message);
      return;
    }
    if (!kilometers.valid) {
      toast.error(kilometers.message);
      return;
    }

    const updatedScooters = [...getScooters(), newScooter];

    saveScooters(updatedScooters);
    onAdd(updatedScooters);

    const updatedId = newScooter.id + 1;
    saveLastId(updatedId);

    setNewScooter(new Scooter(updatedId, generateRegCode(), false, '', ''));

    toast.success('Valio, paspirtukas pridėtas!');

  };

  
  return (
    <>
      <fieldset>
        <legend>Naujas paspirtukas</legend>
        <div className="form">
          <label>ID: {newScooter.id}</label>
          <label>Registracijos kodas: {newScooter.registrationCode}</label>
          <label>Būsena: {newScooter.isBusy ? 'Užimtas' : 'Laisvas'}</label>
          <label>Data: <input
            type="date"
            value={newScooter.lastUseTime}
            onChange={e => setNewScooter(prev => new Scooter(
              prev.id,
              prev.registrationCode,
              prev.isBusy,
              e.target.value,
              prev.totalRideKilometers))} />
          </label>
          <label>Kilometrai:<input
            type="number"
            placeholder="0"
            value={newScooter.totalRideKilometers}
            onChange={e => setNewScooter(prev => new Scooter(
              prev.id,
              prev.registrationCode,
              prev.isBusy,
              prev.lastUseTime,
              parseFloat(e.target.value)))} />
          </label>
        </div>
        <button onClick={handleSubmit}>Pridėti paspirtuką</button>
      </fieldset>
    </>
  );
}
