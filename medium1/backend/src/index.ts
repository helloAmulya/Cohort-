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

app.get('/', (c) => {
  return c.text('hello there')
})


export default app
