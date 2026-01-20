import { simulatedMenuData } from '../data/menuData.js';
import { notificationService } from './alertasService';

export async function verificarDisponibilidad(plato) {
    let dishName = '';
    if (typeof plato === 'string') {
        dishName = plato;
    } else if (plato && plato.dish) {
        dishName = plato.dish;
    } else {
        dishName = '';
    }

    let normalized = '';
    if (dishName) {
        normalized = dishName.toLowerCase();
    }

    const dishObj = simulatedMenuData.find(item => item.dish.toLowerCase() === normalized);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (dishObj) {
                if (dishObj.currentAforo === dishObj.capacity) {
                    reject(new Error(`Local lleno. Capacidad maxima: ${dishObj.capacity} personas`));
                } else if (dishObj.stock === 0) {
                    reject(new Error('Plato seleccionado sin disponibilidad'));
                } else {
                    resolve(true);
                }
            } else {
                reject(new Error('Plato no encontrado en el menu'));
            }
        }, 2000);
    });
}

export async function realizarPedido(platoOrId, options = { takeaway: false }) {
    const takeaway = options.takeaway === true;
    let id = null; 

    if (typeof platoOrId === 'string') {
        id = platoOrId;
    }
    
    let dishName = null; 

    
    if (typeof platoOrId === 'string' && !id) {
        dishName = platoOrId; 
    } 
    
    else if (platoOrId && platoOrId.dish) {
        dishName = platoOrId.dish;
    }


    let item;

    if (id) {
        item = simulatedMenuData.find(i => i.id === id);
    } else {
        item = simulatedMenuData.find(i => {
            const nombreEnLista = i.dish.toLowerCase();
            const nombreBuscado = (dishName || '').toLowerCase();

            return nombreEnLista === nombreBuscado;
        });
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!item) {
                return reject(new Error('Plato no encontrado'));
            }

            if (item.stock <= 0) {
                return reject(new Error('No hay stock disponible del plato'));

            } 
            if (!takeaway) {
                if (item.currentAforo >= item.capacity){
                    return reject(new Error('Local sin capacidad'));
                }
            }

            const prevStock = item.stock;
            item.stock = item.stock - 1; 

            if (item.stock < 0) {
                item.stock = 0; 
            }

            if (!takeaway) {
                item.currentAforo = item.currentAforo + 1;
                if (item.currentAforo > item.capacity) {
                    item.currentAforo = item.capacity; 
                }
            }
            
            try {
                const threshold = notificationService.stockThreshold || 5;
                if (item.stock < threshold && item.stock < prevStock) {
                    const msg = `Atención: stock bajo en: ${item.dish} (${item.stock}).`;
                    notificationService.emitAlert(msg);
                }
            } catch (e) {}

            resolve(item);
        }, 500);
    });
}