import { useEffect, useState } from 'react';
import './App.css';
import { getScooters, saveScooters } from './utils/localStorageUtils';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Form from './components/Form';
import List from './components/List';
import EditModal from './components/EditModal';
import { Scooter } from './models/Scooter';
import './form.css';

export default function App() {
  const [scooters, setScooters] = useState([]);
  const [modalData, setModalData] = useState(null);

  useEffect(_ => {

    const scooterObjects = getScooters().map(scooter =>
      new Scooter(scooter.id, scooter.lastUseTime, scooter.totalRideKilometers)
    );
    setScooters(scooterObjects);
  }, []);

  const addScooter = newScooterData => {

    const newScooter = new Scooter(
      newScooterData.date,
      newScooterData.kilometers
    );

    const updatedScooters = [...scooters, newScooter];
    setScooters(updatedScooters);
    saveScooters(updatedScooters);
  };

  const editScooter = (id, updatedData) => {
    const updatedScooters = scooters.map(scooter =>
      scooter.id === id ? { ...scooter, ...updatedData } : scooter
    );
    setScooters(updatedScooters);
    saveScooters(updatedScooters);
  };

  const deleteScooter = id => {
    const updatedScooters = scooters.filter(scooter => scooter.id !== id);
    setScooters(updatedScooters);
    saveScooters(updatedScooters);
  };

  const handleEditClick = scooter => {
    setModalData({ scooter, isOpen: true });
  };

  const handleCloseModal = _ => {
    setModalData(null);
  };

  return (
    <div className='container'>
      <h1>Paspirtukų nuoma</h1>
      <Form onAdd={addScooter} />
      <List
        scooters={scooters}
        onEdit={handleEditClick}
        onDelete={deleteScooter} />
      <ToastContainer position="top-right" autoClose={3000} />
      {modalData && modalData.isOpen && (
        <EditModal
          scooter={modalData.scooter}
          onSave={editScooter}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
