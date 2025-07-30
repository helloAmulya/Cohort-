"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
const userProfileSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name cannot be empty" }),
    email: zod_1.z.string().email({ message: "Invalid email" }),
    age: zod_1.z.number().min(18).optional(),
});
app.post('/user', (req, res) => {
    const result = userProfileSchema.safeParse(req.body);
    if (!result.success) {
        res.status(411).json({
            msg: "user not added",
            errors: result.error
        });
        return;
    }
    const updateBody = result.data;
    res.json({
        message: "User Updated",
        data: updateBody
    });
});
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
