import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
// import bcrypt from 'bcrypt'
import bcrypt from "bcryptjs";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { decode, sign, verify } from 'hono/jwt'

import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';

const app = new Hono<{
  Bindings: {
    PRISMA_DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>()

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

app.post('/api/v1/blog', async (c) => {
  return c.text('hello there')
})
app.put('/api/v1/blog', async (c) => {
  return c.text('hello there')
})

app.get('/api/v1/blog', async (c) => {
  return c.text('hello there')
})
app.get('/api/v1/bulk', async (c) => {
  return c.text('hello there')
})

app.get('/', (c) => {
  return c.text('hello there')
})


export default app
