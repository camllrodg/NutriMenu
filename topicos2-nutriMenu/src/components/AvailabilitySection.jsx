import React, { useState, useEffect } from 'react';
import AvailabilityCard from './AvailabilityCard';
import { simulatedMenuData } from '../data/menuData';
import { realizarPedido } from '../services/capacidadService';

function AvailabilitySection(props){
  const { restaurantFilter } = props || {};

  // Only show the section when a restaurant has been selected via the "Solicitar pedido" button
  if (!restaurantFilter) return null;

  const [visibleItems, setVisibleItems] = useState([]);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    const v = simulatedMenuData.filter(item => item.isPublished && item.restaurant === restaurantFilter);
    setVisibleItems(v);
  }, [restaurantFilter]);

  if (!visibleItems || visibleItems.length === 0) return null;

  return (
    <section className="w-full px-12 py-8">
      <h2 className="text-3xl font-bold">Estados de Disponibilidad</h2>
      <p className="text-sm text-gray-600 max-w-2xl mt-2">Visualización de los estados de interacción para la verificación de capacidad en comedores. El sistema informa sobre la disponibilidad de mesas en tiempo real.</p>

      <div className="flex flex-wrap gap-6 mt-6">
        {visibleItems.map(item => (
          <AvailabilityCard
            key={item.id}
            id={item.id}
            restaurant={item.restaurant}
            imageURL={item.imageURL}
            capacity={item.capacity}
            currentAforo={item.currentAforo}
            processing={processingId === item.id}
            onOrder={async (id) => {
              try {
                setProcessingId(id);
                const updated = await realizarPedido(id);
                // refresh visible items from source data
                const refreshed = simulatedMenuData.filter(i => i.isPublished && i.restaurant === restaurantFilter);
                setVisibleItems(refreshed);
                alert('Pedido realizado correctamente');
              } catch (err) {
                alert(err.message || 'Error al realizar pedido');
              } finally {
                setProcessingId(null);
              }
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default AvailabilitySection;
