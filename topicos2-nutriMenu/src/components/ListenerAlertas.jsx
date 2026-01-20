import { useEffect, useState } from 'react';
import { notificationService } from '../services/alertasService';
import AlertaDisplay from './AlertaDisplay';

const ListenerAlertas = () => {
    const [alerta, setAlerta] = useState(null);

    useEffect(() => {
        const unsubscribe = notificationService.subscribe((data) => {
            setAlerta(data);
        });
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <AlertaDisplay alerta={alerta} onClose={() => setAlerta(null)} />
        </div>
    );
};

export default ListenerAlertas;