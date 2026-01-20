import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MenuSection from '../components/MenuSection';
import AvailabilitySection from '../components/AvailabilitySection';
import ControlesAlertas from '../components/ControlesAlertas';
import { verificarDisponibilidad } from '../services/capacidadService';

function ClientPanel() {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [loadingId, setLoadingId] = useState(null);

    const navigate = useNavigate();

    const handleRequestAvailability = async ({ id, restaurant, dish }) => {
        // show spinner on the clicked card + full-screen overlay
        setLoadingId(id);

        try {
            // call capacity service (simulated delay)
            await verificarDisponibilidad(dish);
            // navigate to availability page, pass restaurant in state
            navigate('/availability', { state: { restaurant, allowTakeaway: false } });
        } catch (err) {
            const msg = err?.message || '';
            const low = msg.toLowerCase();
            // If local is full, still navigate to availability page and allow takeaway
            if (low.includes('local lleno') || low.includes('capacidad')) {
                navigate('/availability', { state: { restaurant, allowTakeaway: true } });
            // If plato sin disponibilidad (stock 0), still navigate to availability to show 'No disponible'
            } else if (low.includes('sin disponibilidad') || low.includes('sin stock') || low.includes('plato seleccionado sin disponibilidad')) {
                navigate('/availability', { state: { restaurant, allowTakeaway: false } });
            } else {
                alert(msg || 'Error al verificar disponibilidad');
            }
        } finally {
            setLoadingId(null);
        }
    };

    return(
        <>
            <Header />
            <div className="min-h-screen bg-gray-100 px-12 py-8 flex flex-col gap-8 items-center">
                <ControlesAlertas />
                <MenuSection onRequestAvailability={handleRequestAvailability} loadingId={loadingId} />
                {/* AvailabilitySection is now a separate page; keep it out from here */}
            </div>

            {loadingId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
                        <div className="w-20 h-20 border-8 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                        <div className="text-lg font-semibold">Verificando disponibilidad...</div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ClientPanel;