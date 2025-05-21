import type { APIRoute } from "astro";
import { deleteLink } from "@/db/client";

export const DELETE: APIRoute = async ({ request, locals }) => {
  const { id } = await request.json()

  const user = await locals.currentUser()
  if (!user) return new Response('Unauthorized', {status: 401})

  const userId = user?.emailAddresses[0]?.emailAddress

  if (!id || !userId) {
    return new Response("Parameters missing", { status: 400 })
  }

  const success = await deleteLink(id, userId)

  return success
    ? new Response("Deleted", { status: 200 })
    : new Response("Bad request", { status: 400 })
}