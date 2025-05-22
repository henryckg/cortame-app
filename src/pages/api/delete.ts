import type { APIRoute } from "astro";
import { deleteLink } from "@/db/client";

export const DELETE: APIRoute = async ({ request, locals }) => {
  const { id } = await request.json()

  const user = await locals.currentUser()
  if (!user) return new Response(JSON.stringify('Unauthorized'), {status: 401})

  const userId = user?.emailAddresses[0]?.emailAddress

  if (!id || !userId) {
    return new Response(JSON.stringify('Parameters missing'), { status: 400 })
  }

  const success = await deleteLink(id, userId)

  return success
    ? new Response(JSON.stringify('Deleted'), { status: 200 })
    : new Response(JSON.stringify('Bad Request'), { status: 400 })
}