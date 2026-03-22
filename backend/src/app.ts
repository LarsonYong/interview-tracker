import "dotenv/config";
import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes";
import interviewRoutes from "./routes/interview.routes";
import userRoutes from "./routes/users.routes"
import { notFound } from "./middleware/not-found";
import { errorHandler } from "./middleware/error-handler";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/users", userRoutes)

app.use(notFound);
app.use(errorHandler);