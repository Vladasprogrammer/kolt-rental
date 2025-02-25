const STORAGE_KEY = "scooters";

// Gauti paspirtukus iš localStorage
export function loadScooters() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Išsaugoti paspirtukus į localStorage
export function saveScooters(scooters) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scooters));
}
