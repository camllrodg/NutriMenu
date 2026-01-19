import { simulatedMenuData } from '../data/menuData'; //Importamos los datos de la app

class AlertaService {
    constructor() {
        this.listeners = []; //Lista de invitados
    }

    forceTestAlert() {
        const mensajeSimulado = "¡Promo Flash! 50% de descuento en ensaladas en el cafetín";
        this.emitAlert(mensajeSimulado);
    }

    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
        };
    }

    //POE: Emisor de eventos 
    emitAlert(message) {
        const payload = { text: message, ts: new Date().toISOString() };
        console.log("Evento disparado:", payload);
        this.listeners.forEach(callback => callback(payload));
    }

    //El Scheduler: Revisa condiciones de tiempo y stock
    checkConditions() {
        const now = new Date();
        const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

        //1. Alerta por Horario (Ejemplo: 12:00)
        if (time === "12:00") {
            this.emitAlert("¡Ya puedes ver el menú de hoy en NutriMenu!");
        }

        //2. Alerta por Stock Bajo
        simulatedMenuData.forEach(item => {
            if (item.stock < 5) {
                this.emitAlert(`¡Promo Flash! Solo quedan ${item.stock} unidades de ${item.dish}`);
            }
        });
    }

    //Permite simular que son ciertas horas clave (p.ej. "12:00" o "16:00")
    simulateTime(timeString) {
        if (timeString === "12:00") {
            this.emitAlert("¡Ya puedes ver el menú de hoy en NutriMenu!");
        }
        else if (timeString === "16:00") {
            this.emitAlert("¡Ofertas de cierre disponibles ahora en NutriMenu!");
        }
        else{
            this.emitAlert(`Simulación de hora: ${timeString}`);
        }
    }

    //Inicia el scheduler
    startScheduler(intervalMs = 60000, immediate = false) {
        //Limpiar intervalos anteriores para evitar múltiples timers.
        if (this._intervalId) {
            clearInterval(this._intervalId);
            this._intervalId = null;
        }
        if (immediate) this.checkConditions();
        this._intervalId = setInterval(() => {
            this.checkConditions();
            this.emitAlert(`Scheduler: actualización ${new Date().toLocaleTimeString()}`);
        }, intervalMs);
        console.log(`[AlertaService] scheduler started (interval ${intervalMs}ms)`);
    }

    //Detiene el scheduler (pruebas)
    stopScheduler() {
        if (this._intervalId) {
            clearInterval(this._intervalId);
            this._intervalId = null;
            console.log('[AlertaService] scheduler stopped');
        }
    }
}

export const notificationService = new AlertaService();


