import './styles/List.css';
import img from './images/transport.png';
import img2 from './images/Beaver.png';

export default function List({ scooters, onEdit, onDelete }) {

  if (scooters.length === 0) {
    return (
      <div>
        {/* <img src={img} alt="scooter" style={{ width: '200px' }} /> */}
        <img src={img2} alt="beaver" style={{ width: '200px'}} />
        <p>Sąraše paspirtukų nėra.</p>
      </div>
    );
  }

  return (
    <div className='content'>
      {scooters.map(scooter => (
        <div key={scooter.id} className="scooter-card">
          <p><span className='id'>ID: {scooter.id}</span></p>
          <p><span>Registracijos kodas:</span><span className='dots' /><span>{scooter.registrationCode}</span></p>
          <p><span>Būsena:</span><span className='dots' /><span>{scooter.isBusy ? 'Užimtas' : 'Laisvas'}</span></p>
          <p><span>Paskutinio naudojimo data:</span><span className='dots' /><span>{scooter.lastUseTime}</span></p>
          <p><span>Nuvažiuota km:</span><span className='dots' /><span>{scooter.totalRideKilometers}</span></p>
          <div className='btn'>
            <button onClick={_ => onEdit(scooter)}>Redaguoti</button>
            <button className='cancel-btn' onClick={_ => onDelete(scooter.id)}>Trinti</button>
          </div>
        </div>
      ))}
    </div>
  );
}
