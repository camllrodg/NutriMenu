import { simulatedMenuData } from '../data/menuData'; //Importamos los datos de la app

class AlertaService {
    constructor() {
        this.callback = null; //Callback único para simplificar
        this._intervalId = null;
        this._lastHourEmitted = null;
        // Alarmas reales configurables: por defecto solo 12:00 y 16:00
        this.realAlarms = [
            { hour: 5, message: '¡Ya puedes ver el menú de hoy en NutriMenu!' },
            { hour: 16, message: '¡Ofertas de cierre! Revisa los descuentos de última hora.' }
        ];
        this.currentAlert = null; //Alerta actual persistente
        this.subscribers = new Set();
    }
    
    subscribe(callback) {
        this.subscribers.add(callback);
        if (this.currentAlert) {
            try { callback(this.currentAlert); } catch (e) {}
        }

        return () => {
            try { this.subscribers.delete(callback); } catch (e) {}
        };
    }

    //Registrar una alarma real (por hora)
    addRealAlarm(hour, message) {
        const h = parseInt(hour, 10);
        if (Number.isNaN(h)) return;
        this.realAlarms.push({ hour: h, message: message });
    }

    removeRealAlarm(hour) {
        const h = parseInt(hour, 10);
        if (Number.isNaN(h)) return;
        this.realAlarms = this.realAlarms.filter(a => a.hour !== h);
    }

    //POE: Emisor de eventos 
    emitAlert(message, ts = null) {
        const payload = { text: message, ts: ts || new Date().toISOString() };
        // Log en consola siempre que se emite una alerta
        try { console.log(`[AlertaService] ${new Date(payload.ts).toLocaleString()} - ${payload.text}`); } catch (e) {}
        this.currentAlert = payload;
        for (const cb of Array.from(this.subscribers)) {
            try { cb(payload); } catch (e) {}
        }
    }

    //Limpia la alerta en el listener (envía null)
    clearAlert() {
        this.currentAlert = null;
        for (const cb of Array.from(this.subscribers)) {
            try { cb(null); } catch (e) {}
        }
    }

    //El Scheduler: Revisa condiciones de tiempo (usa la hora real del sistema)
    checkConditions() {
        const now = new Date();
        const currentHour = now.getHours();

        if (this._lastHourEmitted !== currentHour) {
            //Emitir las alarmas reales configuradas (ej: 12 y 16 por defecto)
            let alarmEmitted = false;
            for (const alarm of this.realAlarms) {
                if (alarm.hour === currentHour) {
                    alarmEmitted = true;
                    this.emitAlert(alarm.message);
                }
            }

            this._lastHourEmitted = currentHour;
        }
    }

    startScheduler(ms = 5000) {
        this.stopScheduler();
        this.checkConditions();
        this._intervalId = setInterval(() => {
            this.checkConditions();
        }, ms);
        console.log(`[AlertaService] Scheduler activo revisando condiciones cada ${ms}ms...`);
    }

    stopScheduler() {
        if (this._intervalId) {
            clearInterval(this._intervalId);
            this._intervalId = null;
        }
    }
}

export const notificationService = new AlertaService();

//Iniciar scheduler automáticamente: comprobar cada minuto
try {
    notificationService.startScheduler(60000);
} catch (e) {}


