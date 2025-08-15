import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify, jwt } from 'hono/jwt'

//  so in hono we need to pass the generic to get the env and all  
const app = new Hono<{
  Bindings: {
    PRISMA_DATABASE_URL: string // now i can use the env 
    JWT_SECRET: string
  }
}>

//  if we want to ignore something (bad practice) somehow, so we use the '@ts-ignore' , this will ignore any ts related issues

app.post('/api/v1/signup', async (c, next) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.PRISMA_DATABASE_URL, // now no error 
  }).$extends(withAccelerate())

  //  to get data/body inside hono we use the 'c'
  const body = await c.req.json();


  const secret = c.env.JWT_SECRET
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  })
  const token = sign({ id: user.id }, secret)
  return c.json({
    token: token
  })


})


app.post('/api/v1/signin', async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.PRISMA_DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const secret = c.env.JWT_SECRET

  const user = await prisma.user.findUnique({
    where: {
      email: body.email
    }
  });

  if (!user) {
    c.status(403)
    return c.json({
      error: "user not foundx",
    })
  }

  const token = await sign({ id: user.id }, secret)
  return c.json({
    token: token
  })



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
