import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
const app = express();
dotenv.config();
app.use(morgan("dev"));
const PORT = process.env.PORT || 5000;
app.use(express.json());
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
});
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
