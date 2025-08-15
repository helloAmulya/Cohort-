import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt } from 'hono/jwt'
import { JwtVariables } from 'hono/jwt'

// const prisma = new PrismaClient().$extends(withAccelerate())

// const app = new Hono()
//  so in hono we need to pass the generic to get the env and all  
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string // now i can use the env 
    // Variables: JwtVariables // will not use this for now
    JWT_SECRET:string
  }
}>

//  if we want to ignore something (bad practice) somehow, so we use the @ts-ignore , this will ignore any ts related issues

app.post('/api/v1/signup', async (c, next) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL, // now no error 
  }).$extends(withAccelerate())

  //  to get data/body inside hono we use the 'c'
  const body = await c.req.json();

  const jwtMiddleware = jwt({
    secret: c.env.JWT_SECRET,
  })

  await prisma.user.create({
    data: body
  })


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
