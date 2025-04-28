import express from 'express';
import adminRouter from "./routes/adminR.js";
import userRouter from "./routes/userR.js";

const app = express();

app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port this ${PORT}`);
});
