
// no more needed, imported from common folder or as a module from npm 

import { z } from 'zod'
export const signupInput = z.object({
    username: z.string().trim().toLowerCase().max(10),
    email: z.string().trim().toLowerCase().email(),
    password: z.string().max(14),
})

export const signinInput = z.object({
    email: z.string().trim().toLowerCase().email(),
    password: z.string().min(5),
})

export type SignupSchema = z.infer<typeof signupInput>
export type SigninSchema = z.infer<typeof signinInput>