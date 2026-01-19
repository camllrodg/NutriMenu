import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AvailabilitySection from '../components/AvailabilitySection';

function AvailabilityPage(){
  const location = useLocation();
  const navigate = useNavigate();
  const restaurant = location.state?.restaurant || null;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 px-12 py-8">
        <div className="max-w-5xl">
          <div className="ml-0">
            <AvailabilitySection restaurantFilter={restaurant} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AvailabilityPage;
