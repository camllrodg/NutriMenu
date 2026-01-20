import { simulatedMenuData } from '../data/menuData.js';

export async function verificarDisponibilidad(plato) {
    // Accept either a string (dish name) or an object { dish }
    const dishName = typeof plato === 'string' ? plato : (plato && plato.dish ? plato.dish : '');
    const normalized = dishName ? dishName.toLowerCase() : '';

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