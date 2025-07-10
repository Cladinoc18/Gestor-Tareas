import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genai.getGenerativeModel({ model: "gemini-2.5-pro" });

export const generateTasksSummary = async (tasks: any[]) => {

    if (tasks.length === 0) {
        return "No hay tareas pendientes.";
    }

    const taskList = tasks.map(t => `Titulo: ${t.title} (Descripcion: ${t.description})`).join('\n');

    const prompt = `Basado en la siguiente lista de tareas pendientes, genera un resumen de 1 a 2 frases que
    describa el estado de las tareas. Se conciso y directo. 

    Lista de tareas:
    ${taskList}`;

    try {
        const resultado = await model.generateContent(prompt);
        const response = await resultado.response;
        return response.text();
    } catch (error) {
        console.log(error);

    }
};

export const suggestPriority = async (title: string, description: string) => {
    const prompt = `Analiza el título y la descripción de las siguientes tareas para determinar qué tan urgente es la tarea. 
    Responde únicamente con 3 palabras: "baja", "media" o "alta". Solo usa estas palabras.

    - Titulo: ${title}
    - Descripcion: ${description}
    `;

    try {
        const resultado = await model.generateContent(prompt);
        const response = await resultado.response;
        return response.text().trim().toLowerCase();
    } catch (error) {
        console.log(error);
    }
};

export const completeDescription = async (title: string, description: string) => {
    const prompt = `Basado en el siguiente titulo, genera una descripcion detallada de 1 o 2 frases.
    La descripción debe explica de que trata la tarea. Sé conciso y directo. Solamente responde con la descripcion,
    no incluyas texto innecesario

    

    - Titulo: ${title}  
    `;

    try {
        const resultado = await model.generateContent(prompt);
        const response = await resultado.response;
        return response.text();
    } catch (error) {
        console.log(error);
    }
    
}