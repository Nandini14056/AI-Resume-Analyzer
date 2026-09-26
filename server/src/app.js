import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import resumeRouter from "./routes/resume.routes.js";
import analysisRouter from "./routes/analysis.route.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/resume", resumeRouter);
app.use("/api/v1/analysis", analysisRouter);

app.use(errorHandler);

export default app;