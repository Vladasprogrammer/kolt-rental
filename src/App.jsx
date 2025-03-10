import { useEffect, useState } from 'react';
import './App.css';
import { getScooters, saveScooters } from './utils/localStorageUtils';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Form from './components/Form';
import List from './components/List';
import EditModal from './components/EditModal';
import Stats from './components/Stats';
import Sort from './components/Sort';


export default function App() {
  const [scooters, setScooters] = useState(getScooters());
  const [editingScooter, setEditingScooter] = useState(null);
  const [sortOrder, setSortOrder] = useState({ sortBy: 'id', direction: 'asc' });

  const sortScooters = (scooters, sortBy, direction) => {
    return [...scooters].sort((a, b) => {
      if (sortBy === 'id') {
        return direction === 'asc' ? a.id - b.id : b.id - a.id;
      }
      if (sortBy === 'lastUseTime') {
        return direction === 'asc'
          ? new Date(a.lastUseTime) - new Date(b.lastUseTime)
          : new Date(b.lastUseTime) - new Date(a.lastUseTime);
      }
      if (sortBy === 'totalRideKilometers') {
        return direction === 'asc'
          ? a.totalRideKilometers - b.totalRideKilometers
          : b.totalRideKilometers - a.totalRideKilometers;
      }
      return 0;
    });
  };

  const freeScooters = scooters.filter(scooter => !scooter.isBusy);

  const sortedScooters = sortScooters(scooters, sortOrder.sortBy, sortOrder.direction);

  const handleSort = (property) => {
    setSortOrder(prevState => {
      const direction = prevState.sortBy === property && prevState.direction === 'asc' ? 'desc' : 'asc';
      return { sortBy: property, direction };
    });
  };

  useEffect(_ => {
    saveScooters(scooters);
  }, [scooters]);

  const doDelete = id => {
    const updatedScooters = scooters.filter(scooter => scooter.id !== id);
    setScooters(updatedScooters);
    toast.success('Paspirtukas sekmingai ištrintas!');
  };

  const doEdit = scooter => {
    setEditingScooter(scooter);
  };

  const doUpdateScooter = updatedScooter => {
    setScooters(scooters.map(scooter =>
      scooter.id === updatedScooter.id ? updatedScooter : scooter
    ));
    setEditingScooter(null);
    toast.success('Paspirtukas sekmingai atnaujintas!');
  };

  return (
    <div className='container'>
      <h1>Paspirtukų nuoma</h1>
      <div className='column'>
        <Form onAdd={setScooters} />
        <div className='column2'>
            <Stats freeScooters={freeScooters} />
            <Sort onSort={handleSort} />
        </div>
      </div>

      <List
        scooters={sortedScooters}
        onEdit={doEdit}
        onDelete={doDelete}
      />

      {editingScooter &&
        (
          <EditModal
            scooter={editingScooter}
            onSave={doUpdateScooter}
            onClose={_ => setEditingScooter(null)}
          />
        )
      }
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
