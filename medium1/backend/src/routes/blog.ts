import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import bcrypt from "bcryptjs";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { decode, sign, verify } from 'hono/jwt'


export const blogRouter = new Hono<{
    Bindings: {
        PRISMA_DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        userId: string, // imp
    }
}>();

// add a blog middleware
blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header('authorization') || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", user.id as string)
            await next();
        }
        else {
            return c.text("You are not logged in", 401);
        }
    } catch (error) {
        return c.text("You are not logged in", 401);
    }
})

// post the blog
blogRouter.post('/', async (c) => {
    const body = await c.req.json();

    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.PRISMA_DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId),
        }
    })

    return c.json({
        id: blog.id,
    });

})

blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.PRISMA_DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.update({
        where: { id: body.id },
        data: {
            title: body.title,
            content: body.content,
        }
    })

    return c.json({
        id: blog.id,
    });
})

// add pagination in this
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.PRISMA_DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.blog.findMany();
    return c.json({
        blogs
    });

})


blogRouter.get('/:id', async (c) => {
    const body = await c.req.json();
    const urlId = c.req.param("id")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.PRISMA_DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.findFirst({
            where: { id: Number(urlId) } // made the id to come from the url and pass it as the number
        })

        return c.json({
            blog
        });
    } catch (error) {
        c.status(403);
        return c.json({
            message: "Error fetching the blog",
        })

    }
})


