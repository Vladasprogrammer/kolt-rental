export default function List({ scooters, onEdit, onDelete }) {
  if (scooters.length === 0) {
    return <p>Nėra paspirtukų</p>;
  }

  return (
    <div className='content'>
      {scooters.map(scooter => (
        <div key={scooter.id} className="scooter-card">
          <p><span className='id'>ID: {scooter.id}</span></p>
          <p><span className='key'>Registracijos kodas:</span><span className='dots'></span><span className='value'>{scooter.registrationCode}</span></p>
          <p><span className='key'>Būsena:</span><span className='dots'></span><span className='value'>{scooter.isBusy ? 'Užimtas' : 'Laisvas'}</span></p>
          <p><span className='key'>Paskutinio naudojimo data:</span><span className='dots'></span><span className='value'>{scooter.lastUseTime}</span></p>
          <p><span className='key'>Nuvažiuota km:</span><span className='dots'></span><span className='value'>{scooter.totalRideKilometers}</span></p>
          <div className='btn'>
            <button onClick={() => onEdit(scooter.id, { isBusy: !scooter.isBusy })}>Redaguoti</button>
            <button onClick={() => onDelete(scooter.id)}>Trinti</button>
          </div>
        </div>
      ))}
    </div>
  );
}
