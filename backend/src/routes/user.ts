import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify  } from 'hono/jwt'

export const userRouter = new Hono<
{
    Bindings: {
        DATABASE_URL :String,
        JWT_SECRET :String
    }
}>();




app.use('blog/*', async (c, next) => {
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









app.post('/singup', async(c) => {
    const prisma = new PrismaClient({
      //@ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const user = await prisma.user.create({
      data:{
        email: body.email,
        password :body.password,
      },
    })
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt });})
  
  app.post('/singin', async (c) => {
    const prisma = new PrismaClient({
      //@ts-ignore
          datasourceUrl: c.env.DATABASE_URL	,
      }).$extends(withAccelerate());
  
      const body = await c.req.json();
      const user = await prisma.user.findUnique({
          where: {
              email: body.email
          }
      });
  
      if (!user) {
          c.status(403);
          return c.json({ error: "user not found" });
      }
  //@ts-ignore
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt });})