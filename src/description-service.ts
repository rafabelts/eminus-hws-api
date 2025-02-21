import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

export const descriptionService = async (description: string, env: any) => {
    dotenv.config();

    const apiKey = env.GEMINI_KEY;
    console.log(apiKey);

    if (!apiKey) {
        throw new Error("No API Key found");
    }

    const genAi = new GoogleGenerativeAI(apiKey);

    const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Por favor, describe con bastante detalle la descripción de mi tarea. 
No olvides agregar si hay alguna instrucción importante del profesor. 
Dame la respuesta usando las etiquetas <p> para los párrafos, <strong> para resaltar información importante y <em> para cursivas. 
Ejemplo de salida esperada:

<p>La tarea consiste en <strong>darle un beso a tu mamá</strong>.</p>

NO agregues código adicional como \`html\`, \`\`\`, ni ninguna otra indicación de que es código. 
Solo devuelve el contenido en formato HTML sin ningún otro texto adicional. 

Descripción: ${description}`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response.text();

        return response;
    } catch (error) {
        return "Error. No se encontro la key de Gemini";
    }
};
