import { route } from '../mod.ts'

Deno.serve((req) => {
  const user = route('/users/{id}', req.url)

  if (user) {
    return new Response(`Hello, ${user.get('id')}!`)
  }

  return new Response('Hello, World!')
})
