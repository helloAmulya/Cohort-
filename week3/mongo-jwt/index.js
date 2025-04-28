import express from 'express';
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";

const app = express();
export const JWT_SECRET = "amulya_server";

// Use Express's built-in body parser
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
