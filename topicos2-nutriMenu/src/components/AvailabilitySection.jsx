import React, { useState, useEffect } from 'react';
import AvailabilityCard from './AvailabilityCard';
import { simulatedMenuData } from '../data/menuData';
import { realizarPedido } from '../services/capacidadService';

function AvailabilitySection(props){
  const { restaurantFilter, allowTakeaway = false } = props || {};

  // Only show the section when a restaurant has been selected via the "Solicitar pedido" button
  if (!restaurantFilter) return null;

  const [visibleItems, setVisibleItems] = useState([]);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    if (!restaurantFilter) {
      setVisibleItems([]);
      return;
    }

    // Find the restaurant item even if it's not published or has no availability
    const item = simulatedMenuData.find(i => i.restaurant === restaurantFilter);
    if (item) {
      setVisibleItems([item]);
    } else {
      setVisibleItems([]);
    }
  }, [restaurantFilter]);

  // Always render the section when a restaurant has been selected (even if no availability)
  if (!restaurantFilter) return null;

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
            stock={item.stock}
            allowTakeaway={allowTakeaway}
            processing={processingId === item.id}
            onOrder={async (id, options = { takeaway: false }) => {
              try {
                setProcessingId(id);
                const updated = await realizarPedido(id, options);
                // refresh visible items from source data
                // Refresh the single item (may not be published)
                const refreshedItem = simulatedMenuData.find(i => i.restaurant === restaurantFilter);
                setVisibleItems(refreshedItem ? [refreshedItem] : []);
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
