import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./presentacion/routes";
import favoritoRouter from "./infraestructura/favoritoRouter";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api", router);
app.use("/favoritos", favoritoRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
