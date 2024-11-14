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
blogRouter.post('/', async(c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

 const blog = await prisma.blog.create({
    data: {
      title:body.title,
      content :body.content,
      authorId :1
    }
  })
    return c.json({
      id: blog.id
    })
  })



  blogRouter.put('/', async(c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
   try{

     const blog =  await prisma.blog.update({
         where:{
           id: body.id
         },
        data: {
     title: body.title,
     content: body.content,
     authorId: 1
   }
     })
     
       return c.json({
         id: blog.id
       })
   }
   catch(e){
    c.status(411);
    return c.json({
      msg :" error not found "
    })
   }

  })



  blogRouter.get('/', async(c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
    
   const blog = await prisma.blog.findFirst({
    where:{
      id: body.id
    },
  })
    return c.json({
     blog 
    })
   
    })
  