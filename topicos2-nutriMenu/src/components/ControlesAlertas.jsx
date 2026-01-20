import { useState } from 'react';
import { notificationService } from '../services/alertasService';
import ListenerAlertas from './ListenerAlertas';

// Controles: solo botones; la lógica de suscripción está en ListenerAlertas
const ControlesAlertas = () => {
    const [running, setRunning] = useState(false);

    const toggleScheduler = () => {
        if (running) {
            notificationService.stopScheduler();
            setRunning(false);
        } else {
            notificationService.startScheduler(5000);
            setRunning(true);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', width: '100%', maxWidth: 720 }}>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button onClick={() => notificationService.forceTestAlert()}>Probar Listener</button>
                <button onClick={toggleScheduler}>{running ? 'Detener Reloj' : 'Iniciar Reloj (5s)'}</button>
                <button onClick={() => notificationService.emitAlert('¡Oferta de cierre!')}>Simular 4:00 PM</button>
            </div>

            <div style={{ minHeight: 72, display: 'flex', justifyContent: 'center' }}>
                <ListenerAlertas />
            </div>
        </div>
    );
};

export default ControlesAlertas;