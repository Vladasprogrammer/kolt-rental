export const getScooters = _ => {
  return JSON.parse(localStorage.getItem('scooters')) || [];
};

export const saveScooters = scooters => {
  localStorage.setItem('scooters', JSON.stringify(scooters));
  
};