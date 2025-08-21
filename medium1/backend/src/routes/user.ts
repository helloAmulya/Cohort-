
import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import bcrypt from "bcryptjs";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { decode, sign, verify } from 'hono/jwt'

export const userRouter = new Hono<{
    Bindings: {
        PRISMA_DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>()

const signupSchema = z.object({
    username: z.string().trim().toLowerCase().max(10),
    email: z.string().trim().toLowerCase().email(),
    password: z.string().max(14),
})

const signinSchema = z.object({
    email: z.string().trim().toLowerCase().email(),
    password: z.string().min(5),
})


// SignUp
userRouter.post('/signup',
    zValidator('json', signupSchema
        //  this below can be also used but defined above
        // z.object({
        // username: z.string().trim().toLowerCase().max(10),
        // email: z.string().trim().toLowerCase().email(),
        // password: z.string().max(14), })
    ),

    async (c) => {
        const primsa = new PrismaClient({
            datasourceUrl: c.env.PRISMA_DATABASE_URL,
        }).$extends(withAccelerate())

        // const body = await c.req.json();
        const body = c.req.valid('json');
        const hashedPass = await bcrypt.hash(body.password, 10)

        try {
            const user = await primsa.user.create({
                data: {
                    username: body.username,
                    email: body.email,
                    password: hashedPass,
                }
            })
            const token = await sign({ id: user.id }, c.env.JWT_SECRET)
            return c.json({
                token: token
            }, 201)


        } catch (error: any) {
            console.error("Signup error:", error);
            if (error.code === 'P2002') {
                return c.text("Username or email already exists", 409);
            }
            return c.text("Something went wrong", 500);
        }

    })
// SignIn
userRouter.post('/login',
    zValidator('json', signinSchema
        // z.object({
        // email: z.string().trim().toLowerCase().email(),
        // password: z.string().max(14),  })
    ),

    async (c) => {
        const body = c.req.valid('json');
        // the below 2 lines just make no sense 
        // const email = body.email;
        // const passwordf = body.password;
        const primsa = new PrismaClient({
            datasourceUrl: c.env.PRISMA_DATABASE_URL,
        }).$extends(withAccelerate())

        try {
            const user = await primsa.user.findFirst({
                where: { email: body.email, }
            })
            if (!user) {
                return c.text("Invalid Credentials", 401)
            }

            const passCheck = await bcrypt.compare(body.password, user.password);
            if (!passCheck) {
                return c.text("Incorrect Password", 401)
            }


            const loginToken = await sign({ id: user.id }, c.env.JWT_SECRET)
            return c.json({
                message: "User Logged In ",
                token: loginToken,
            }, 201)
        } catch (error: any) {
            console.error("Login error:", error);
            return c.text("User not found", 404);

        }

    })


