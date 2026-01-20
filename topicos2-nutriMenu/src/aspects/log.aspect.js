import { Aspect, Before,getWeaver, on } from "@aspectjs/core";
import {log} from "./annotations.js";

@Aspect()
class LogAspect {

    constructor() {
        this.date = new Date();
    }

    @Before(on.methods.withAnnotations(log))
    beforeLog(meta){
        console.log(`[AUDITORIA-${this.date.toLocaleDateString()}] ${meta.method.name} con argumentos: ${JSON.stringify(meta.args)} a las ${this.date.toLocaleTimeString()}`);
    }
}

// Activamos el aspecto
const weaver = getWeaver();
const aspect = new LogAspect();
weaver.enable(aspect);