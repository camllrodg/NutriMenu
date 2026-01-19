import { simulatedMenuData } from '../data/menuData.js';

export async function verificarDisponibilidad(plato) {
    console.log("Verificando disponibilidad en la API...");
    const dishObj=simulatedMenuData.find(item => item.dish.toLowerCase() === plato.toLowerCase());
    console.log("Buscando plato en la API...");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Verificando mesas...");
            if(dishObj){
                if(dishObj.currentAforo===dishObj.capacity){
                    reject(new Error(`Local lleno. Capacidad maxima:${dishObj.capacity} personas`));
                }else if(dishObj.stock===0){
                    reject(new Error("Plato seleccionado sin disponibilidad"));
                }else{
                    resolve(true);
                    console.log("Local con disponibilidad");
                }
            } else {
                reject(new Error("Plato no encontrado en el menu"));
            }
        }, 2000);
    });
}

const platoPrueba = async (dish) => {
    try {
        console.log("Ejecutando prueba...")
        const plato = await verificarDisponibilidad(dish);
        console.log("Plato disponible");
    } catch (error) {
        console.error(error.message);
    }
};

platoPrueba('Bowl Vegano de Granos');