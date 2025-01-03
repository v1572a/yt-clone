import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// importing Routes
import userRouter from "./routes/user.routes.js";

// routes initialization
app.use("/api/users", userRouter);

export default app;
