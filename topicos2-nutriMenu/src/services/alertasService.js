import { simulatedMenuData } from '../data/menuData'; //Importamos los datos de la app

class AlertaService {
   constructor() {
        this.callback = null; //Callback único para simplificar
        this._intervalId = null; //ID del intervalo del scheduler
   }

    forceTestAlert() {
        const mensajeSimulado = "¡Promo Flash! 50% de descuento en ensaladas en el cafetín";
        this.emitAlert(mensajeSimulado);
    }
    
    subscribe(callback) {
        this.callback = callback;
        return () => {
            if (this.callback === callback) this.callback = null;
        };
    }

    //POE: Emisor de eventos 
    emitAlert(message) {
        const payload = { text: message, ts: new Date().toISOString() };
        if (this.callback) this.callback(payload);
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

    startScheduler(ms = 5000) {
        this.stopScheduler();
        this._intervalId = setInterval(() => {
            this.checkConditions();
            // emitir un mensaje de control para forzar que la UI muestre cambios cada tick
            this.emitAlert(`Scheduler: actualización ${new Date().toLocaleTimeString()}`);
        }, ms);
        console.log(`[AlertaService] scheduler started (interval ${ms}ms)`);
    }

    stopScheduler() {
        if (this._intervalId) {
            clearInterval(this._intervalId);
            this._intervalId = null;
            console.log('[AlertaService] scheduler stopped');
        }
    }
}

export const notificationService = new AlertaService();


