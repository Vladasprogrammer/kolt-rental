import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLastId, getScooters, saveLastId, saveScooters } from "../utils/localStorageUtils";
import { Scooter } from "../models/Scooter";
import generateRegCode from "../functions/GenerateCode";
import { vDate } from "../functions/vDate";
import { vKilometers } from "../functions/vKilometers";
import './styles/Form.css';

export default function Form({ onAdd }) {

  const [newScooter, setNewScooter] = useState(_ =>
    new Scooter(getLastId(), generateRegCode(), false, '', '')
  );

  const doChange = e => {
    const { name, value, type } = e.target;
    
    setNewScooter(prev => {
      let updatedValue = type === "number" ? (value) || 0 : value;

      if (name === "totalRideKilometers") {
        updatedValue = parseFloat(updatedValue).toFixed(2);
      }

      return new Scooter(
        prev.id,
        prev.registrationCode,
        prev.isBusy,
        name === "lastUseTime" ? updatedValue : prev.lastUseTime,
        name === "totalRideKilometers" ? updatedValue : prev.totalRideKilometers
      );
    });
  };

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

    const formattedScooter = new Scooter(
      newScooter.id,
      newScooter.registrationCode,
      newScooter.isBusy,
      newScooter.lastUseTime,
      parseFloat(newScooter.totalRideKilometers || 0).toFixed(2)
    );
    
    const updatedScooters = [...getScooters(), formattedScooter];

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
          <label>Data:<input
            type="date"
            name="lastUseTime"
            value={newScooter.lastUseTime}
            onChange={doChange} />
          </label>
          <label>Kilometrai:<input
            type="number"
            name="totalRideKilometers"
            placeholder="0"
            value={newScooter.totalRideKilometers}
            onChange={doChange} />
          </label>
        </div>
        <button onClick={handleSubmit}>Pridėti paspirtuką</button>
      </fieldset>
    </>
  );
}
