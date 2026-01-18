import { AnnotationFactory, AnnotationKind } from "@aspectjs/common";

const annotationFactory = new AnnotationFactory("app");

// Creamos una anotación de clase llamada @Wove
export const Wove = annotationFactory.create(AnnotationKind.CLASS, "Wove");

// Creamos una anotación de método llamada @saludo
export const saludo = annotationFactory.create(AnnotationKind.METHOD, "saludo");

// aqui creamos las notaciones necesarias para el proyecto