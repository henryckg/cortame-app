import { createLink } from '@/db/client'
import {type APIRoute} from 'astro'

const USER = "henryck"

export const POST: APIRoute = async ({request}) => {
  const {slug, url} = await request.json()

  if (!url || !url.startsWith("http")) {
    return new Response ('Invalid URL', {status: 400})
  }

  try {
    const id = await createLink(slug, url, USER)
    const shortUrl = `${new URL(request.url).origin}/${id}`

    return new Response(JSON.stringify({ shortUrl }), {
      headers: {"Content-Type": "application/json"}
    })
  } catch (e) {
    console.error(e)
    return new Response('Internal Server Error', {status: 500})
  }
}