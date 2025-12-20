import express from "express";
import cors from "cors";
import nrrRoutes from "./routes/nrr.routes";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/nrr", nrrRoutes);

export default app;
