import { useState, useEffect } from "react";
import ScooterList from "./components/ScooterList";
import ScooterForm from "./components/ScooterForm";
import Stats from "./components/Stats";
import { loadScooters, saveScooters } from "./utils/localStorageUtils";

function App() {
  const [scooters, setScooters] = useState([]);

  // Užkrauname duomenis iš localStorage
  useEffect(() => {
    setScooters(loadScooters());
  }, []);

  // Pridedame naują paspirtuką
  const addScooter = (scooter) => {
    const newScooters = [...scooters, scooter];
    setScooters(newScooters);
    saveScooters(newScooters);
  };

  return (
    <div>
      <h1>Kolt paspirtukų nuoma</h1>
      <ScooterForm onAdd={addScooter} />
      <Stats scooters={scooters} />
      <ScooterList scooters={scooters} setScooters={setScooters} />
    </div>
  );
}

export default App;
