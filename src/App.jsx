import { useEffect, useState } from 'react';
import './App.css';
import { getScooters, saveScooters } from './utils/localStorageUtils';


export default function App() {

  const [scooters, setScooters] = useState([]);


  useEffect(_ => {
    const storedScooters = getScooters();
    setScooters(storedScooters);
  }, []);

  const handleAddScooter = _ => {

    const newScooter = {
      id: Date.now(),
      regCode: 'ABC-123',
      isBusy: false,
      lastUseTime: 'Nėra',
      totalKm: 0
    };

    const updatedScooters = [...scooters, newScooter];

    setScooters(updatedScooters);
    saveScooters(updatedScooters);
  };

  const handleDeleteScooter = id => {
    const updatedScooters = scooters.filter(scooter => scooter.id !== id);
    setScooters(updatedScooters);
    saveScooters(updatedScooters);
  };

  const handleEditScooter = (id, updatedData) => {
    const updatedScooters = scooters.map(scooter => scooter.id === id ? { ...scooter, ...updatedData } : scooter );
    setScooters(updatedScooters);
    saveScooters(updatedScooters);
  }


  return (
    <div className='container'>

      <h1>Paspirtukų nuoma</h1>
      <button onClick={handleAddScooter}>Pridėti paspirtuką</button>

      <div>
        {scooters.length === 0 ? (
          <p>Nėra paspirtukų</p>
        ) : (
          scooters.map(scooter => (
            <div key={scooter.id} className="scooter-card">
              <p>Registracijos kodas: {scooter.regCode}</p>
              <p>Būsena: {scooter.isBusy ? 'Užimtas' : 'Laisvas'}</p>
              <p>Paskutinio naudojimo data: {scooter.lastUseTime}</p>
              <p>Nuvažiuota km: {scooter.totalKm}</p>
              <div>
                <button onClick={_ => handleEditScooter(scooter.id, { isBusy: !scooter.isBusy })}>Redaguoti</button>
                <button onClick={_ => handleDeleteScooter(scooter.id)}>Trinti</button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}