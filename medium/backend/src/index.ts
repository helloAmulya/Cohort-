import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

// const prisma = new PrismaClient().$extends(withAccelerate())

const app = new Hono()

app.post('/api/v1/signup', (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
  }).$extends(withAccelerate())
  return c.text('Hello world')

})




app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.post('/api/v1/signup', (c) => {
  return c.text('signup!')
})
app.post('/api/v1/signin', (c) => {
  return c.text('signin!')
})
app.post('/api/v1/blog', (c) => {
  return c.text('post blog!')
})
app.put('/api/v1/blog', (c) => {
  return c.text('edit blog!')
})
app.get('/api/v1/blog', (c) => {
  return c.text('get blog!')
})





export default app
