import { z } from 'zod';

export const signupInput = z.object({
    username: z.string().trim().toLowerCase().max(10),
    email: z.string().trim().toLowerCase().email(),
    password: z.string().min(5).max(14),

});

export const signinInput = z.object({
    email: z.string().trim().toLowerCase().email(),
    password: z.string().min(5).max(14),
});

export const createBlogInput = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    thumbnail: z.string().url().optional(),
});

export const updateBlogInput = z.object({
    id: z.number(),
    title: z.string().min(1, "Title is required").optional(),
    content: z.string().min(1, "Content is required").optional(),
    thumbnail: z.string().url().optional()
})


// types
export type SignupSchema = z.infer<typeof signupInput>;
export type SigninSchema = z.infer<typeof signinInput>;
export type CreateBlogSchema = z.infer<typeof createBlogInput>;
export type UpdateBlogSchema = z.infer<typeof updateBlogInput>;
