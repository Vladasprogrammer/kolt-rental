import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLastId, saveLastId } from "../utils/localStorageUtils";

export default function Form({ onAdd }) {
  const [date, setDate] = useState('');
  const [kilometers, setKilometers] = useState('');
  const idRef = useRef(getLastId());

  useEffect(_ => {
    idRef.current = getLastId();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    if (!date || !kilometers) {
      toast.error('Užpildyk laukelius, prašau!');
      return;
    }

    if (kilometers < 0) {
      toast.error('Kilometrai negali būti neigiami! (Nice try)');
      return;
    }

    const newScooter = {
      id: idRef.current,
      registrationCode: Math.random().toString(36).substr(2, 8).toUpperCase(),
      isBusy: 0,
      lastUseTime: date,
      totalRideKilometers: parseFloat(kilometers),
    };

    onAdd(newScooter);

    idRef.current += 1;
    saveLastId(idRef.current);

    toast.success('Valio, paspirtukas pridėtas!');
    setDate('');
    setKilometers('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Naujas paspirtukas</legend>
          <label>Data:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <label>Kilometrai:</label>
          <input type="number" value={kilometers} onChange={(e) => setKilometers(e.target.value)} />
          <button type="submit">Pridėti paspirtuką</button>
        </fieldset>
      </form>
    </>
  );
}
