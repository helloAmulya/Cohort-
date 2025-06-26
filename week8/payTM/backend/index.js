// backend/index.js
import express, { json } from 'express';
import cors from "cors";
import rootRouter from "./routes/index";

const app = express();

app.use(cors());
app.use(json());

app.use("/api/v1", rootRouter);

app.listen(3000);