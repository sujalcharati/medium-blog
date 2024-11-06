app.post('/api/v1/blog', (c) => {
    return c.text('Hello Hono!')
  })
  app.put('/api/v1/blog', (c) => {
    return c.text('Hello Hono!')
  })
  app.get('/api/v1/blog/:id', (c) => {
    return c.text('Hello Hono!')
  })