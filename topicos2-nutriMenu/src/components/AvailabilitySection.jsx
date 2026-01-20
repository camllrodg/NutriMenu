import React from 'react';
import AvailabilityCard from './AvailabilityCard';
import { simulatedMenuData } from '../data/menuData';

function AvailabilitySection(props){
  const { restaurantFilter } = props || {};

  // Only show the section when a restaurant has been selected via the "Solicitar pedido" button
  if (!restaurantFilter) return null;

  const visible = simulatedMenuData.filter(item => item.isPublished && item.restaurant === restaurantFilter);

  if (visible.length === 0) return null;

  return (
    <section className="w-full px-12 py-8">
      <h2 className="text-3xl font-bold">Estados de Disponibilidad</h2>
      <p className="text-sm text-gray-600 max-w-2xl mt-2">Visualización de los estados de interacción para la verificación de capacidad en comedores. El sistema informa sobre la disponibilidad de mesas en tiempo real.</p>

      <div className="flex flex-wrap gap-6 mt-6">
        {visible.map(item => (
          <AvailabilityCard
            key={item.id}
            restaurant={item.restaurant}
            imageURL={item.imageURL}
            capacity={item.capacity}
            currentAforo={item.currentAforo}
          />
        ))}
      </div>
    </section>
  );
}

export default AvailabilitySection;
