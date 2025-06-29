// backend/index.js
import express, { json } from 'express';
import cors from "cors";
import rootRouter from './routes/index.js'

const PORT = 3000
const app = express();

app.use(cors());
app.use(express.json());

// this makes the initial project backend route setup
// url will be  http://localhost:${PORT}/api/v1/users/signup...
app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
