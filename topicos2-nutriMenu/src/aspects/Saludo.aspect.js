import { Aspect, Before, After,getWeaver, on } from "@aspectjs/core";
import {saludo} from "./annotations.js";

@Aspect()
class SaludoAspect {
    
    @Before(on.methods.withAnnotations(saludo))
    beforeSaludo(meta){
        console.log("Aspecto antes de saludo");
    }

    @After(on.methods.withAnnotations(saludo))
    afterSaludo(meta){+
        console.log("Aspecto después de saludo");
    }
}

// Activamos el aspecto
const weaver = getWeaver();
const aspect = new SaludoAspect();
weaver.enable(aspect);