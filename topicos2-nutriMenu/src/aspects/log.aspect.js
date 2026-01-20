import { Aspect, Before, After, getWeaver, on } from "@aspectjs/core";
import {log} from "./annotations.js";

@Aspect()
class LogAspect {

    constructor() {
        this.date = new Date();
    }

    @After(on.methods.withAnnotations(log))
    afterLog(meta){
        let id = meta.args[0];
        let data = meta.args[1];
        let value = meta.args[2];
        let publicationStatus = value ? "publico" : "dejo de publicar";

        for(let dataItem of data) {
            if(dataItem.id === id) {
                // Simular una llamada a una API o base de datos
                console.log(`[AUDITORIA-${this.date.toLocaleDateString()}] ${dataItem.restaurant} ${publicationStatus} menu "${dataItem.dish}" a las ${this.date.toLocaleTimeString()}`);
            }
        }
    }

}

// Activamos el aspecto
const weaver = getWeaver();
const aspect = new LogAspect();
weaver.enable(aspect);