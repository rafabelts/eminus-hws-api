import { Hono } from "hono";
import { cors } from "hono/cors";
import { descriptionController } from "./description-controller";

const app = new Hono().basePath("/api");

app.use(
  "/*",
  cors({
    origin: ["https://eminus.uv.mx"],
  })
);

app.get("/", (c) => {
  return c.text("Hello World!");
});

app.post("/description", (c) => descriptionController(c));

export default app;
