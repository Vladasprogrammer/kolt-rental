import ScooterItem from "./ScooterItem";

export default function ScooterList({ scooters, setScooters }) {
  const handleDelete = (id) => {
    const updatedScooters = scooters.filter((s) => s.id !== id);
    setScooters(updatedScooters);
    localStorage.setItem("scooters", JSON.stringify(updatedScooters));
  };

  return (
    <div>
      {scooters.map((scooter) => (
        <ScooterItem key={scooter.id} scooter={scooter} onDelete={handleDelete} />
      ))}
    </div>
  );
}
