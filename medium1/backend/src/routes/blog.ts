import { Hono } from "hono";


export const blogRouter = new Hono<{
    Bindings: {
        PRISMA_DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>()

blogRouter.post('/blog', async (c) => {
    return c.text('hello there')
})
blogRouter.put('/blog', async (c) => {
    return c.text('hello there')
})

blogRouter.get('/blog', async (c) => {
    return c.text('hello there')
})
blogRouter.get('/bulk', async (c) => {
    return c.text('hello there')
})
