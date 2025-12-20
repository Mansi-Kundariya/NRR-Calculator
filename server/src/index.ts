import express from "express";
import cors from "cors";
import nrrRoutes from "./routes/nrr.routes";
import dataRoutes from "./routes/data.routes";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/nrr", nrrRoutes);
app.use("/api/data", dataRoutes);

export default app;
