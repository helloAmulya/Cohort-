import { z } from 'zod';
export declare const signupInput: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    thumbnail: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateBlogInput: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    thumbnail: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type SignupSchema = z.infer<typeof signupInput>;
export type SigninSchema = z.infer<typeof signinInput>;
export type CreateBlogSchema = z.infer<typeof createBlogInput>;
export type UpdateBlogSchema = z.infer<typeof updateBlogInput>;
