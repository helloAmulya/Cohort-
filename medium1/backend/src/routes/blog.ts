import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import bcrypt from "bcryptjs";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { decode, sign, verify } from 'hono/jwt'

import { createBlogInput, updateBlogInput } from '@daddyamulya/medium-common';

// blog router with generics
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

// create blog
blogRouter.post('/',
    // zValidator('json', createBlogInput), 
    //  wrong input check
    zValidator('json', createBlogInput, (result, c) => {
        if (!result.success) {
            return c.json({
                message: "Invalid blog input"
            }, 400)
        }
    }),

    async (c) => {
        const body = c.req.valid('json');
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
        return c.json({ id: blog.id }, 201);
    })

// update blog
blogRouter.put('/',
    zValidator('json', updateBlogInput, (result, c) => {
        if (!result.success) {
            return c.json({
                message: "Invalid blog input"
            }, 400)
        }
    }),
    async (c) => {
        const body = c.req.valid('json');
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

        return c.json({ id: blog.id }, 200);

    })


// all Blogs
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.PRISMA_DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.blog.findMany({

        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    username: true,
                }
            },
        },
    });
    return c.json({
        blogs
    });

})

// blog by Id
// we wrote this after bulk, because the url '/:id' was calling the specific blog for "/bulk", error came 

// blogRouter.get('/:id', async (c) => {
//     const body = await c.req.json();
//     const urlId = c.req.param("id")
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env.PRISMA_DATABASE_URL,
//     }).$extends(withAccelerate())

//     try {
//         const blog = await prisma.blog.findFirst({
//             where: { id: Number(urlId) }, // made the id to come from the url and pass it as the number
//         select:{

//             id:true,
//             title:true,
//             content:true,
//             author:{
//                 select:{
//                     username:true,
//                 }
//             }
//         }
//         })

//         if (!blog) {
//             return c.json({ message: "Blog not found" }, 404);
//         }
//         return c.json({ blog }, 200);

//     } catch (error) {
//         c.status(403);
//         return c.json({
//             message: "Error fetching the blog",
//         })

//     }
// })


// changed the backend for getting the blog
blogRouter.get('/:id', async (c) => {
    const urlId = c.req.param("id"); 
    const prisma = new PrismaClient({
        datasourceUrl: c.env.PRISMA_DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.blog.findFirst({
            where: { id: Number(urlId) },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        username: true,
                    },
                },
            },
        });

        if (!blog) {
            return c.json({ message: "Blog not found" }, 404);
        }
        return c.json({ blog }, 200);
    } catch (error) {
        c.status(403);
        return c.json({ message: "Error fetching the blog" });
    }
});
