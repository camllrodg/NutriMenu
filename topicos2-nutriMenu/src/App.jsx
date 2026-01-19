import { useEffect, useState } from 'react';
import { notificationService } from './services/alertasService';

function App() {
  const [alerta, setAlerta] = useState(null);
  const [schedulerRunning, setSchedulerRunning] = useState(false);

  useEffect(() => {
    const unsubscribe = notificationService.subscribe((mensaje) => {
      setAlerta(mensaje);
    });

    return () => {
      if (unsubscribe) unsubscribe();
      notificationService.stopScheduler();
    };
  }, []);

  //Botón 1: Simular Evento (prueba del listener)
  const handleSimulateEvent = () => {
    notificationService.forceTestAlert();
  };

  //Botón 2: Control del Scheduler (iniciar/detener). 
  const toggleScheduler = () => {
    if (schedulerRunning) {
      notificationService.stopScheduler();
      setSchedulerRunning(false);
    } else {
      notificationService.startScheduler(5000, true);
      setSchedulerRunning(true);
    }
  };

  //Botón 3: Simular hora 16:00
  const handleSimulateCierre = () => {
    notificationService.simulateTime("16:00");
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: '720px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', margin: '0 auto' }}>
        <h1 style={{ margin: '0 0 12px 0' }}>NutriMenu UCAB</h1>

        {/* Sección de Notificaciones Dinámicas */}
        {alerta && (
          <div style={{ background: '#d4edda', color: '#000', padding: '12px', marginBottom: '16px', borderRadius: '6px' }}>
            <strong>Alerta POE:</strong>
            <div style={{ marginTop: '6px' }}>{alerta.text}</div>
            <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
              <small style={{ color: '#333' }}>{new Date(alerta.ts).toLocaleTimeString()}</small>
              <button onClick={() => setAlerta(null)}>Cerrar</button>
            </div>
          </div>
        )}

        {/* Panel con los 3 botones de prueba */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
          <button onClick={handleSimulateEvent}>Simular Evento (Prueba del Listener)</button>
          <button onClick={toggleScheduler}>{schedulerRunning ? 'Detener Scheduler' : 'Iniciar Scheduler (5s)'}</button>
          <button 
            onClick={handleSimulateCierre}
            style={{ backgroundColor: '#fff3cd', border: '1px solid #ffeeba', color: '#856404' }}
          >
            Simular 4:00 PM (Cierre)
          </button>
        </div>

        <div style={{ marginTop: '12px' }}>
          <small>{schedulerRunning ? 'Scheduler activo (comprobando cada 5s).' : 'Scheduler detenido.'}</small>
        </div>
      </div>
    </div>
  );
}

export default App;
