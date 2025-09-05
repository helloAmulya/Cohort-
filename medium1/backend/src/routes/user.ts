
import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import bcrypt from "bcryptjs";
import { zValidator } from '@hono/zod-validator'
import { decode, sign, verify } from 'hono/jwt'

import { signinInput, signupInput } from '@daddyamulya/medium-common';

export const userRouter = new Hono<{
    Bindings: {
        PRISMA_DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>()


// SignUp
userRouter.post('/signup',
    zValidator('json', signupInput
    ),

    async (c) => {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.PRISMA_DATABASE_URL,
        }).$extends(withAccelerate())

        // const body = await c.req.json(); 
        const body = c.req.valid('json'); // checks to get the valid data
        const hashedPass = await bcrypt.hash(body.password, 10)

        try {
            const user = await prisma.user.create({
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
userRouter.post('/signin',
    zValidator('json', signinInput
    ),

    async (c) => {
        const body = c.req.valid('json');
        // the below 2 lines just make no sense as we take the whole body
        // const email = body.email;
        // const password = body.password;

        const prisma = new PrismaClient({
            datasourceUrl: c.env.PRISMA_DATABASE_URL,
        }).$extends(withAccelerate())

        try {
            const user = await prisma.user.findUnique({
                where: { email: body.email }
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
                message: "User Logged In",
                token: loginToken,
            }, 200)

        } catch (error: any) {
            console.error("Login error:", error);
            return c.text("Internal server error", 500);
        }

    })


