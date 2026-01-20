import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AvailabilitySection from '../components/AvailabilitySection';

function AvailabilityPage(){
  const location = useLocation();
  const navigate = useNavigate();
  const restaurant = location.state?.restaurant || null;
  const allowTakeaway = location.state?.allowTakeaway || false;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 px-12 py-8">
        <div className="max-w-5xl">
          <div className="mb-6 px-12">
            <button onClick={() => navigate('/client-panel')} className="mb-2 bg-emerald-700 text-white px-4 py-2 rounded">Volver al Menú</button>
          </div>
          <div className="ml-0">
            <AvailabilitySection restaurantFilter={restaurant} allowTakeaway={allowTakeaway} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AvailabilityPage;
