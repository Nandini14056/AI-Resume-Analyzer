import dotenv from "dotenv";
import connectDB from './config/db.js';
import app from "./app.js";

dotenv.config();

console.log(process.env.GROQ_API_KEY);

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }).catch((err) => {
    console.log("Database connection failed", err);
  });