# this is procedure

init the project and install required dependencies -> npx create hono@latest, workers and prisma 

- we then create the .env file in the root and wrangler.toml or wrangler.jsonc

- in the env, define the database url and the prisma accelerate url

- in the wrangler.jsonc define the prisma url in the vars

- after that, in the prisma folder, schema.prisma, define the schema then run the prisma migration and after that prisma generate, this will generate the client to use in our index files to use

- in the src/index.ts first init the hono with generics as it will cause error. later define the routes. whatever generic we define, we do this inside the bindings, and is like to call the env variables here to let hono know

- in the routes, use generated prisma client by const prisma = new PrismaClient({
  and here you call the prisma url like:
  datasourceUrl: c.env.PRISMA_DB_URL
  }).$xtends(withAccelerate()) -> this line is added to use the prisma accelerate (db pooling)

- now do the thing you want , signup/login etc.
