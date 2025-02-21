import { Context } from "hono";
import { descriptionService } from "./description-service";

export const descriptionController = async (c: Context) => {
    try {
        const { description } = await c.req.json();

        if (!description) {
            throw new Error("La actividad no tiene descripcion");
        }

        const descriptionSummary = await descriptionService(description, c.env);

        return c.text(descriptionSummary);
    } catch (error) {
        return c.text((error as Error).message);
    }
};
