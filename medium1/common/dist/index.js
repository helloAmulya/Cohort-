"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInput = exports.createBlogInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = require("zod");
exports.signupInput = zod_1.z.object({
    username: zod_1.z.string().trim().toLowerCase().max(10),
    email: zod_1.z.string().trim().toLowerCase().email(),
    password: zod_1.z.string().min(5).max(14),
});
exports.signinInput = zod_1.z.object({
    email: zod_1.z.string().trim().toLowerCase().email(),
    password: zod_1.z.string().min(5).max(14),
});
exports.createBlogInput = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    content: zod_1.z.string().min(1, "Content is required"),
    thumbnail: zod_1.z.string().url().optional(),
});
exports.updateBlogInput = zod_1.z.object({
    id: zod_1.z.number(),
    title: zod_1.z.string().min(1, "Title is required").optional(),
    content: zod_1.z.string().min(1, "Content is required").optional(),
    thumbnail: zod_1.z.string().url().optional()
});
