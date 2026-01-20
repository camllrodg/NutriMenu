import { useState } from 'react';
import { notificationService } from '../services/alertasService';

const ControlesAlertas = () => {
    const [running, setRunning] = useState(false);

    const toggleScheduler = () => {
        if (running) {
            notificationService.stopScheduler();
            notificationService.clearAlert();
            setRunning(false);
        } else {
            notificationService.startScheduler(5000);
            setRunning(true);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', justifyContent: 'center' }}>
                <button 
                    onClick={toggleScheduler}
                    style={{ padding: '8px 16px', background: running ? '#ef4444' : '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                    {running ? 'Detener Vigilancia' : 'Iniciar Vigilancia (POE)'}
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                <small style={{ color: '#666' }}>Las alarmas se disparan según la hora real del sistema (12:00, 16:00 y alertas de stock).</small>
                <small style={{ color: '#666' }}>Para pruebas rápidas edita `this.realAlarms` en `src/services/alertasService.js` o usa `notificationService.addRealAlarm()` desde la consola.</small>
            </div>
        </div>
    );
};

export default ControlesAlertas;