import { simulatedMenuData } from '../data/menuData'; //Importamos los datos de la app

class AlertaService {
    constructor() {
        this.callback = null; //Callback único para simplificar
        this._intervalId = null; //ID del intervalo del scheduler
        this._lastHourEmitted = null;
        //Alarmas reales configurables: por defecto solo 12:00 y 16:00
        this.realAlarms = [
            { hour: 12, message: '¡Ya puedes ver el menú de hoy en NutriMenu!' },
            { hour: 16, message: '¡Ofertas de cierre! Revisa los descuentos de última hora.' }
        ];
        this.stockThreshold = 5; //Umbral para considerar stock bajo
        this._lastStockEmittedHour = null;
    }
    
    subscribe(callback) {
        this.callback = callback;
        return () => {
            if (this.callback === callback) this.callback = null;
        };
    }

    //Registrar una alarma real (por hora)
    addRealAlarm(hour, message) {
        const h = parseInt(hour, 10);
        if (Number.isNaN(h)) return;
        this.realAlarms.push({ hour: h, message: message });
    }

    //Eliminar alarmas por hora (quita todas las que coincidan)
    removeRealAlarm(hour) {
        const h = parseInt(hour, 10);
        if (Number.isNaN(h)) return;
        this.realAlarms = this.realAlarms.filter(a => a.hour !== h);
    }

    //POE: Emisor de eventos 
    emitAlert(message, ts = null) {
        const payload = { text: message, ts: ts || new Date().toISOString() };
        if (this.callback) this.callback(payload);
    }

    //Limpia la alerta en el listener (envía null)
    clearAlert() {
        if (this.callback) this.callback(null);
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

            //Si no se emitió ninguna alarma por hora, revisar stock bajo en los datos simulados
            if (!alarmEmitted) {
                const lowStock = (simulatedMenuData || []).filter(it => typeof it.stock === 'number' && it.stock < this.stockThreshold);
                if (lowStock.length > 0 && this._lastStockEmittedHour !== currentHour) {
                    const names = lowStock.map(i => `${i.dish} (${i.stock})`).slice(0, 4).join(', ');
                    const msg = `Atención: stock bajo en: ${names}. Revisa disponibilidad.`;
                    this.emitAlert(msg);
                    this._lastStockEmittedHour = currentHour;
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


