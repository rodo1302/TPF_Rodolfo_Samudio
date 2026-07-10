import express from "express";
import cors from "cors";
import productsRouter from "./src/routers/products.routes.js";
import authRouter from "./src/routers/auth.routes.js";

const app = express();

app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

app.use((req, res, next) => {
  console.log(`Solicitud recibida: ${req.method} ${req.url}`);
  next();
});

app.use("/api", productsRouter);

app.use((req, res, next) => {
  res.status(404).send("Ruta no encontrada");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
