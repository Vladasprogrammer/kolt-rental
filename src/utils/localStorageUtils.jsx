// Scooters
export const getScooters = _ => {
  return JSON.parse(localStorage.getItem('scooters')) || [];
};

export const saveScooters = scooters => {
  localStorage.setItem('scooters', JSON.stringify(scooters));
};

// ID saugojimas
export const getLastId = _ => {
  const lastId = JSON.parse(localStorage.getItem('lastId'));
  return lastId !== null ? lastId : 1;
};

export const saveLastId = id => {
  localStorage.setItem('lastId', JSON.stringify(id));
};
