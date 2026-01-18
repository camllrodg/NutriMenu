import { Wove, saludo } from "../aspects/annotations.js";
import "../aspects/Saludo.aspect.js";

@Wove()
class SaludoService {
    @saludo()
    saludo(){
        console.log("Hola desde el servicio de saludo");
    }
}

export const saludoService = new SaludoService();