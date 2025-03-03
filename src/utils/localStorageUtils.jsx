export const getScooters = _ => {
  return JSON.parse(localStorage.getItem('scooters')) || [];
};

export const saveScooters = scooters => {
  localStorage.setItem('scooters', JSON.stringify(scooters));
};

export const getLastId = _ => {
  return JSON.parse(localStorage.getItem('lastId') || 1);
};

export const saveLastId = id => {
  localStorage.setItem('lastId', JSON.stringify(id));
};