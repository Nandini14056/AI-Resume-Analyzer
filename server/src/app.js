import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes";
import resumeRouter from "./routes/resume.routes";
import analysisRouter from "./routes/analysis.route";
import errorHandler from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandler);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/resume", resumeRouter);
app.use("/api/v1/analysis", analysisRouter);

export default app;