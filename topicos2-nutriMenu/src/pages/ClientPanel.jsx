import React, { useState } from 'react';
import Header from '../components/Header';
import MenuSection from '../components/MenuSection';
import AvailabilitySection from '../components/AvailabilitySection';
import { verificarDisponibilidad } from '../services/capacidadService';

function ClientPanel() {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [loadingId, setLoadingId] = useState(null);

    const handleRequestAvailability = async ({ id, restaurant, dish }) => {
        // show spinner on the clicked card
        setLoadingId(id);

        try {
            // call capacity service (simulated 2s delay inside)
            await verificarDisponibilidad(dish);
            // if resolves, show availability section for this restaurant
            setSelectedRestaurant(restaurant);
        } catch (err) {
            // show error to user
            alert(err.message || 'Error al verificar disponibilidad');
        } finally {
            setLoadingId(null);
        }
    };

    return(
        <>
            <Header />
            <div className="min-h-screen bg-gray-100 px-12 py-8 flex flex-col gap-8 items-center">
                <MenuSection onRequestAvailability={handleRequestAvailability} loadingId={loadingId} />
                <AvailabilitySection restaurantFilter={selectedRestaurant} />
            </div>
        </>
    )
}

export default ClientPanel;