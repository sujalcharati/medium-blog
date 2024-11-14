import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify  } from 'hono/jwt'

export const blogRouter = new Hono<
{
  Bindings:{
    DATABASE_URL: string;
    JWT_SECRET : string;
  }
}>()


blogRouter.use('blog/*', async (c, next) => {
    const header = c.req.header("authorization") || "";
    const token = header.split('')[1]
    const response = verify(token,c.env.JWT_SECRET);
    if (response.id) {
      next()
    }else
    {
   c.status(403)
   return c.json({
    error:"unauthorized"
   })
    }
  
  })
blogRouter.post('/blog', async(c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  await prisma.blog.create({
    data: {
      title:body.title,
      content :body.content,
      authorId :1
    }
  })
    return c.json({
      id: blogRouter.id
    })
  })
  blogRouter.put('/api/v1/blog', (c) => {
    return c.text('Hello Hono!')
  })
  blogRouter.get('/api/v1/blog/:id', (c) => {
    return c.text('Hello Hono!')
  })