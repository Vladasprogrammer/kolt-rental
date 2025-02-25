export default function ScooterItem({ scooter, onDelete }) {
    return (
      <div>
        <p><strong>Registracijos kodas:</strong> {scooter.registrationCode}</p>
        <p><strong>Paskutinio naudojimo data:</strong> {scooter.lastUseTime}</p>
        <p><strong>Nuvažiuoti km:</strong> {scooter.totalRideKilometres}</p>
        <button onClick={() => onDelete(scooter.id)}>Trinti</button>
      </div>
    );
  }
  