import { createLink, createUser } from '@/db/client'
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({request, locals}) => {
  const {slug, url} = await request.json()
  const user = await locals.currentUser()
  if (!user) return new Response('Unauthorized', {status: 401})

  const userId = user?.emailAddresses[0]?.emailAddress

  if (!url || !url.startsWith("http")) {
    return new Response ('Invalid URL', {status: 400})
  }

  try {
    const user = await createUser(userId)
    const id = await createLink(slug, url, userId)
    const shortUrl = `${new URL(request.url).origin}/${id}`

    return new Response(JSON.stringify({ shortUrl }), {
      headers: {"Content-Type": "application/json"}
    })
  } catch (e) {
    console.error(e)
    return new Response('Internal Server Error', {status: 500})
  }
}